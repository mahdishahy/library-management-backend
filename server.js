require('dotenv').config();
const http = require('http');
const userController = require('./src/api/v1/controllers/userController.js');
const bookController = require('./src/api/v1/controllers/bookController.js');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/api/v1/users/all') {
        userController.getAll(req, res)
    }
    else if (req.method === 'GET' && req.url.startsWith("/api/v1/users")) {
        userController.getUserById(req, res)
    }
    else if (req.method === 'PUT' && req.url.startsWith('/api/v1/users')) {
        userController.update(req, res)
    }
    else if (req.method === 'DELETE' && req.url.startsWith('/api/v1/users')) {
        userController.remove(req, res)
    }
    else if (req.method === 'POST' && req.url === '/api/v1/register') {
        userController.store(req, res)
    }
    else if (req.method === 'POST' && req.url === '/api/v1/login') {
        userController.login(req, res)
    }
    else if (req.method === 'POST' && req.url === '/api/v1/logout') {
        userController.logout(req, res)
    }
    else if (req.method === 'GET' && req.url === '/api/v1/books/all') {
        bookController.getAll(req, res)
    }
    else if (req.method === 'GET' && req.url.startsWith("/api/v1/books")) {
        bookController.getBookById(req, res)
    }
    else if (req.method === 'DELETE' && req.url.startsWith('/api/v1/books')) {
        bookController.remove(req, res)
    }
    else if (req.method === 'PUT' && req.url.startsWith('/api/v1/books')) {
        bookController.update(req, res)
    }
    else if (req.method === 'POST' && req.url === '/api/v1/books') {
        bookController.store(req, res)
    }
})

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})