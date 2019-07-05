var mysql  = require('mysql');

function createDBConnection(){
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Satyan123',
            database: 'testerelatorios'
        });
}

module.exports = function() {
    return createDBConnection;
}