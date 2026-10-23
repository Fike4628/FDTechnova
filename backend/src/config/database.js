/**
 * Sequelize instance configured from env.
 *
 * `src/models/index.js` imports this singleton, so there is exactly one
 * connection pool per process. Migrations/seeders run by the sequelize-cli
 * reuse this via `.sequelizerc`.
 */

const { Sequelize } = require('sequelize')
const config = require('./env')

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    dialect: config.db.dialect,
    host: config.db.host,
    port: config.db.port,
    logging: config.db.logging ? (msg) => console.log(msg) : false,
    define: {
      // Consistent snake-cased columns with JS camelCase attributes.
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      // table name set explicitly per model for predictability; otherwise
      // Sequelize pluralises the model name (User -> users).
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
)

module.exports = sequelize
