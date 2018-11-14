const moment = require('moment');
const {
  PgtPagamento
} = require('../models/PgtPagamento');
const {
  postPagamentos
} = require('../service/pagamentos');
const {
  receiveMessage,
  deleteMessage
} = require('../sqs/pgt-api-bb');

const atualizaStatusPago = ({
  idPagamento
}) => PgtPagamento.update({
  idStatusPagamento: 3
}, {
  where: {
    idPagamento
  }
}).then(affectedRows => console.log('affectedRows ', affectedRows));

const contratoApiPagamentos = ({
  idPagamento,
  cpf,
  agencia,
  contaDv,
  conta,
  valorLiquido
}) => ({
  idPagamento,
  cpf,
  numAgencia: agencia,
  codDvConta: contaDv,
  numConta: conta,
  valor: valorLiquido
});

const notificaFilaErros = () => true;

const efetuaPagamentos = pagamentos => pagamentos
  .map(pagamento => postPagamentos(contratoApiPagamentos(pagamento))
    .then(({
      statusCode,
      body
    }) => {
      if (statusCode === 200) atualizaStatusPago(pagamento);
      else throw body;
    })
    .catch((err) => {
      console.log('err', err);
      notificaFilaErros(pagamento);
    }));

const consultaPagamentosAgendados = (req, res) => PgtPagamento.all({
    where: {
      dataAgendaPgto: moment('2018-11-08')
      // TODO status liberado
    }
  })
  .then((pagamentos) => {
    efetuaPagamentos(pagamentos);
    res.status(200);
    res.send();
  })
  .catch((err) => {
    res.status(err.statusCode);
    res.send(err.statusCode);
  });

const captaSQSPgtApiBB = (req, res) => receiveMessage().then((result) => {
  res.status(200);
  res.send(result);
});

module.exports = {
  consultaPagamentosAgendados,
  captaSQSPgtApiBB
};