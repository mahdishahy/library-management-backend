require('dotenv').config();
const path = require('path');
const { connect, ObjectId } = require(path.resolve('src/api/v1/config/database.js'));

const find = async () => {
    const database = await connect()
    const usersCollection = database.collection('users')
    const users = await usersCollection.find().toArray()
    return users
}

const findById = async (id) => {
    const database = await connect()
    const userController = database.collection("users")
    const user = await userController.findOne({ _id: new ObjectId(id) })
    return user
}

module.exports = { find, findById }