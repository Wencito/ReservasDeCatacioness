// knexfile.js
import knex from 'knex';

export const development = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: '',
    database: 'fichador'
  },
};
  
const dbConnection = knex(development);

export default dbConnection;