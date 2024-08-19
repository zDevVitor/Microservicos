// O arquivo principal do servidor que configura o Express e as rotas.

const express = require('express');
const path = require('path');
const app = express();
const authRoutes = require('./auth'); // Importa as rotas de autenticação

app.use(express.json()); // Permite que o Express lide com JSON no corpo da solicitação
app.use(express.static(path.join(__dirname, 'public'))); // Define a pasta 'public' para servir arquivos estáticos

app.use('/api/auth', authRoutes); // Usa as rotas de autenticação

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
