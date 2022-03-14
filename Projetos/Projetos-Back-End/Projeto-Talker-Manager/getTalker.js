const express = require('express');
const fs = require('fs/promises');
const token = require('./middlewares/token');
const createTalker = require('./middlewares/createTalker');
const validateAge = require('./middlewares/validateAge');
const validateName = require('./middlewares/validateName');
const validateTalk = require('./middlewares/validateTalk');
const editTalker = require('./middlewares/editalker');
const deleteTalker = require('./middlewares/deleteTalker');

const router = express.Router();

router.get('/', async (_req, res) => {
    const fileTalker = await fs.readFile('./talker.json', 'utf-8');
    const talkerArray = JSON.parse(fileTalker);
    return res.status(200).json(talkerArray);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkerFile = await fs.readFile('./talker.json', 'utf-8');
    const talkerArray = JSON.parse(talkerFile);
    const talker = talkerArray.find((t) => t.id === Number(id));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(200).json(talker);
});

router.put('/:id',
token,
validateName,
validateAge,
validateTalk,
editTalker);

router.post('/',
token,
validateName,
validateAge,
validateTalk,
createTalker);

router.delete('/:id',
token,
deleteTalker);

module.exports = router;
