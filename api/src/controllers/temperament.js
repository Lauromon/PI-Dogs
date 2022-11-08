const { getDbTemperaments, getApiTemperaments } = require('../services/all.services');
const { Router } = require('express');
const router = Router();


router.get('/temperaments', async(req, res) => {
    const temperaments = await getDbTemperaments();
    if(temperaments.length === 0){
       await getApiTemperaments();
       return await getDbTemperaments();
    }else{
        return temperaments;
    }
});

module.exports = router;