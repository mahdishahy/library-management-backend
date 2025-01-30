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

const update = async (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const id = parsedUrl.query.id
    let body = ''
    req.on('data', (data) => {
        body += data.toString()
    })
    req.on('end', async () => {
        try {
            const updateData = JSON.parse(body)
            const updateResult = await UserModel.update(id, updateData)
            res.writeHead(updateResult.success ? 200 : 404, { 'content-type': 'application/json' })
            res.write(JSON.stringify(updateResult))
            res.end()
        } catch (error) {
            res.writeHead(400, { 'content-type': 'application/json' })
            res.write(JSON.stringify({ success: false, message: 'ورودی نامعتبر' }))
            res.end()
        }
    })
}

const remove = async (req, res) => {
    try {
        const parsedUrl = url.parse(req.url, true)
        const id = parsedUrl.query.id
        const removeResult = await UserModel.remove(id)
        res.writeHead(removeResult.success ? 200 : 404, { 'content-type': 'application/json' })
        res.write(JSON.stringify(removeResult))
        res.end()
    } catch (error) {
        res.writeHead(400, { 'content-type': 'application/json' })
        res.write(JSON.stringify({ success: false, message: 'ورودی نامعتبر' }))
        res.end()
    }
}

module.exports = {
    getAll, getUserById, update, remove
}