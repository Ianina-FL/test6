module.exports = {
  production: {
    pool_mode: 'transaction',
    dialect: 'postgres',
    username: 'postgres.xksxqwxansadeumntmwr',
    password: 'Owner123',
    database: 'postgres',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    logging: console.log,
    seederStorage: 'sequelize',
  },
  development: {
    username: 'postgres',
    dialect: 'postgres',
    password: '',
    database: 'db_test6',
    host: process.env.DB_HOST || 'localhost',
    logging: console.log,
    seederStorage: 'sequelize',
  },
  dev_stage: {
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: console.log,
    seederStorage: 'sequelize',
  },
};
