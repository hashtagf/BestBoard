const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
var http = require('http')
var io = require('socket.io')
var server = http.createServer(app)
const jsonfile = require('jsonfile')
const board = 'src/JsonDB/board.json'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }
  next()
})
io = io(server)

// board
app.get('/board', (req, res, next) => {
  jsonfile.readFile(board, function (err, payload) {
    if (err) console.error(err)
    res.json(payload)
    res.status(200)
  })
})

app.post('/board', (req, res, next) => {
  jsonfile.readFile(board, function (err, payload) {
    var data = []
    data = payload
    req.body._id = '0001'
    console.log(payload)
    // data.push(req.body)
    jsonfile.writeFile(board, data, {spaces: 2}, function (err) {
      if (err) console.error(err)
      io.emit('update-board', 'new')
      res.status(201)
    })
  })
})

// app.get('/:boardId', (req, res, next) => {
//   board.findById(req.params.boardId, function (err, payload) {
//     if (err) return next(err)
//     res.json(payload)
//     res.status(200)
//   })
// })

// app.put('/:boardId', (req, res, next) => {
//   board.findByIdAndUpdate(req.params.boardId, req.body, function (err, payload) {
//     if (err) return next(err)
//     req.io.emit('update-board', 'update')
//     res.json(payload)
//     res.status(200)
//   })
// })
 
// app.delete('/:boardId', (req, res, next) => {
//   board.findByIdAndRemove({ _id: req.params.boardId }, function (err, payload) {
//     if (err) return next(err)
//     req.io.emit('update-board', 'delete')
//     res.json(payload)
//     res.status(200)
//   })
// })

app.listen(port, () => console.log(`Listening on port ${port}`));