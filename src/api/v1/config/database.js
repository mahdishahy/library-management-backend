const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const url = process.env.DB_CONNECTION_URL;
const dbName = process.env.DB_NAME;
const client = new MongoClient(url)

const connect = async () => {
    try {
        await client.connect()
        console.log('Connected to the database');
        const database = client.db(dbName)
        return database
    } catch (error) {
        console.log(`Database connection failed: ${error}`);
        process.exit(1) // Exit the process with an error
    }

}

module.exports = { connect }