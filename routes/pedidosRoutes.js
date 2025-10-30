const express = require('express');
const router = express.Router();
const pedidoCtrl = require('../controllers/pedidoController');

// -------------------------------------------------------------
// 🟢 1. Criar pedido
// -------------------------------------------------------------
router.post('/', async (req, res) => {
    try {
        const { usuarioId, descricao, valor } = req.body;
        const pedido = await pedidoCtrl.criarPedido(usuarioId, descricao, valor);
        res.status(201).json(pedido);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar pedido', detalhes: error.message });
    }
});

// -------------------------------------------------------------
// 🟡 2. Listar pedidos de um usuário
// -------------------------------------------------------------
router.get('/usuario/:usuarioId', async (req, res) => {
    try {
        const pedidos = await pedidoCtrl.listarPedidosDoUsuario(req.params.usuarioId);
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao listar pedidos', detalhes: error.message });
    }
});

// -------------------------------------------------------------
// 🔵 3. Calcular total dos pedidos de um usuário
// -------------------------------------------------------------
router.get('/usuario/:usuarioId/total', async (req, res) => {
    try {
        const total = await pedidoCtrl.calcularTotalPedidos(req.params.usuarioId);
        res.json({ usuarioId: req.params.usuarioId, total });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao calcular total', detalhes: error.message });
    }
});

module.exports = router;
