const invalidDay = (day) => (day < 1 || day > 31);
const invalidMonth = (month) => (month < 1 || month > 12);
const invalidYear = (year) => (year < 1 || year > 9999);

function invalidDate(date) {
    const dateSplit = date.split('/');
    if (dateSplit.length !== 3) return true;
    const day = Number(dateSplit[0]);
    const month = Number(dateSplit[1]);
    const year = Number(dateSplit[2]);
    if (invalidDay(day)) return true;
    if (invalidMonth(month)) return true;
    if (invalidYear(year)) return true;
    return false;
}

const invalidRate = (rate) => {
    if (typeof rate !== 'number' || !Number.isInteger(rate)) return true;
    if (rate < 1 || rate > 5) return true;
    return false;
};

function invalidTalkObj(talk) {
    if (talk === undefined || talk.watchedAt === undefined || talk.rate === undefined) {
     return true;
    }
    return false;
}

function validateTalk(req, res, next) {
    const { talk } = req.body;
    if (invalidTalkObj(talk)) {
        return res.status(400).json({
          message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
        });
      }
      if (invalidDate(talk.watchedAt)) {
        return res.status(400).json({
          message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
      }
      if (invalidRate(talk.rate)) {
        return res.status(400).json({
          message: 'O campo "rate" deve ser um inteiro de 1 à 5',
        });
      }
      next();
    }
    
    module.exports = validateTalk;