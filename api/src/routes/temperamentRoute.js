// const { default: axios } = require('axios');
const { Router } = require('express');
const router = Router();
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Dog, Temperament } = require('../db');

const API_URL = "https://api.thedogapi.com/v1/breeds";


router.get('/', async ( req, res, next) => {
    const allDogs = await axios.get(`${ API_URL}?key=${API_KEY}`, { headers: {
        "accept-encoding": null,
      }});
      let temperaments = []

    try {
        allDogs.data.forEach(e => {
            if (e.temperament) temperaments = [...temperaments, ...e.temperament.split(', ')]
            })
        let arrayTemperaments = temperaments.filter((item,index) => {
            return temperaments.indexOf(item) === index;
        })//aca se sacan los elementos repetidos...        
        arrayTemperaments.forEach(el => {
            Temperament.findOrCreate({
            where: { name: el }
            })
        })
        console.log('temperamentos cargados en la db') 
        const TemperamentsDb = await Temperament.findAll()
        res.send(TemperamentsDb)  
    } catch (error) {
        next(error)
    }
});










module.exports = router;
