//Importo mis funciones desde services
const { getAllDogs, getRandomImg } = require('../services/dog.services');
const { Breed, Temperament } = require('../db');
const { default: axios } = require('axios');

const getDogs = async (req, res, next) => {
  const { name } = req.query;
  try {
    const dogs = await getAllDogs();
    if (!name) {
      const allDogs = dogs.map((e) => {
        return {
          id: e.id,
          image: e.image,
          name: e.name,
          temperament: e.temperament,
          weight: e.weight
        }
      });
      return res.status(200).json(allDogs);
    } else {
      const dogNamed = dogs.reduce((dog, e) => {
        if (e.name.toLowerCase().includes(name.toLowerCase())) {
          dog.push({
            id: e.id,
            image: e.image,
            name: e.name,
            temperament: e.temperament,
            weight: e.weight
          })
        }
        return dog;
      }, []);
      dogNamed.length ? res.status(200).json(dogNamed) :
        res.status(404).send({ msg: "Breed not found :(" })
    }

  } catch (error) {
    res.status(404).send({ msg: "Breed not found :(" })
  }
};


const getDogID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dogsTotal = await getAllDogs();
    if (id) {
      const idDog = await dogsTotal.find(dog => dog.id == id);
      idDog ? res.status(200).send(idDog) : res.status(404).send('Breed not found :(');
    }
  } catch (error) {
    next(error.message);
  }
};

const createDog = async (req, res, next) => {
  const { name, temperament, weight, height, life_span } = req.body;
  var { image } = req.body;
  
  try {

    if (image == null){
      image = await getRandomImg();
      console.log(image,"imagen")
    }
    
      const newDog = await Breed.create({
        name,
        weight,
        height,
        image,
        life_span
      })
      await temperament.forEach(async element => {
        if (element) {
          Temperament.findOrCreate({
            where: { name: element }
          });
        }
      });
      await temperament.forEach(async element => {
        if (element) {
          const temperamentDb = await Temperament.findAll({
            where: { name: element }
          });
          await newDog.addTemperament(temperamentDb);
        }
      });

      return res.status(201).send('Breed created!')
    
    
  } catch (error) {
    res.status(404).send(error.message)
  }
};

const updateDbDog = async (req, res, next) => {
  const { id } = req.params;
  const { name, temperament, weight, height, image, life_span } = req.body;
  try {
    const dogId = await Breed.findByPk(id)
    if (!dogId) return res.status(400).send("ERROR: That id doesn't exists.");
    if (name) {
      const repeatedName = await Breed.findOne({ where: { name: name } });
      if (repeatedName) return res.status(400).send("ERROR: Breed already exists.");
    }

    name && dogId.set({ name: name });
    weight && dogId.set({ weight: weight });
    height && dogId.set({ height: height });
    life_span && dogId.set({ life_span: life_span });
    image && dogId.set({ image: image });

    if (temperament) {
      await temperament.forEach(async element => {
        if (element) {
          Temperament.findOrCreate({
            where: { name: element }
          });
        }
      });

      await dogId.setTemperaments([]);
      await temperament.forEach(async element => {
        if (element) {
          const temperamentDb = await Temperament.findAll({
            where: { name: element }
          });
          await dogId.addTemperament(temperamentDb);
        }
      });
    }
    await dogId.save()
    return res.status(201).send('Breed updated!')
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const deleteDbDog = async (req, res, next) => {
  const { id } = req.params;
  try {

    const destroyed = await Breed.findByPk(id);
    if (destroyed === null) {
      res.status(404).send("ERROR: id not found ")
    }
    if (destroyed) {
      await destroyed.destroy();

      res.status(200).send('The breed went to the park')
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}

module.exports = { getDogs, getDogID, createDog, updateDbDog, deleteDbDog };