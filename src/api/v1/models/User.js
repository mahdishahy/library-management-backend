require('dotenv').config();
const { connect } = require(process.env.BASE_PATH + 'src/api/v1/config/database.js');

const find = async () => {
    const database = await connect();
    const usersCollection = database.collection('users')
    const users = await usersCollection.find().toArray()
    return users
}


module.exports = {find}