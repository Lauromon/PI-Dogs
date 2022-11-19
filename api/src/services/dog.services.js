//En servicios quiero modularizar los pedidos a la API y a la DB
require('dotenv').config()
const { DOG_API } = process.env; //Importo mi API con apikey ya incluida
const { Breed, Temperament } = require('../db');
const axios = require('axios');

const getApiDog = async () => {
  const apiDogs = await axios.get(DOG_API);
  const dogsInfo = await apiDogs.data.map((e) => {
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

//SELECT * FROM Breed JOIN temperament etc...
const getDbDogs = async () => {
  const perros = await Breed.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return perros.map((el) => {
    return {
      name: el.name,
      id: el.id,
      weight: el.weight,
      height: el.height,
      image: el.image,
      temperament: el.Temperaments.map((e) => e.name).join(", "),
      life_span: el.life_span
    };
  });
};

//Concateno los resultados anteriores
const getAllDogs = async () => {
  const api = await getApiDog();
  const db = await getDbDogs();
  const allDogs = api.concat(db);
  return allDogs;
}

const getApiTemperaments = async () => {
  const apiTemperaments = await getApiDog();
  const temperamentList = apiTemperaments
    .map((el) => el.temperament?.split(", "))
    .flat();
  const temperament = [...new Set(temperamentList)];
  await temperament.forEach(async element => {
    if (element) {
      Temperament.findOrCreate({
        where: { name: element }
      });
    }
  });
}

const getRandomImg = async () => {
  const apiImg = await axios.get("https://dog.ceo/api/breeds/image/random");
  const img = apiImg.data.message;
  return img;
}
module.exports = { getApiDog, getDbDogs, getAllDogs, getApiTemperaments, getRandomImg};