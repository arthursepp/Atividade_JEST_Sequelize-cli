const { sequelize } = require('../models');

beforeAll(async () => {
    // Cria todas as tabelas antes dos testes
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    // Fecha a conexão com o banco após os testes
    await sequelize.close();
});
