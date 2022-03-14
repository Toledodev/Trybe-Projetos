const crypto = require('crypto');

const tokenGen = () => crypto.randomBytes(8).toString('hex');

function login(_req, res) {
    const response = { token: tokenGen() };
    return res.status(200).json(response);
}

function validEmail(email) {
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return emailRegex.test(email);
}

function verifyEmail(req, res, next) {
    const { email } = req.body;
    if (!email || email.length === 0) {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }
     if (!validEmail(email)) {
        return res.status(400)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' });   
    }
    next();
}

function verifyPassword(req, res, next) {
    const { password } = req.body;
    if (!password || password.length === 0) {
        return res.status(400)
        .json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
        return res.status(400)
        .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    next();
}

module.exports = { verifyEmail, verifyPassword, login };
