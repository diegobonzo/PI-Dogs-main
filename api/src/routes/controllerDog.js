const { Router } = require('express');
const router = Router();
require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const { Dog, Temperament } = require('../db');

const API_URL = "https://api.thedogapi.com/v1/breeds";


const getApiInfo = async () => {
    const apiUrl = await axios.get(`${API_URL}?key=${API_KEY}`, { headers: {
        "accept-encoding": null,
      }})    
    const apiInfo = await apiUrl.data.map(el => {
        return {
            id: el.id,
            name: el.name,
            height: el.height.metric,
            image: el.image.url,
            weight: el.weight.metric,
            life: el.life_span,
            temperament: el.temperament,
        }
    })        
    return apiInfo;
};



const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
};



const getAllDogs = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allInfo =  apiInfo.concat(dbInfo); 
    console.log(allInfo);
    return allInfo;
};



module.exports = {
    getApiInfo,
    getDbInfo,
    getAllDogs
}