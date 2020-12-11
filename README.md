<img src="https://scontent.fmtt1-1.fna.fbcdn.net/v/t1.0-9/p960x960/128110242_2256485474485154_6912486553337040857_o.png?_nc_cat=1&ccb=2&_nc_sid=85a577&_nc_ohc=uCi4SAm1K8gAX-KoNI_&_nc_ht=scontent.fmtt1-1.fna&_nc_tp=30&oh=af9a729e80fc47d1a0625fea443d290a&oe=5FF90510" width="150px" align="right"/>
# Tioanime-REST-API
**API** construida pra extraer informacion de la plataforma [tioanime.com](tioanime.com)

## **Usage**
> **Instalacion** 
```git
   git clone https://github.com/carlos-burelo/tioanime-api

   npm install
```

> **Ejecutar con NODE**: 
```js
$ npm run start
```

> **Ejecutar con NODEMON**: 
```js
 npm run dev
```

****





## **Modo de pruebas**

> **BASE_URL:**
```git
 http://localhost:3000/api/v1
```

#

>Method: **GET** \
> Ruta: **/ultimos**

```json
// retorna los ultimos capitulos publicados
{
   "animes": [
      {
         "title": "Adachi to Shimamura 10",
         "img": "https://tioanime.com/uploads/thumbs/3400.jpg",
         "id": "adachi-to-shimamura-10"
      },
      {
         "title": "Higurashi no Naku Koro ni (2020) 11",
         "img": "https://tioanime.com/uploads/thumbs/3370.jpg",
         "id": "higurashi-no-naku-koro-ni-2020-11"
      },
      // ... Maximo 20 capitulos
   ],
   "success": true
}
```
>Method: **GET** \
> Ruta: **/emision**

```json
// retorna los animes en emision agregados
{
   "animes": [
      {
         "title": "Shingeki no Kyojin: The Final Season",
         "img": "https://tioanime.com/uploads/portadas/3414.jpg",
         "id": "shingeki-no-kyojin-the-final-season"
      },
      {
         "title": "Tsukiuta. The Animation 2",
         "img": "https://tioanime.com/uploads/portadas/3413.jpg",
         "id": "tsukiuta-the-animation-2"
      },
       // ... Maximo 12 animes
   ],
   "success": true
}
```
#

>Method: **GET** \
> Ruta: **/categorias**

```js
// return retorna los tipos de animes existentes
   "categories": [
      {
         "title": "Todo"
      },
      {
         "title": "Anime",
         "id": "anime"
      },
      {
         "title": "Ova",
         "id": "ova"
      },
      // ...
   ]
   "success": true
```
#
>Method: **GET** \
> Ruta: **/anime/:id**

```js
// return a single anime information
{
   "anime": {
      "title": "Shingeki no Kyojin: The Final Season",
      "description": "\nÚltima temporada de Shingeki no Kyojin. ",
      "status": "En emision",
      "genders": [
         {
            "title": "Acción\n",
            "id": "/directorio?genero=accion"
         },
         {
            "title": "Drama\n",
            "id": "/directorio?genero=drama"
         },
         {
            "title": "Fantasía\n",
            "id": "/directorio?genero=fantasia"
         },
         {
            "title": "Mecha\n",
            "id": "/directorio?genero=mecha"
         },
         {
            "title": "Militar\n",
            "id": "/directorio?genero=militar"
         },
         {
            "title": "Misterio\n",
            "id": "/directorio?genero=misterio"
         },
         {
            "title": "Shounen\n",
            "id": "/directorio?genero=shounen"
         },
         {
            "title": "Superpoderes\n",
            "id": "/directorio?genero=superpoderes"
         }
      ],
   "img": "https://tioanime.com/uploads/portadas/3414.jpg",
   "id": "shingeki-no-kyojin-the-final-season",
   "episodes": []// Aun en desarrollo
   },
   "success": true,
   "type": "Anime"
}
```
#
>Method: **GET** \
> Ruta: **/ver/:id**

```json
// retorna la informacion correspondiente a aun solo anime en base a su :id
{
   "anime": {
      "title": "Dororo 24",
      "id": "dororo-24",
      "downloads": [
         {
         "title": "\n0\nMediafire\nSubtitulado\n\nDescargar\n\n",
         "id": "https://www.mediafire.com/?3a22872v9zw3eer"
         },
         {
         "title": "\n1\nZippyshare\nSubtitulado\n\nDescargar\n\n",
         "id": "https://www51.zippyshare.com/v/McJQKu15/file.html"
         },
         {
         "title": "\n2\nMega\nSubtitulado\n\nDescargar\n\n",
         "id": "https://mega.nz/#!33YQWYQB!mdpC8CfDYfiL4EraPNAhpTwr1U58OFK5NTEWeOA3urM"
         }
      ],
      "videos": [] // Aun en desarrollo 
      },
   "success": true,
   "type": "anime"
}
```