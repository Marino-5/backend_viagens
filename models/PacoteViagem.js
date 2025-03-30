const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PacoteViagem = sequelize.define('PacoteViagem', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destino: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_fim: {
        type: DataTypes.DATE,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    imagem_url: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'PacoteViagem',
    timestamps: false  // Se não precisar dos campos createdAt e updatedAt
});

module.exports = PacoteViagem;
