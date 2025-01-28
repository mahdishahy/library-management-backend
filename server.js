require('dotenv').config();
const http = require('http');
const userController = require('./src/api/v1/controllers/userController');

const server = http.createServer((request, response) => {
    if(request.method === 'GET' && request.url === '/api/v1/users/all'){
        userController.getAll(request, response)
    }
})

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})