/**
 * server.js — process entry point.
 *
 * Connects to the database, optionally syncs the schema in development (when
 * DB_SYNC=true), then starts listening. Exits with a non-zero code on DB
 * failure so a process manager (PM2, systemd, Docker) restarts cleanly.
 */
const app = require('./app')
const config = require('./config/env')
const sequelize = require('./config/database')
const { sequelize: _sq } = require('./models')

async function start() {
  try {
    await sequelize.authenticate()
    // eslint-disable-next-line no-console
    console.log('[db] Connection established.')

    // Dev convenience: auto-create tables from the models. Real deployments
    // should use migrations (npm run db:migrate) and leave DB_SYNC unset.
    if (!config.isProduction && process.env.DB_SYNC === 'true') {
      await _sq.sync({ alter: true })
      // eslint-disable-next-line no-console
      console.log('[db] Models synced.')
    }

    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(
        `[server] FDTeknova API running on port ${config.port} (${config.env})`
      )
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[db] Unable to connect:', err.message)
    process.exit(1)
  }
}

start()
