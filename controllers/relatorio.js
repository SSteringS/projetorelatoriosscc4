module.exports = function(app){
    app.get('/relatorios', function(req, res){
        console.log('recebida requisicão de relatorios na porta 3000');
        res.send('OK.')
    })

    app.get('/relatorios/relatorio/:id', function(req, res){

        var relatorio = {};
        var id = req.params.id;

        relatorio.id = id;

        var connection = app.persistencia.connectionFactory();
        var relatorioDao = new app.persistencia.relatorioDao(connection);

        relatorioDao.buscaPorId(relatorio, function(erro){
            if(erro){
                res.status(500).sen(erro);
                return
            }
            console.log('consultando relatorio');
            res.send(relatorio);
        })
    })

    app.post("/relatorios/relatorio",function(req, res) {
        var relatorio = req.body;
        console.log('processando relatorio...');

        relatorio.status = "CRIADO";
        relatorio.data = new Date;
        
        var connection = app.persistencia.connectionFactory();
        var relatorioDao = new app.persistencia.relatorioDao(connection);

        relatorioDao.salva(relatorio, function(erro, resultado){
            if(erro){
                console.log('Erro ao inserir no banco;' + erro);
                res.status(500).send(erro);
            } else{
                console.log('relatorio criado');
                res.location('/relatorios/relatorio/' + resultado.insertId);

                res.status(201).json(relatorio);
            }
        });
    });
}