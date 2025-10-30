const pedidoCtrl = require('../controllers/pedidoController');
const usuarioCtrl = require('../controllers/usuarioController');
const { sequelize } = require('../models');

describe('📦 Testes do pedidoController', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    // 5️⃣ Criar pedido
    test('deve criar um pedido vinculado ao usuário', async () => {
        const user = await usuarioCtrl.criarUsuario('Arthur', 'a@email.com');
        const pedido = await pedidoCtrl.criarPedido(user.id, 'Caderno', 25);
        expect(pedido.usuarioId).toBe(user.id);
        expect(pedido.descricao).toBe('Caderno');
    });

    // 6️⃣ Listar pedidos do usuário
    test('deve listar todos os pedidos de um usuário', async () => {
        const user = await usuarioCtrl.criarUsuario('Maria', 'm@email.com');
        await pedidoCtrl.criarPedido(user.id, 'Teclado', 100);
        await pedidoCtrl.criarPedido(user.id, 'Mouse', 50);

        const pedidos = await pedidoCtrl.listarPedidosDoUsuario(user.id);
        expect(pedidos.length).toBe(2);
    });

    // 7️⃣ Calcular total dos pedidos do usuário
    test('deve calcular corretamente o total dos pedidos de um usuário', async () => {
        const user = await usuarioCtrl.criarUsuario('Carlos', 'c@email.com');
        await pedidoCtrl.criarPedido(user.id, 'Cadeira', 300);
        await pedidoCtrl.criarPedido(user.id, 'Mesa', 200);

        const total = await pedidoCtrl.calcularTotalPedidos(user.id);
        expect(total).toBe(500);
    });
});
