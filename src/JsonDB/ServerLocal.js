const axios = require('axios')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('webStore.json')
const middlewares = jsonServer.defaults()
var http = require('http')
var io = require('socket.io')
var serverIO = http.createServer(server)

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

io = io(serverIO)
io.on('connection', client => {
  console.log('user connected')
  // เมื่อ Client ตัดการเชื่อมต่อ
  client.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  var path = req.path.split('/')
  if (req.method === 'POST') {
    req.body._id = Date.now()
    req.body.id = Date.now()
    io.emit('update-' + path[1], 'new')
  } else if (req.method === 'PUT') {
    req.body._id = path[2]
    io.emit('update-' + path[1], 'update')
  } else if (req.method === 'DELETE') {
    io.emit('update-' + path[1], 'delete')
  }
  // Continue to JSON Server router
  next()
})

server.use(
  jsonServer.rewriter({
    '/widget/board/:id': '/widget/?boardId=:id',
  })
)

// Use default router
server.use(router)
serverIO.listen(5000, () => {
  console.log('JSON Server is running')
})
