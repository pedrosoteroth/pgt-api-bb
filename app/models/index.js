const Sequelize = require('sequelize');

const getSequelize = () => new Sequelize(
    global.PropertiesDbDTO.dbName,
    global.PropertiesDbDTO.dbUser,
    global.PropertiesDbDTO.dbPassword, {
        host: global.PropertiesDbDTO.dbHost,
        port: global.PropertiesDbDTO.dbPort,
        dialect: global.PropertiesDbDTO.dbDialect,
        logging: true,
        benchmark: false
    });

module.exports = {
    Sequelize,
    getSequelize
};