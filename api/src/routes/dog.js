const {getDogs,getDogID,createDog} = require('../controllers/dogs');
const { Router } = require('express');
const router = Router();

router.get('/', getDogs)
router.get('/:id', getDogID)
router.post('/', createDog)

module.exports = router;