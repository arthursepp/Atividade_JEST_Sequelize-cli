const usuarioCtrl = require('../controllers/usuarioController');
const pedidoCtrl = require('../controllers/pedidoController');
const { sequelize, Usuario, Pedido } = require('../models');

describe('🧍‍♂️ Testes do usuarioController', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true }); // limpa o banco antes de cada teste
    });

    // 1️⃣ Criar usuário
    test('deve criar um usuário corretamente', async () => {
        const usuario = await usuarioCtrl.criarUsuario('Arthur', 'arthur@email.com');
        expect(usuario.nome).toBe('Arthur');
        expect(usuario.email).toBe('arthur@email.com');
    });

    // 2️⃣ Buscar usuário
    test('deve buscar um usuário pelo ID', async () => {
        const novo = await usuarioCtrl.criarUsuario('Maria', 'maria@email.com');
        const encontrado = await usuarioCtrl.buscarUsuarioPorId(novo.id);
        expect(encontrado.nome).toBe('Maria');
    });

    // 3️⃣ Atualizar nome do usuário
    test('deve atualizar o nome do usuário', async () => {
        const u = await usuarioCtrl.criarUsuario('João', 'joao@email.com');
        const atualizado = await usuarioCtrl.atualizarNomeUsuario(u.id, 'João Silva');
        expect(atualizado.nome).toBe('João Silva');
    });

    // 4️⃣ Deletar usuário
    test('deve deletar um usuário existente', async () => {
        const u = await usuarioCtrl.criarUsuario('Ana', 'ana@email.com');
        const resultado = await usuarioCtrl.deletarUsuario(u.id);
        expect(resultado).toBe(true);
        const verif = await usuarioCtrl.buscarUsuarioPorId(u.id);
        expect(verif).toBeNull();
    });

    // 8️⃣ Contar usuários
    test('deve contar corretamente os usuários', async () => {
        await usuarioCtrl.criarUsuario('User1', '1@email.com');
        await usuarioCtrl.criarUsuario('User2', '2@email.com');
        const count = await usuarioCtrl.contarUsuarios();
        expect(count).toBe(2);
    });

    // 9️⃣ Usuário com mais pedidos
    test('deve retornar o usuário com mais pedidos', async () => {
        const a = await usuarioCtrl.criarUsuario('Arthur', 'a@email.com');
        const b = await usuarioCtrl.criarUsuario('Beatriz', 'b@email.com');

        await pedidoCtrl.criarPedido(a.id, 'Mouse', 50);
        await pedidoCtrl.criarPedido(a.id, 'Teclado', 100);
        await pedidoCtrl.criarPedido(b.id, 'Monitor', 400);

        const top = await usuarioCtrl.usuarioComMaisPedidos();
        expect(top.nome).toBe('Arthur');
    });

    // 🔟 Usuários acima de certo valor total
    test('deve retornar usuários com total acima do valor informado', async () => {
        const a = await usuarioCtrl.criarUsuario('Arthur', 'a@email.com');
        const b = await usuarioCtrl.criarUsuario('Beatriz', 'b@email.com');

        await pedidoCtrl.criarPedido(a.id, 'Monitor', 300);
        await pedidoCtrl.criarPedido(b.id, 'Cabo HDMI', 40);

        const resultado = await usuarioCtrl.usuariosAcimaDe(100);
        expect(resultado.length).toBe(1);
        expect(resultado[0].nome).toBe('Arthur');
    });
});
