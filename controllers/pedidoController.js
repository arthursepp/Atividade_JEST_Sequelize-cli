const { Pedido, Usuario } = require('../models');

// 5
async function criarPedido(usuarioId, descricao, valor) {
    return await Pedido.create({ usuarioId, descricao, valor });
}

// 6
async function listarPedidosDoUsuario(usuarioId) {
    return await Pedido.findAll({ where: { usuarioId } });
}

// 7
async function calcularTotalPedidos(usuarioId) {
    const pedidos = await Pedido.findAll({ where: { usuarioId } });
    return pedidos.reduce((soma, p) => soma + p.valor, 0);
}

module.exports = {
    criarPedido,
    listarPedidosDoUsuario,
    calcularTotalPedidos,
};
