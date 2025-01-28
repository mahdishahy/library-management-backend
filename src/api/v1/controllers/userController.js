const url = require('url');
const UserModel = require('./../models/User.js')

const getAll = async (req, res) => {
    const users = await UserModel.find()
    res.writeHead(200, { 'content-type': 'application/json' })
    res.write(JSON.stringify(users))
    res.end()
}

module.exports = {
    getAll
}