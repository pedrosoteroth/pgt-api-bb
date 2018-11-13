const {
  PgtPagamento
} = require('../models/PgtPagamento');
const {
  postPagamentos
} = require('../service/pagamentos');

async function efetuaPagamento(pagamento) {
  const result = await postPagamentos(pagamento);
  console.log('result ', result);
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

module.exports = {
  efetuaPagamento
};