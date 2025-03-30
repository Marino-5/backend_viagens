const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const pacoteRoutes = require('./routes/pacoteRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use('/api', pacoteRoutes);

// Sincroniza o banco de dados e inicia o servidor
sequelize.sync().then(() => {
    console.log('Banco sincronizado!');
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
}).catch((error) => {
    console.error('Erro ao sincronizar banco:', error);
});
