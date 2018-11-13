const request = require('request');

const logger = global.log4js.getLogger('[payments]');

const url = `${global.PropertiesDTO.urlDarwinPagamento}/pagamentos`;
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