const express = require('express');
const cors = require('cors');
const consign = require('consign');
const bodyParser = require('body-parser');
const jsonLayout = require('log4js-json-layout');
global.log4js = require('log4js');

const {
    getPropertiesS3
} = require('./utils/properties');

const port = process.env.NODE_PORT_DEV || 8081;

const app = express();

const logger = global.log4js.getLogger();

/** configure lo4js using JSON type file */
global.log4js.configure('./app/config/log4js.json');
global.log4js.layouts.addLayout('json', jsonLayout);

/** enable cors */
app.use(cors());

/** parse application/x-www-form-urlencoded body for @module app */
app.use(bodyParser.urlencoded({
    extended: false
}));

/** parse application json for @module app */
app.use(bodyParser.json());


// TODO Properties
getPropertiesS3(process.env.environment, [{
        chave: 'PropertiesDbDTO',
        valor: 'pagamento_db'
    },
    {
        chave: 'PropertiesDTO',
        valor: 'pgt-regra-pgto'
    }
]).then((result) => {
    Object.assign(global, result);

    /** use consign for autoload scripts into @module app */
    consign({
            cwd: __dirname
        })
        .include('routes')
        .into(app);

    /** server listening message at @module app */
    app.listen(port, (err) => {
        if (err) {
            logger.error(`Falha ao inciar o servidor na porta ${port}.`);
            return process.exit(1);
        }
        return logger.info(`Servidor iniciado na porta ${port}.`);
    });
}).catch((err) => {
    logger.error('Erro ao carregar properties. ', err);
    logger.error('Servidor não iniciado. ');
});

/** * Express App. * @module app */
module.exports = app;