const request = require('request');

const logger = global.log4js.getLogger('[payments]');
// TODO properties
const url = 'https://qhg4g3q2db.execute-api.sa-east-1.amazonaws.com/dev/pagamentos';
const postPagamentos = params => new Promise((resolve, reject) => request.post({
    url,
    form: params,
    json: true
}, (err, res, body) => {
    logger.info('Retorno do solicita Pagamento Body => ', body);
    logger.info('Retorno do solicita Pagamento ERR => ', err);
    logger.info('Retorno do solicita Pagamento Status => ', res.statusCode);
    if (err) reject(err);
    resolve({
        statusCode: res.statusCode,
        body
    });
}));

module.exports = {
    postPagamentos
};