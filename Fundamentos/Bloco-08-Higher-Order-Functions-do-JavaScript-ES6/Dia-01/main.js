const retornaString = () => 'Acordando!!';
const retornaString2 = () => 'Bora tomar café!!';
const retornaString3 = () => 'Partiu dormir!!';

const doingThings = (func) => func ();
console.log(doingThings(retornaString3));