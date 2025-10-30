const express = require('express');
const app = express();
app.use(express.json());

// Importar rotas
const usuarioRoutes = require('./routes/usuarioRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

// Usar rotas
app.use('/usuarios', usuarioRoutes);
app.use('/pedidos', pedidoRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
