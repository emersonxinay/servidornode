
const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}
const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(StringValue){
    return StringValue;
});
const databaseConfig = {
    'hots': '127.0.0.1',
    'port': 5432,
    'database': 'delivery_db',
    'users': 'postgres',
    'password': 'emerson123'
};
const db = pgp(databaseConfig);
module.exports = db;