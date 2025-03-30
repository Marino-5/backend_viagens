const PacoteViagem = require('../models/PacoteViagem');  // Modelo de PacoteViagem

// Função para obter todos os pacotes
exports.getAllPacotes = async (req, res) => {
    try {
        const pacotes = await PacoteViagem.findAll();
        res.status(200).json(pacotes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar pacotes' });
    }
};

// Função para criar um novo pacote
exports.createPacote = async (req, res) => {
    try {
        const novoPacote = await PacoteViagem.create(req.body);
        res.status(201).json(novoPacote);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar pacote' });
    }
};

// Função para atualizar um pacote
exports.updatePacote = async (req, res) => {
    try {
        const pacote = await PacoteViagem.findByPk(req.params.id);
        if (!pacote) {
            return res.status(404).json({ error: 'Pacote não encontrado' });
        }
        await pacote.update(req.body);
        res.status(200).json(pacote);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar pacote' });
    }
};

// Função para excluir um pacote
exports.deletePacote = async (req, res) => {
    try {
        const pacote = await PacoteViagem.findByPk(req.params.id);
        if (!pacote) {
            return res.status(404).json({ error: 'Pacote não encontrado' });
        }
        await pacote.destroy();
        res.status(200).json({ message: 'Pacote excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir pacote' });
    }
};
