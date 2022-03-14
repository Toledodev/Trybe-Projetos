const data = require('../data/zoo_data');

const { species } = data;

const speciesMap = {
  NE: species.filter((anim) => anim.location === 'NE').map((specie) => specie.name),
  NW: species.filter((anim) => anim.location === 'NW').map((specie) => specie.name),
  SE: species.filter((anim) => anim.location === 'SE').map((specie) => specie.name),
  SW: species.filter((anim) => anim.location === 'SW').map((specie) => specie.name),
};

const residents = (sorted, gender, names) => {
  const search = species.find((anim) => anim.name === names).residents;
  if (sorted && gender !== undefined) {
    return search.filter((resident) => resident.sex === gender)
      .map((specie) => specie.name).sort();
  }
  if (sorted) {
    return search.map((specie) => specie.name).sort();
  }
  if (gender !== undefined) {
    return search.filter((resident) => resident.sex === gender).map((specie) => specie.name);
  }
  return search.map((specie) => specie.name);
};

const getAnimalMapOptions = (sorted, sex) => {
  const keys = Object.keys(speciesMap).reduce((acc, curr) => {
    acc[curr] = speciesMap[curr].map((elem) => ({
      [elem]: residents(sorted, sex, elem),
    }));
    return acc;
  }, {});
  return keys;
};

const getAnimalMap = (options) => {
  if (!options) {
    return speciesMap;
  }
  const { includeNames, sorted, sex } = options;
  if (includeNames) {
    return getAnimalMapOptions(sorted, sex);
  }
  return speciesMap;
};

module.exports = getAnimalMap;
