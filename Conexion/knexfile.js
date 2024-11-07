const knex = require('knex');

const development = {
    client: 'mssql',
    connection: {
        host: 'ALEJANDROLEAL\\SQLEXPRESS',
        port: 1433,
        user: 'sa',
        password: 'Itapu6Ctp',
        database: 'CatacionesDeVinos',
        options: {
            enableArithAbort: true,
            encrypt: false
        }
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};

const dbConnection = knex(development);

module.exports = dbConnection;
