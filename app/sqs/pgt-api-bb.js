const logger = global.log4js.getLogger('[sqs-pgt-api-bb]');

const {
    SNS_Post,
    SQS_Get,
    SQS_DeleteWithMonitor
} = require('brcap-aws');

const queueUrl = 'https://sqs.sa-east-1.amazonaws.com/798354115863/SQS_PGT_API_BB_DEV';

const receiveMessage = () => new Promise((resolve, reject) => SQS_Get(queueUrl, global.PropertiesDTO.region, (error, data) => {
    if (error) {
        logger.error('** Erro ao chamar biblioteca brcap-aws.SQS_Get: ', error);
        logger.error('** Erro queueUrl : ', queueUrl);
        logger.error('** Erro statusCode: ', data.code || undefined);
        reject(error);
    } else {
        resolve(data);
    }
}));

const deleteMessage = ({
    receiptHandle,
    arn,
    messageId,
    subject
}) => new Promise((resolve, reject) => {
    logger.debug('Requisição deletar para a fila');
    SQS_DeleteWithMonitor(queueUrl, receiptHandle, arn, messageId, subject, global.PropertiesDTO.region, (error) => {
        if (error) {
            logger.error('Erro ao apagar a mensagem da fila : ', queueUrl);
            logger.error('Erro ao apagar o handler : ', receiptHandle);
            reject(error);
        } else {
            logger.info(`Mesagem apagada da fila de Comissão : receiptHandle ${receiptHandle}`);
            resolve(receiptHandle);
        }
    });
});

module.exports = {
    receiveMessage,
    deleteMessage
};