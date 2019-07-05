function relatorioDao(connection) {
    this._connection = connection;
}

relatorioDao.prototype.salva = function(relatorio,callback) {
    this._connection.query('INSERT INTO relatorios SET ?', relatorio, callback);
}

relatorioDao.prototype.buscaPorId = function (id,callback) {
    this._connection.query("select * from relatorios where id = ?",[id],callback);
}

module.exports = function(){
    return relatorioDao;
};