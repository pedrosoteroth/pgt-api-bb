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

async function efetuaPagamento(req, res) {
  res.status(200);
  res.send(req.body);
  // const result = await postPagamentos(pagamento);
  // if (result.statusCode === 200) {
  //   PgtPagamento.update({
  //     idStatusPagamento: 3
  //   }, {
  //     where: {
  //       idPagamento: pagamento.idPagamento
  //     }
  //   }).then((affectedRows) => {
  //     console.log('affectedRows ', affectedRows);
  //   });
  // }
}

const captaSQSPgtApiBB = (req, res) => receiveMessage().then((result) => {
  res.status(200);
  res.send(result);
});

module.exports = {
  efetuaPagamento,
  captaSQSPgtApiBB
};