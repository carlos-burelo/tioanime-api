const express = require('express')
api = express.Router();

const { getLastest, getEmision, getGenders, getLetters, getCategories, animeSearch, getAnime, getAnimes, getEpisode, getBy, ovaSearch} = require('./controller');

api.get('/', (req, res) => {
   res.status(200)
      .json({
         message: 'API Working!',
         author: 'Carlos Burelo',
         repository: 'https://github.com/carlos-burelo/tioanime-api',
         endpoints: {
            ultimos: '/ultimos',
            emision: '/emision',
            search: '/buscar/:name',
            getGenders: '/generos',
            getLetters: '/letras',
            getCategories: '/categorias',
            getAnime: '/anime/:id',
            getAnimes: '/animes?page=#',
            getEpisode: '/ver/:id',
            searchByGender: '/gender/:gender?page=#',
            searchByLetter: '/letter/:letter?page=#',
            searchByCategory: '/category/:category?page=#',
            getMultiple: '/category/:category/gender/:gender?page=#',
            searchOva: '/ovas/:page'
         },
         success: true,
      })
})

api.get('/ultimos', (req, res) => {
   getLastest(req, res);
})
api.get('/emision', (req, res) => {
   getEmision(req, res);
})

api.get('/animes/gendersAndLetters', (req, res) => {
   getGendersAndLetters(req, res);
})

api.get('/generos', (req, res) => {
   getGenders(req, res);
})

api.get('/letras', (req, res) => {
   getLetters(req, res);
})

api.get('/categorias', (req, res) => {
   getCategories(req, res);
})

// Search anime by name
api.get('/buscar/:name', (req, res) => {
   animeSearch(req, res);
})

api.get('/anime/:id', (req, res) => {
   getAnime(req, res);
})

api.get('/animes', (req, res) => {
   getAnimes(req, res);
})

api.get('/ver/:id', (req, res) => {
   getEpisode(req, res);
})

api.get('/genero/:gender', (req, res) => {
   getBy(req, res);
})

api.get('/letras/:letter', (req, res) => {
   getBy(req, res);
})

api.get('/category/:category', (req, res) => {
   getBy(req, res);
})

api.get('/category/:category/gender/:gender', (req, res) => {
   getBy(req, res, true)
})

api.get('/ovas/:page', (req, res) => {
   ovaSearch(req, res);
})

module.exports = api