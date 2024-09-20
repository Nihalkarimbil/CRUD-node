const http = require('http');
const Todo = require('./controll')
const { getReqData } = require('./util')



const server = http.createServer(async (req, res) => {
    console.log (`Incoming request: ${req.method} ${req.url}`);
    //GET
    if (req.url === '/api/todos' && req.method === 'GET') {
        const todos = await new Todo().getTodos();
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(todos));
    }
    //GET -/api/todos/:id
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'GET') {
        try {
            const id = req.url.split('/')[3];
            const todo = await new Todo().getTodo(id)
            res.writeHead(200, { 'Content-type': 'application/json' })
            res.end(JSON.stringify(todo))
        } catch (error) {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ message: "Todo not found" }));
        }

    }
    //DELETE -/api/todos/:id
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'DELETE') {
        try {
            const id = req.url.split('/')[3];
            const message = await new Todo().deletetodo(id)
            res.writeHead(200, { 'Content-type': 'application/json' })
            res.end(JSON.stringify(message))
        } catch (error) {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ message: "Todo not found" }));
        }

    }
    //PATCH -/api/todos/:id
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === 'PATCH') {
        try {
            const id = req.url.split('/')[3];
            const updated = await new Todo().updatetodo(id)
            res.writeHead(200, { 'Content-type': 'application/json' })
            res.end(JSON.stringify(updated))
        } catch (error) {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ message: "Todo not found" }));
        }

    }
    //P0ST -/api/todos/:id
    if (req.url === '/api/todos' && req.method === 'POST') {
        try {
            const tododata = await getReqData(req);  // get the body of the request
            let todo = await new Todo().createTodo(JSON.parse(tododata));  // parse and create a new todo
            res.writeHead(201, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(todo));
        } catch (error) {
            res.writeHead(400, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ message: "Todo creation failed", error: error.message }));
        }
    }
    
    else {
        res.writeHead(404, { 'Content-type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route not found' }))
    }
})

server.listen(4000, () => console.log(`server running ${4000}`))