/**
 * sequelize-cli config — derived from the same env module as the app so the
 * CLI and the runtime share one source of truth for DB credentials.
 *
 * sequelize-cli picks the key matching NODE_ENV (default: development); since
 * every environment reads from the same env vars, the three keys are identical
 * and only the relevant one is loaded at a time.
 */
const config = require('./env')

const dbConfig = {
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect,
  logging: config.db.logging,
}

module.exports = {
  development: dbConfig,
  test: { ...dbConfig, database: process.env.DB_NAME || `${config.db.name}_test` },
  production: dbConfig,
}
