// Define as rotas para registro e login de usuários.

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const secretKey = 'supersecretkey'; // Chave secreta para gerar JWT (em um projeto real, armazene isso de forma segura)

let users = []; // Array para armazenar usuários em memória (substitua por um banco de dados em um projeto real)

// Rota de Registro
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Verifica se o usuário já existe
    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criptografa a senha
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Cria um novo usuário e o adiciona ao array
    const newUser = { username, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
});

// Rota de Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verifica se o usuário existe
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verifica a senha
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Gera um token JWT
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login realizado com sucesso', token });
});

module.exports = router;
