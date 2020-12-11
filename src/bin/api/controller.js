const cheerio = require('cheerio'), axios = require('axios');

const { apiConfig } = require('../config');


//=======================================================//
// Obtiene los ultimos capitulos agregados
//=======================================================//
async function getLastest(req, res) {
   try {
      const bodyResponse = await axios.get(`${apiConfig.baseUrl}`);
      const $ = cheerio.load(bodyResponse.data);
      const animes = [];

      let getLastest = $('#tioanime > div > section:nth-child(2) > ul')[0];
      
      $(getLastest).find('li > .episode').each((i, e) => {
         let el = $(e);
         let title = el.find('.title').html().split('\t')[0]
         // console.log('_NAME_: ',title)
         let base_img = el.find('div > figure > img').attr('src');
         let img = `${apiConfig.baseUrl}${base_img}`
         // console.log('_IMG_: ',img)
         let older_id = el.find('article > a').attr('href');
         let id = older_id.replace('/ver/', '');
         // console.log('_ID_: ',id)         
         // Definiendo tipos de datos
            let anime = {
               title,
               img,
               id,
            }
            animes.push(anime);
            nlastest = animes.length
      })
      // Modelando Array
      res.status(200)
         .json({
            animes,
            success: true,
            objects: nlastest
         })

   } catch (err) {
      res.status(500)
         .json({
            message: err.message,
            success: false
         })
   }
}
//=======================================================//
// Obtiene los ultimos animes agregados
//=======================================================//
async function getEmision(req, res) {
   try {
      const bodyResponse = await axios.get(`${apiConfig.baseUrl}`);
      const $ = cheerio.load(bodyResponse.data);
      const animes = [];

      let getEmision = $('#tioanime > div > section:nth-child(3) > ul')[0];
      
      $(getEmision).find('li > .anime').each((i, e) => {
         let el = $(e);
         let title = el.find('.title').html().split('\t')[0]
         console.log('_NAME_: ',title)
         let base_img = el.find('div > figure > img').attr('src');
         let img = `${apiConfig.baseUrl}${base_img}`
         console.log('_IMG_: ',img)
         let older_id = el.find('article > a').attr('href');
         let id = older_id.replace('/anime/', '');
         console.log('_ID_: ',id)         
         // Definiendo tipos de datos
         let anime = {
            title,
            img,
            id,
         }

         animes.push(anime);
         nlastest = animes.length
      })
      // Modelando Array
      res.status(200)
         .json({
            animes,
            success: true,
            objects: nlastest
         })

   } catch (err) {
      res.status(500)
         .json({
            message: err.message,
            success: false
         })
   }
}
//=======================================================//
// Obtiene los generos disponibles en la pagina
//=======================================================//
async function getGenders(req, res) {
   try {
      const bodyResponse = await axios.get(`${apiConfig.baseUrl}/animes`);
      const $ = cheerio.load(bodyResponse.data);

      const genders = []

      let gendersContainer = $('.filter-container .clearfix .float-left')[1];

      $(gendersContainer).find('.dropdown-menu .dropdown-item')
         .each((i, e) => {
            let el = $(e)

            let title = el.text();
            if (title.charAt() == ' ') {
               title = title.substring(1, title.length)
            }
            let id = el.attr('href');
            id = id.split('/')[2];
            let gender = {
               title,
               id
            }
            genders.push(gender)
         })

      res.status(200)
         .json({
            genders,
            success: true
         })

   } catch (err) {
      res.status(500)
         .json({
            message: err.message,
            success: false
         })
   }
}
//=======================================================//
// Obtiene las letras disponibles de los animes
//=======================================================//
async function getLetters(req, res) {
   try {
      const bodyResponse = await axios.get(`${apiConfig.baseUrl}/animes`);
      const $ = cheerio.load(bodyResponse.data);

      const letters = []

      let lettersContainer = $('.filter-container .clearfix .float-left')[3];
      $(lettersContainer).find('.dropdown-menu .dropdown-item')
         .each((i, e) => {
            let el = $(e)

            let title = el.text();
            // if (title.charAt() == ' ') {
            //    title = title.substring(1, title.length)
            // }
            let id = el.attr('href');
            id = id.split('/')[2];
            let letter = {
               title,
               id
            }
            letters.push(letter)
         })

      res.status(200)
         .json({
            letters,
            success: true
         })

   } catch (err) {
      res.status(500)
         .json({
            message: err.message,
            success: false
         })
   }
}
//=======================================================//
// Obtiene las categorias en l pagina
//=======================================================//
async function getCategories(req, res) {
   try {
      const bodyResponse = await axios.get(`${apiConfig.baseUrl}/animes`);
      const $ = cheerio.load(bodyResponse.data);

      const categories = []

      let categoriesContainer = $('.filter-container .clearfix .float-left')[0];
      $(categoriesContainer).find('.dropdown-menu .dropdown-item')
         .each((i, e) => {
            let el = $(e)

            let title = el.text();

            let id = el.attr('href');
            id = id.split('/')[2];
            let category = {
               title,
               id
            }
            categories.push(category)
         })

      res.status(200)
         .json({
            categories,
            success: true
         })
   } catch (err) {
      res.status(500)
         .json({
            message: err.message,
            success: false
         })
   }
}
//=======================================================//
// Hace una busqueda utilizando un input como id
//=======================================================//
async function animeSearch(req, res) {
   try {
      let {
         name
      } = req.params;

      const bodyResponse = await axios.get(`${apiConfig.searchAnime}${name}`);
      const $ = cheerio.load(bodyResponse.data);

      const animes = [];

      $('.animes .row article').each((i, e) => {
         let el = $(e);
         let title = el.find('h3.Title').text(),
            img = el.find('div.Image .cover .img-fluid').attr('src'),
            id = el.find('a.link-anime').attr('href');
         id = id.split('/')[4];

         let anime = {
            title,
            id,
            img
         }

         animes.push(anime);
      })

      res.status(200)
         .json({
            animes,
            success: true
         })

   } catch (err) {
      res.status(500)
         .json({
            message: err.message,
            success: false
         })
   }
}

