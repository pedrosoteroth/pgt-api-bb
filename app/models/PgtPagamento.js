const {
    Sequelize,
    getSequelize
} = require('./index');

const schemaPgtPagamento = {
    idPagamento: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        field: 'ID_PAGAMENTO'
    },
    codIdentEmpresa: {
        type: Sequelize.STRING(5),
        field: 'COD_IDENT_EMPRESA',
        allowNull: false
    },
    codIdentTransacao: {
        type: Sequelize.JSON,
        field: 'COD_IDENT_TRANSACAO',
        allowNull: false
    },
    dataBase: {
        type: Sequelize.DATE,
        field: 'DATA_BASE',
        allowNull: false
    },
    valorBase: {
        type: Sequelize.DECIMAL,
        field: 'VALOR_BASE',
        allowNull: false
    },
    valorAplicado: {
        type: Sequelize.DECIMAL,
        field: 'VALOR_APLICADO',
        allowNull: false
    },
    idTipoCompromisso: {
        type: Sequelize.BIGINT,
        field: 'ID_TIPO_COMPROMISSO',
        allowNull: false
    },
    idFormaCredito: {
        type: Sequelize.INTEGER,
        field: 'ID_FORMA_CREDITO',
        allowNull: false
    },
    banco: {
        type: Sequelize.STRING(3),
        field: 'BANCO',
        allowNull: true
    },
    agencia: {
        type: Sequelize.INTEGER,
        field: 'AGENCIA',
        allowNull: true
    },
    agenciaDv: {
        type: Sequelize.STRING(1),
        field: 'AGENCIA_DV',
        allowNull: true
    },
    contaDv: {
        type: Sequelize.STRING(1),
        field: 'CONTA_DV',
        allowNull: true
    },
    conta: {
        type: Sequelize.BIGINT,
        field: 'CONTA',
        allowNull: true
    },
    cpf: {
        type: Sequelize.BIGINT,
        field: 'CPF',
        allowNull: false
    },
    percentualIsencao: {
        type: Sequelize.DECIMAL,
        field: 'PERCENT_ISENCAO',
        allowNull: false
    },
    dataEfetivacao: {
        type: Sequelize.DATE,
        field: 'DATA_EFETIVACAO',
        allowNull: true
    },
    tpSolicitacao: {
        type: Sequelize.STRING(2),
        field: 'TP_SOLICITACAO',
        allowNull: false
    },
    valorAtualizacao: {
        type: Sequelize.DECIMAL,
        field: 'VALOR_ATUALIZACAO',
        allowNull: false
    },
    valorTributavel: {
        type: Sequelize.DECIMAL,
        field: 'VALOR_TRIBUTAVEL',
        allowNull: false
    },
    valorIrrf: {
        type: Sequelize.DECIMAL,
        field: 'VALOR_IRRF',
        allowNull: false
    },
    valorLiquido: {
        type: Sequelize.DECIMAL,
        field: 'VALOR_LIQUIDO',
        allowNull: false
    },
    valorBruto: {
        type: Sequelize.DECIMAL,
        field: 'VALOR_BRUTO',
        allowNull: false
    },
    dataLiquidacao: {
        type: Sequelize.DECIMAL,
        field: 'DATA_LIQUIDACAO'
    },
    idStatusPagamento: {
        type: Sequelize.INTEGER,
        field: 'ID_STATUS_PAGAMENTO'
    },
    objeto: {
        type: Sequelize.STRING,
        field: 'OBJETO'
    },
    idPontoVenda: {
        type: Sequelize.BIGINT,
        field: 'ID_PONTO_VENDA'
    },
    loginResponsavelLiquidacao: {
        type: Sequelize.STRING,
        field: 'LOGIN_RESPONSAVEL_LIQUIDACAO'
    },
    dataInclusao: {
        type: Sequelize.DATE,
        field: 'DATA_INCLUSAO'
    },
    dataAlteracao: {
        type: Sequelize.DATE,
        field: 'DATA_ALTERACAO'
    },
    dataPagamento: {
        type: Sequelize.DATE,
        field: 'DATA_PAGAMENTO'
    },
    dataPrevisaoLiquidacao: {
        type: Sequelize.DATEONLY,
        field: 'DATA_PREVISAO_LIQUIDACAO'
    },
    idParceiro: {
        type: Sequelize.BIGINT,
        field: 'ID_PARCEIRO'
    },
    idCanal: {
        type: Sequelize.BIGINT,
        field: 'ID_CANAL'
    },
    idProtocolo: {
        type: Sequelize.BIGINT,
        field: 'ID_PROTOCOLO'
    },
    ufPagamento: {
        type: Sequelize.STRING(2),
        field: 'UF_PAGAMENTO'
    },
    usuario: {
        type: Sequelize.STRING(45),
        field: 'USUARIO'
    },
    idPlano: {
        type: Sequelize.BIGINT,
        field: 'ID_PLANO'
    },
    dataAgendaPgto: {
        type: Sequelize.DATEONLY,
        field: 'DATA_AGENDA_PGTO'
    },
    numTitulo: {
        type: Sequelize.BIGINT(20),
        field: 'NUM_TITULO'
    },
    numSerie: {
        type: Sequelize.STRING(2),
        field: 'NUM_SERIE',
        unique: true
    },
    nomePlano: {
        type: Sequelize.STRING(30),
        field: 'NOME_PLANO',
        unique: true
    }
};

const PgtPagamento = getSequelize().define(
    'PGT_PAGAMENTO_TB', schemaPgtPagamento, {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = {
    PgtPagamento
};