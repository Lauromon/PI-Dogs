const { getDogs, getDogID, createDog, updateDbDog, deleteDbDog } = require('../controllers/dogs');
const { Router } = require('express');
const router = Router();

router.get('/', getDogs)
router.put('/:id', updateDbDog)
router.delete('/:id', deleteDbDog)
router.get('/:id', getDogID)
router.post('/', createDog)


module.exports = router;