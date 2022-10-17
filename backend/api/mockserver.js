const ULID = require('ulid')

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./mock-data.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)



// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.id = ULID.ulid();
        req.body.createdAt = new Date().toJSON();
    }
    // Continue to JSON Server router
    next()
})

// Use default router
server.use(router)
server.listen(10000, () => {
    console.log('JSON Server is running')
})

