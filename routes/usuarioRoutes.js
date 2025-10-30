const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuarioController');

router.post('/', async (req, res) => {
    const { nome, email } = req.body;
    const usuario = await usuarioCtrl.criarUsuario(nome, email);
    res.json(usuario);
});

router.get('/:id', async (req, res) => {
    const usuario = await usuarioCtrl.buscarUsuarioPorId(req.params.id);
    res.json(usuario);
});

module.exports = router;
