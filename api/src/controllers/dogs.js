//Importo mis funciones desde services
const { getApiDog, getDbDogs, getAllDogs, getDbTemperaments, getApiTemperaments } = require('../services/all.services');
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
                dogNamed.push({
                    image: e.image,
                    name: e.name,
                    temperament: e.temperment,
                    weight: e.weight
                })
            }
            return dogNamed;
        }, []);
        return res.status(200).json(dogNamed);
    };
});

router.get('/temperaments', async(req, res) => {
    const temperaments = await getDbTemperaments()
    if(temperaments.length === 0){
       await getApiTemperaments()
       return await getDbTemperaments()
    }else{
        return temperaments;
    }
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
    
});