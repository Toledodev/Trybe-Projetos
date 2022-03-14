const fs = require('fs/promises');

async function edit(req, res) {
    const { name, age, talk } = req.body;
    const { id } = req.params;

    const talkerFile = await fs.readFile('./talker.json', 'utf-8');
    const talkerArray = JSON.parse(talkerFile);
    const talkerIndex = talkerArray.findIndex((t) => t.id === Number(id));

    if (talkerIndex === -1) return res.status(404).json({ message: 'Talker não encontrado' });
    talkerArray[talkerIndex] = { ...talkerArray[talkerIndex], name, age, talk };
    
    await fs.writeFile('./talker.json', JSON.stringify(talkerArray));

    return res.status(200).json({ name, age, talk, id: Number(id) });
}
module.exports = edit;