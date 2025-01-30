const url = require('url');
const UserModel = require('./../models/User.js');

const getAll = async (req, res) => {
    const users = await UserModel.find()
    res.writeHead(200, { 'content-type': 'application/json' })
    res.write(JSON.stringify(users))
    res.end()
}

const getUserById = async (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const id = parsedUrl.query.id
    const user = await UserModel.findById(id)
    res.writeHead(200, { 'content-type': 'application/json' })
    res.write(JSON.stringify(user))
    res.end()
}

module.exports = {
    getAll, getUserById
}