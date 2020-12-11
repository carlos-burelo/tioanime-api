// Production mode
// const appConfig = {
//    host: process.env.HOST,
//    port: process.env.PORT
// }

const appConfig = {
   host: 'localhost',
   port: '3000'
}
const apiConfig = {
   baseUrl: 'https://tioanime.com',
   searchAnime: 'https://tioanime.com/directorio?q=',
   searchDirectory: 'https://tioanime.com/directorio',
   viewAnime: 'https://tioanime.com/anime',
   viewEpisode: 'https://tioanime.com/ver',
   searchGender: 'https://tioanime.com/genero',
   searchLetter: 'https://tioanime.com/letra',
   searchOva: 'https://tioanime.com/categoria/ova',
   searchMovie: 'https://tioanime.com/directorio?type%5B%5D=1'
}

module.exports = {
   appConfig,
   apiConfig
}