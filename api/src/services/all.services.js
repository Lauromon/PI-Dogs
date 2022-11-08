//En servicios quiero modularizar los pedidos a la API y a la DB

const { DOG_API } = process.env; //Importo mi API con apikey ya incluida
const { Breed, Temperament  } = require('../db');
const axios = require('axios');

const getApiDog = async () => {
    const apiDogs = await axios.get(DOG_API);
    const dogsInfo = apiDogs.data.map((e) => {
        return {
            id: e.id,
            name: e.name,
            temperament: e.temperament,
            weight: e.weight.metric,
            height: e.height.metric,
            image: e.image.url,
            life_span: e.life_span
        }
    })
    return dogsInfo;
}

const getDbDogs = async () => {
    //SELECT * FROM Breed JOIN temperament etc...
    const dbDogs = await Breed.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    })
    //findAll me devuelve mucha data que no me interesa, asi que me llevo lo que realmente quiero
    const dogsInfo = dbDogs.map((e) => {
        return {
            id: e.id,
            name: e.name,
            temperament: e.temperament.map((e) => e.name).join(", "),
            weight: e.weight.metric,
            height: e.height.metric,
            image: e.image.url,
            life_span: e.life_span
        }
    })
    return dogsInfo;
}

//Concateno los resultados anteriores
const getAllDogs = async() => {
    const api = await getApiDog();
    const db = await getDbDogs();
    const allDogs = api.concat(db);
    return allDogs;
}

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


module.exports = { getApiDog, getDbDogs, getAllDogs, getApiTemperaments, getDbTemperaments };