async function getAnime(req, res) {
   try {
      let {
         id
      } = req.params;

      const bodyResponse = await axios.get(`${apiConfig.viewAnime}/${id}`);
      const $ = cheerio.load(bodyResponse.data);
      let anime = new Object();
      let genders = []
      let episodes = []
      $('#tioanime > article > div > div').each((i, e) => {
         let el = $(e);
         el.find('aside:nth-child(2) > p > span').each((i, e) => {
            let el = $(e);
            let older_title = el.text();
            let title = older_title.replace('\n', '');
            let id = el.find('span > a').attr('href');
            let gender = {
               title,
               id
            }

            genders.push(gender)
         })

         let title = el.find('aside > h1').text();
         let description = el.find('aside > p.sinopsis').text();
         let status = el.find('a:nth-child(2)').text();
         let older_img = el.find('figure img').attr('src');
         let img = `${apiConfig.baseUrl}${older_img}`

         anime = {
            title,
            description,
            status,
            genders,
            img,
            id
         }
      })
      let caps = $('#tioanime > div > div > aside:nth-child(2) > section:nth-child(2) > ul')[0];
      let capsArr = [];
      capsArr = caps;
      console.log ('###################################################',capsArr)
      $(caps).find('li a').each((i, e) => {
         console.log ('###################################################',e)
         let el = $(e);
         let title = el.find('.title').html().split('\t')[0]
         // console.log('_NAME_: ',title)
         let base_img = el.find('div > figure > img').attr('src');
         let img = `${apiConfig.baseUrl}${base_img}`
         // console.log('_IMG_: ',img)
         let older_id = el.find('article > a').attr('href');
         let id = older_id.replace('/ver/', '');
         // console.log('_ID_: ',id)         
         // Definiendo tipos de datos
            let anime = {
               title,
               img,
               id,
            }
            animes.push(anime);
            nlastest = animes.length
      })

      if (!anime.episodes) {
         anime.episodes = []
      }

      res.status(200)
         .json({
            anime,
            success: true,
            type: 'anime'
         })

   } catch (err) {
      res.status(500)
         .json({
            message: err.message,
            success: false
         })
   }
}
async function getEpisode(req, res) {
   try {
      let {
         id
      } = req.params;

      const bodyResponse = await axios.get(`${apiConfig.viewEpisode}/${id}`);
      const $ = cheerio.load(bodyResponse.data);
      let anime = new Object();
      let downloads = []
      let videos = []
      $('body').each((i, e) => {
         let el = $(e);
         el.find('#downloads > div > div > div > div > table > tbody > tr').each((i, e) => {
            let el = $(e);
            let title = el.text();
            let id = el.find('td > a').attr('href');
            let download = {
               title,
               id
            }
            downloads.push(download)
         })
         $('#tioanime > div > div > aside:nth-child(2) > .nav > ul > li').each((i, e) => {
            let el = $(e);
            let title = el.find('a > span');
            let episode = {
               title,
            }
            videos.push(episode)
         })
         // General
         let title = el.find('#tioanime > .container > div > .principal > .anime-title').text();

         anime = {
            title,
            id,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
            downloads,
            videos
         }
      })
      res.status(200)
         .json({
            anime,
            success: true,
            type: 'anime'
         })

   } catch (err) {
      res.status(500)
         .json({
            message: err.message,
            success: false
         })
   }
}
//=======================================================//
// Obtiene los animes en una vista general
//=======================================================//
async function getAnimes(req, res) {
   try {
      let {
         page
      } = req.query;

      if (!page) {
         page = 1
      }

      const bodyResponse = await axios.get(`${apiConfig.baseUrl}/animes?page=${page}`);
      const $ = cheerio.load(bodyResponse.data);

      const animes = [];

      $('.animes .container .row article').each((i, e) => {
         let el = $(e);

         let id = el.find('a').attr('href');
         id = id.split('/')[4]
         let title = el.find('.Title').text();
         let img = el.find('.Image img').attr('src');
         let category = el.find('.category').text();
         category = category.substring(1, category.length)
         let year = parseInt(el.find('.fecha').text());

         const anime = {
            id,
            title,
            img,
            category,
            year
         }

         animes.push(anime);
      })

      let totalPages = $('.pagination').children().length;
      totalPages = $('.pagination').find('.page-item')[totalPages - 2];
      let pages = parseInt($(totalPages).text());

      res.status(200)
         .json({
            animes,
            pages,
            success: true
         })

   } catch (err) {
      res.status(500)
         .json({
            message: err.message,
            success: false
         })
   }
}
//=======================================================//
// Obtiene un solo episodio basandose en su id
//=======================================================//
async function getEpisode2(req, res) {
   try {
      let {
         id
      } = req.params;

      const bodyResponse = await axios.get(`${apiConfig.viewEpisode}/${id}`);
      // console.log(bodyResponse)
      const $ = cheerio.load(bodyResponse.data);

      // Get video link OP1
      let title = $('#tioanime > .container > div > .principal > h1').text();
      let animeId = title.toLocaleLowerCase();

      // if (animeId.includes('episodio')) {
      //    animeId = animeId.splice(0, animeId.length - 2).join('-');
      // } else {
      //    animeId = animeId.splice(0, animeId.length - 1)
      // }
      // const spaces = / /gi;
      animeId = animeId.replace(/\s/g, '-')
      // let title = older_title.replace('\n', '');
      let epNumber = title.split(' ');
      epNumber = parseInt(epNumber[epNumber.length - 3]);

      const videos = [];
      let videosContainer = $('#tioanime > .container > .episode-single > .principal > .options > .nav-pills')[0];
      // let getLastest = $('#tioanime > div > section:nth-child(2) > ul')[0];
      // console.log(videosContainer)

      $(videosContainer).find('li').each((i, e) => {
         let el = $(e);
         console.log($(e));
         // console.log(e)

         let video = el
         // attr('src');
         console.log(video)

         if (video) {
            video = video.split('url=')[1]
            video = decodeURIComponent(video)
            video = video.split('&id')[0]
         }


         if (video) {
            videos.push(video)
         }

      })

      // res.send(videos)
      /* Old
         video1 = video1.split('=')[1];
         video1 = video1.split('&')[0];
         // DecodeURIComponent to set right link format
         video1 = decodeURIComponent(video1);

         // Get JW-Player DOM
         const videoRes1 = await axios.get(video1);
         let $v1 = cheerio.load(videoRes1.data);
         // Destructuring JW-Player DOM by String methods to get the source link
         let vidString1 = $v1.html().toString();
         let strStartV1 = vidString1.search('sources'),
            strEndV1 = vidString1.search(']');
         let sources1 = vidString1.substring(strStartV1, strEndV1 + 1);

         let vidSource1 = sources1.split("'")[1]
      */

      let downloads = [];
      let downloadsContainer = $('.Episode .content .row #downloads table tbody tr');

      $(downloadsContainer).each((i, e) => {
         let el = $(e);

         let download = el.find('a').attr('href')

         if (download) {
            downloads.push(download);
         }
      })

      res.status(200)
         .json({
            title,
            animeId,
            epNumber,
            videos,
            downloads,
            success: true
         })

   } catch (err) {
      res.status(500)
         .json({
            message: err.message,
            success: false
         })
   }
}
//=======================================================//
// Obtiene una lista filtrada de elementos
//=======================================================//
async function getBy(req, res, multiple) {
   try {
      let {
         gender,
         letter,
         category
      } = req.params;

      let {
         page
      } = req.query;

      if (!page) {
         page = 1
      }

      let bodyResponse;

      if (multiple) {
         bodyResponse = await axios.get(`${apiConfig.baseUrl}/categoria/${category}/genero/${gender}?page=${page}`);
      } else if (gender && !multiple) {
         bodyResponse = await axios.get(`${apiConfig.baseUrl}/genero/${gender}?page=${page}`);
      } else if (letter && !multiple) {
         bodyResponse = await axios.get(`${apiConfig.baseUrl}/letra/${letter}?page=${page}`);
      } else if (category && !multiple) {
         bodyResponse = await axios.get(`${apiConfig.baseUrl}/categoria/${category}?page=${page}`);
      }
      const $ = cheerio.load(bodyResponse.data);

      const animes = [];

      $('.animes .container .row article').each((i, e) => {
         let el = $(e);
         let id = el.find('.link-anime').attr('href');
         id = id.split('/')[4];
         let img = el.find('.link-anime .Image img').attr('src');
         let title = el.find('.link-anime .Title').text();
         let type = el.find('.link-anime .info .category').text();
         let year = el.find('.link-anime .info .fecha').text();

         let anime = {
            id,
            img,
            title,
            type,
            year
         }

         animes.push(anime);

      })

      let totalPages = $('.pagination').children().length;
      totalPages = $('.pagination').find('.page-item')[totalPages - 2];
      let pages = parseInt($(totalPages).text());

      res.status(200)
         .json({
            animes,
            pages,
            success: true
         })

   } catch (err) {
      res.status(500)
         .json({
            message: err.message,
            success: false
         })
   }
}
//=======================================================//
// Hace unaa consulta de los Ovas
//=======================================================//
async function ovaSearch(req, res) {
   try {
      let {
         page
      } = req.params;

      const bodyResponse = await axios.get(`${apiConfig.searchOva}?page=${page}`);
      const $ = cheerio.load(bodyResponse.data);

      const ovas = [];

      $('.animes .container .row article').each((i, e) => {
         let el = $(e);
         let id = el.find('.link-anime').attr('href');
         id = id.split('/')[4];
         let img = el.find('.link-anime .Image img').attr('src');
         let title = el.find('.link-anime .Title').text();


         let ova = {
            id,
            img,
            title
         }

         ovas.push(ova);

      })

      let totalPages = $('.pagination').find('.page-item')[7];
      totalPages = parseInt($(totalPages).text())

      res.status(200)
         .json({
            ovas,
            pages: totalPages,
            success: true
         })

   } catch (err) {
      res.status(500)
         .json({
            message: err.message,
            success: false
         })
   }
}

   // async function getAnime(req, res) {
   //    try {
   //       let {
   //          id
   //       } = req.params;
   //       const bodyResponse = await axios.get(`${apiConfig.viewAnime}/${id}`);
   //       const $ = cheerio.load(bodyResponse.data);
   //       // console.log(bodyResponse.data)
   //       let caps = $('#tioanime > .container > .row > .principal > section > ul')[0];
   //       let anime = new Object();
   //       let genders = []
   //       let episodes = []
   //       $('#tioanime > article > div > div').each((i, e) => {
   //          let el = $(e);
   //          // console.log(el)
   //          el.find('aside:nth-child(2) > p > span').each((i, e) => {
   //             let el = $(e);
   //             let older_title = el.text();
   //             let title = older_title.replace('\n', '');
   //             let id = el.find('span > a').attr('href');
   //             let gender = {
   //                title,
   //                id
   //             }
   //             genders.push(gender)
   //          })
   //          let title = el.find('aside > h1').text();
   //          let description = el.find('aside > p.sinopsis').text();
   //          let status = el.find('a:nth-child(2)').text();
   //          let older_img = el.find('figure img').attr('src');
   //          let img = `${apiConfig.baseUrl}${older_img}`
   //          anime = {
   //             title,
   //             description,
   //             status,
   //             genders,
   //             img,
   //             id
   //          }
   //       })
   //       $('#tioanime > .container > .row > .principal > section > ul').each((i, e) => {
   //          // console.log('######################################################################## ELEMENTO {E}',e)
   //          let el = $(e);
   //          // console.log('######################################################################## ELEMENTO {$EL}',el)
   //          console.log('######################################################################## ELEMENTO {$CHILDREN}',el.children.length )
   //          let totalEpisodes = el.children().length;
   //          console.log(totalEpisodes)
   //          $('#tioanime > .container > .row > .principal > section > ul > li').each((i, e) => {
   //             let el = $(e);
   //             let episodeId = el.attr('a');
   //             episodeId = episodeId.split('/')[4]
   //             let episode = {
   //                episode: totalEpisodes,
   //                id: episodeId
   //             }
   //             episodes[i] = episode;
   //             anime.episodes = episodes
   //             totalEpisodes--
   //          })
   //       })
   //       if (!anime.episodes) {
   //          anime.episodes = []
   //       }
   //       res.status(200)
   //          .json({
   //             anime,
   //             success: true,
   //             type: 'anime'
   //          })
   //    } catch (err) {
   //       res.status(500)
   //          .json({
   //             message: err.message,
   //             success: false
   //          })
   //    }
   // }


module.exports = {
   getLastest,
   getEmision,
   getGenders,
   getLetters,
   getCategories,
   animeSearch,
   getAnime,
   getAnimes,
   getEpisode,
   getBy,
   ovaSearch
}