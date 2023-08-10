const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.redirect('/movies')
})

//將根路徑 / redirect 到 /movies ，專案規格中，網站的首頁會直接導向電影清單
app.get('/movies', (req, res) => {
  res.send('listing movies')
})

app.get('/movie/:id', (req, res) => {
  const id = req.params.id
  res.send(`read movie: ${id}`)
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})