const { Router } = require('express');
const router = Router();
const { Dog, Temperament } = require('../db');
const { getApiInfo, getAllDogs,  } = require('./controllerDog');
const axios = require('axios');

 
router.get('/', async (req,res,next) => {
    try{
        let { name } = req.query;
        let dogsTotal = await getAllDogs();
        console.log(dogsTotal)
        if(name){
            let dogName = await dogsTotal.filter(
                el => el.name.toLowerCase().includes(name.toLowerCase()));
                dogName.length>0 ?
                res.status(200).send(dogName)
                : res.status(400).send("NOT FOUND");
        }else{
            res.status(200).send(dogsTotal);
        }        
    }catch(error){
            res.status(400).send("no papu")
    }
});  

router.get('/:id', async (req, res, next)=> {
    try {
        let { id } = req.params;
        let allDogs = await getAllDogs();
        if(id){
            let idDog = await allDogs.filter(el => el.id == id);
            idDog.length ?
            res.status(200).send(idDog)
            : res.status(404).send('Dog not found')
        }else{
            res.status(404).send('Not found')
        }
    } catch (error) {
        res.status(500).send('There was a server error')
    }
}); 


router.post('/', async ( req, res, next) => {
    try {
        let { id, name, height, image, weight, life, temperament, createdInDb } = req.body;
        let newDog = await Dog.create({
            id, name, height, image, weight, life, createdInDb
        });
        let temperamentDb = await Temperament.findAll({ where: { name: temperament} })
        newDog.addTemperament(temperamentDb);
        res.status(200).send("The dog breed was created correctly")
    } catch (error) {
        res.status(500).send('Server error');
    }
});






module.exports = router;
