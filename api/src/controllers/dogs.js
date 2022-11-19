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
            return res.status(200).json(dogNamed);
        };
    } catch (error) {
        next(error.message);
    }
};


const getDogID = async (req, res, next) => {
    const { id } = req.params;
    try {
        const dogsTotal = await getAllDogs();
        const dogId = dogsTotal.filter((el) => el.id.toString() == id.toString());
        const dogObj = dogId[0]
        Object.keys(dogObj).length
            ? res.status(200).json(dogObj)
            : res.status(400).send("ERROR: Breed, not found :(")
    } catch (error) {
        next(error.message);
    }
};

const createDog = async (req, res, next) => {
    const { name, temperament, weight, height, life_span } = req.body;
    var { image } = req.body;
    try {
        if(!image){
            image = await getRandomImg();
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
        return res.status(200).send('Breed created!')
    } catch (error) {
        next(error.message)
    }
};

const updateDbDog = async (req, res, next) => {
    const { id } = req.params;
    const { name, temperament, weight, height, image, life_span } = req.body;
    try {
        const dogId = await Breed.findByPk(id)
        if (!dogId) return res.status(400).send("ERROR: That id doesn't exists.");
        const repeatedName = await Breed.findAll({ where: { name: name } });
        if (repeatedName.length) return res.status(400).send("ERROR: Breed already exists.");

        name && dogId.set({ name: name });
        weight && dogId.set({ weight: weight });
        height && dogId.set({ height: height });
        life_span && dogId.set({ life_span: life_span });
        image && dogId.set({ image: image });
       
        if (temperament.length) {
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
        return res.status(200).send('Breed updated!')
    } catch (error) {
        next(error.message)
    }
}

const deleteDbDog = async (req, res, next) => {
    const { id } = req.params;
    try {
      
        const destroyed = await Breed.findByPk(id);
        if (destroyed === null) {
            res.status(400).send('ERROR: That id is not a good boy')
        }
        if (destroyed) {
            await destroyed.destroy();
                
            res.status(200).send("The breed went to the park")
        }
    } catch (error) {
        next(error.message)
    }
}

module.exports = { getDogs, getDogID, createDog, updateDbDog, deleteDbDog };