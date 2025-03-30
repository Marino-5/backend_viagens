const express = require('express');
const router = express.Router();
const PacoteController = require('../controllers/PacoteController');

// Definindo as rotas para os pacotes
router.get('/pacotes', PacoteController.getAllPacotes);
router.post('/pacotes', PacoteController.createPacote);
router.put('/pacotes/:id', PacoteController.updatePacote);
router.delete('/pacotes/:id', PacoteController.deletePacote);

module.exports = router;
