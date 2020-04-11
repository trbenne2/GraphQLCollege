const pg = require('pg');

// Hack required to support connection strings and ssl in knex
// https://github.com/tgriesser/knex/issues/852#issuecomment-229502678
pg.defaults.ssl = true;

let connection = process.env.DATABASE_URL;

module.exports = {
  client: 'pg',
  connection,
};
