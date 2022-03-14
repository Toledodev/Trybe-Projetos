const fs = require('fs/promises');

async function deleteTalker(req, res) {
    const { id } = req.params;
    
    const talkerFile = await fs.readFile('./talker.json', 'utf-8');
    const talkerArray = JSON.parse(talkerFile);

    const talkerIndex = talkerArray.findIndex((t) => t.id === Number(id));

    if (talkerIndex === -1) return res.status(404).json({ message: 'Talker não encontrado' });

    talkerArray.splice(talkerIndex, 1);

    await fs.writeFile('./talker.json', JSON.stringify(talkerArray));

    return res.status(204).end();
}

module.exports = deleteTalker;