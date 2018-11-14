const {
    consultaPagamentosAgendados,
    efetuaPagamento,
    captaSQSPgtApiBB
} = require('../controllers/pagamentoController');

module.exports = (app) => {
    app.post('/consulta', consultaPagamentosAgendados);
    app.get('/capta', captaSQSPgtApiBB);
};