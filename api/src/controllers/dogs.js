//Importo mis funciones desde services
const { getAllDogs, getDbDogs, /* getAddTemperaments */ } = require('../services/dog.services');
const { Breed, Temperament } = require('../db');

const getDogs = async (req, res, next) => {
    const { name } = req.query;
    try {
        const dogs = await getAllDogs();
        if (!name) {
            const allDogs = dogs.map((e) => {
                return {
                    image: e.image,
                    name: e.name,
                    temperament: e.temperment,
                    weight: e.weight
                }
            });
            return res.status(200).json(allDogs);
        } else {
            const dogNamed = dogs.reduce((dog, e) => {
                if (e.name.toLowerCase().includes(name.toLowerCase())) {
                    dog.push({
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
        dogId.length
            ? res.status(200).json(dogId)
            : res.status(400).send("No se encontro el perro")
    } catch (error) {
        next(error.message);
    }
};

const createDog = async (req, res, next) => {
    const { name, temperament, weight, height, image, life_span } = req.body;
    try {
        const newDog = await Breed.create({
            //id,
            name,
            weight,
            height,
            image,
            life_span
        })
        await temperament.forEach(async element => {
            if (element) {
                Temperament.findOrCreate({
                    where: { name: element.name }
                });
            }
        });
        await temperament.forEach(async element => {
            if (element) {
                const temperamentDb = await Temperament.findAll({
                    where: { name: element.name }
                });
                await newDog.addTemperament(temperamentDb);
            }
        });
        return res.status(200).send('Perrito creado')
    } catch (error) {
        next(error.message)
    }
};

const updateDbDog = async (req, res, next) => {
    const { attribute } = req.params;
    const { value, id } = req.query;
    try {
        if (!id || !value || !attribute) {
            return res.status(400).send('Necesito el id para cambiarlo')
        } else {
            await Breed.update({
                [attribute]: value
            }, {
                where: { id: id }
            }
            );
            return res.status(200).send('Perro actualizado')
        }
    } catch (error) {
        next(error.message)
    }
}

const deleteDbDog = async (req, res, next) => {
    const { id, name } = req.body;
    try {
        if (!id || !name) {
            return res.status(400).send('Faltan parametros necesarios')
        }
        const destroyed = await Breed.findByPk(id);
        if (destroyed === null) {
            return res.status(400).send('El id no pertenece a un perrito de bien')
        }
        if (destroyed) {
            await Breed.destroy(
                {
                    where: { id: id }
                });
            return res.status(200).send('El perrito fue a la perrera :(')
        }
    } catch (error) {
        next(error.message)
    }
}

module.exports = { getDogs, getDogID, createDog, updateDbDog, deleteDbDog };