const { DOG_API } = process.env;
const { Temperament } = require('../db');
const axios = require('axios');

const getApiTemperaments = async () => {
    const apiTemperaments = await axios.get(DOG_API);
    const temperamentList = apiTemperaments.data.map((e) => {
        e.temperament.split(', ')
    }).flat();
    const objTemperaments = temperamentList.map((e) => {
        return {
            name: e
        }
    });
    await objTemperaments.forEach(element => {
         Temperament.findOrCreate({
            where: element,
          });
    });
}

const getDbTemperaments = async () => {
    const temperaments = await Temperament.findAll();
    return temperaments;
}

module.exports = { getApiTemperaments, getDbTemperaments };