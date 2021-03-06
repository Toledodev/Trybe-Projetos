const { employees, species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  // seu código aqui
  const employeeCheck = employees.find((employee) => employee.id === id);
  const firstSpecie = species.find((specie) => specie.id === employeeCheck.responsibleFor[0]);
  const oldSpecie = firstSpecie.residents.sort((animal1, animal2) => animal2.age - animal1.age);
  return Object.values(oldSpecie[0]);
}

module.exports = getOldestFromFirstSpecies;
