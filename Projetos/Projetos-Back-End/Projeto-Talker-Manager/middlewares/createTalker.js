const fs = require('fs/promises');

async function createTalker(req, res) {
    const { name, age, talk } = req.body;

    const talkerFile = await fs.readFile('./talker.json', 'utf-8');
    const talkerArray = JSON.parse(talkerFile);

    const lastIdRegistred = talkerArray.sort((a, b) => b.id - a.id)[0].id;

    const newTalker = {
        name,
        age,
        talk,
        id: lastIdRegistred + 1,
    };

    talkerArray.push(newTalker);
    await fs.writeFile('./talker.json', JSON.stringify(talkerArray));
    return res.status(201).json(newTalker);
}

module.exports = createTalker;