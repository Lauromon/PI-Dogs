const {getTemperaments} = require('../controllers/temperament');
const { Router } = require('express');
const router = Router();

router.get('/', getTemperaments)

module.exports = router;