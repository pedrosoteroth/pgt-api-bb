const moment = require('moment');
const {
  PgtPagamento
} = require('../models/PgtPagamento');
const {
  postPagamentos
} = require('../service/pagamentos');
const {
  receiveMessage,
  deleteMessage,
  publishMessage
} = require('../sqs/pgt-api-bb');

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

const atualizaStatusPago = ({
  idPagamento
}) => PgtPagamento.update({
  idStatusPagamento: 3
}, {
  where: {
    idPagamento
  }
}).then(affectedRows => console.log('affectedRows ', affectedRows));

const notificaFilaErros = message => publishMessage({
  message
});

const verificaSucessoApiPagamentos = ({
  statusCode,
  body,
  pagamento
}) => {
  if (statusCode === 200) atualizaStatusPago(pagamento);
  else throw body;
};

const chamaApiPagamentos = pagamento => postPagamentos(pagamento)
  .then(({
    statusCode,
    body
  }) => verificaSucessoApiPagamentos({
    statusCode,
    body,
    pagamento
  }))
  .catch((err) => {
    console.log('err ', err);
    notificaFilaErros(pagamento);
  });

const efetuaPagamentos = pagamentos => pagamentos.map(pagamento => chamaApiPagamentos(contratoApiPagamentos(pagamento)));

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

const captaSQSPgtApiBB = (req, res) => receiveMessage()
  .then(({
    receiptHandle,
    arn,
    messageId,
    subject,
    body
  }) => {
    Object.assign(body, {
      QueueMonitorId: undefined
    });

    chamaApiPagamentos(body);
    deleteMessage({
      receiptHandle,
      arn,
      messageId,
      subject
    });
    res.status(200);
    res.send(body);
  });

module.exports = {
  consultaPagamentosAgendados,
  captaSQSPgtApiBB
};