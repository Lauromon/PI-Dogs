const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRouter = require('../controllers/dogs.js')
const temperamentRouter = require('../controllers/temperament.js');
const { getApiTemperaments } = require('../services/dog.services.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dogsRouter)
router.use('/temperaments', temperamentRouter)
router.get('/', async(req,res)=>{
    await getApiTemperaments()
})
router.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
  })

module.exports = router;
