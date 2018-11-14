const {
    efetuaPagamento,
    captaSQSPgtApiBB
} = require('../controllers/pagamentoController');

module.exports = (app) => {
    app.post('/pagamentos', efetuaPagamento);
    app.get('/capta', captaSQSPgtApiBB);
};