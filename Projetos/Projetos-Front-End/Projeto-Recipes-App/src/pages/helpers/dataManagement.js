const filterObjIntoArray = (obj, filter) => Object.values(Object
  .fromEntries(Object.entries(obj).filter(([key]) => key.includes(filter))))
  .filter((value) => value);

export default filterObjIntoArray;
