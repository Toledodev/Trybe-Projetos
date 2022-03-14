const data = require('../data/zoo_data');

const { species } = data;

function getAnimalsOlderThan(animal, age) {
  // seu código aqui
  const name = species.find((specie) => specie.name === animal);
  return name.residents.every((resident) => resident.age >= age);
}

module.exports = getAnimalsOlderThan;
