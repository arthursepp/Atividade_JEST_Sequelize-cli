const { Usuario, Pedido } = require('../models');
const { Op } = require('sequelize');

// 1
async function criarUsuario(nome, email) {
    return await Usuario.create({ nome, email });
}

// 2
async function buscarUsuarioPorId(id) {
    return await Usuario.findByPk(id);
}

// 3
async function atualizarNomeUsuario(id, novoNome) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;
    usuario.nome = novoNome;
    await usuario.save();
    return usuario;
}

// 4
async function deletarUsuario(id) {
    const deletados = await Usuario.destroy({ where: { id } });
    return deletados > 0;
}

// 8
async function contarUsuarios() {
    return await Usuario.count();
}

// 9
async function usuarioComMaisPedidos() {
    const usuarios = await Usuario.findAll({
        include: [{ model: Pedido, as: 'pedidos' }],
    });

    if (!usuarios.length) return null;

    let top = usuarios[0];
    for (const u of usuarios) {
        if ((u.pedidos?.length || 0) > (top.pedidos?.length || 0)) top = u;
    }
    return top;
}

// 10
async function usuariosAcimaDe(valor) {
    const usuarios = await Usuario.findAll({
        include: [{ model: Pedido, as: 'pedidos' }],
    });

    return usuarios.filter(u => {
        const total = u.pedidos.reduce((s, p) => s + p.valor, 0);
        return total > valor;
    });
}

module.exports = {
    criarUsuario,
    buscarUsuarioPorId,
    atualizarNomeUsuario,
    deletarUsuario,
    contarUsuarios,
    usuarioComMaisPedidos,
    usuariosAcimaDe,
};
