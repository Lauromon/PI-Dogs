const { getApiTemperaments } = require('../services/dog.services');
const { Temperament } = require('../db')


const getTemperaments = async (req, res, next) => {
    try {
        const count = await Temperament.count();
        if (count === 0) {
            await getApiTemperaments();
            const t = await Temperament.findAll();
            return res.status(200).json(t);
        } else {
            const t = await Temperament.findAll();
            return res.status(200).json(t);
        }
    } catch (error) {
        next(error.message)
    }
};

module.exports = { getTemperaments };