//Importo mis funciones desde services
const { getAllDogs, } = require('../services/all.services');
const { Breed, Temperament} = require('../db')
const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
    const { name } = req.query;
    const dogs = await getAllDogs();
    if (!name) {
        dogs = dogs.map((e) => {
            return {
                image: e.image,
                name: e.name,
                temperament: e.temperment,
                weight: e.weight
            }
        });
        return res.status(200).json(dogs);
    } else {
        const dogNamed = dogs.reduce((dog, e) => {
            if (e.name.toLowerCase().includes(name.toLowerCase())) {
                dog.push({
                    image: e.image,
                    name: e.name,
                    temperament: e.temperment,
                    weight: e.weight
                })
            }
            return dog;
        }, []);
        return res.status(200).json(dogNamed);
    };
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const dogs = await getAllDogs();
    dogs = dogs.find((e) => { e.id === id });
    res.status(200).json(dogs);
});

router.post('/', async (req, res)=>{
    const {
        id,
        name,
        temperament,
        weight,
        height,
        image,
        life_span
    } = req.body;
    const temperamentDb = await Temperament.findAll({
        where: { name: temperament },
      });
    Breed.create({
        id,
        name,
        weight,
        height,
        image,
        life_span
    }).addTemperament(temperamentDb);
    res.status(200).send('Creado correctamente')
});

module.exports = router;