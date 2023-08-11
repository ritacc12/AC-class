const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const movies = require('./public/jsons/movies.json').results
const BASE_IMG_URL = 'https://movie-list.alphacamp.io/posters/'

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/movies')
})

//將根路徑 / redirect 到 /movies ，專案規格中，網站的首頁會直接導向電影清單
// Object.value，將一個物件傳進去時，Object 能夠將所有屬性都印出來；而 some() 的功能在於做條件判斷，只要任何一個條件有符合就能夠通過
app.get('/movies', (req, res) => {
  const keyword = req.query.search?.trim()
  const matchedMovies = keyword ? movies.filter((mv) =>
    Object.values(mv).some((property) => {
      if (typeof property === 'string') {
        return property.toLowerCase().includes(keyword.toLowerCase())
      }
      return false
    })
  ) : movies
  res.render('index', { movies: matchedMovies, BASE_IMG_URL, keyword })
})

app.get('/movie/:id', (req, res) => {
  const id = req.params.id
  const movie = movies.find((mv) => mv.id.toString() === id)
  res.render('detail',{ movie , BASE_IMG_URL })
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})