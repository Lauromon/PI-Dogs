const { getDogs, getDogID, createDog, updateDbDog, deleteDbDog } = require('../controllers/dogs');
const { Router } = require('express');
const router = Router();

router.get('/', getDogs)
router.put('/:attribute', updateDbDog)
router.get('/:id', getDogID)
router.post('/', createDog)
router.delete('/', deleteDbDog)


module.exports = router;