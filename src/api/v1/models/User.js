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
    const usersCollection = database.collection("users")
    const user = await usersCollection.findOne({ _id: new ObjectId(id) })
    return user
}

const update = async (id, updateData) => {
    try {
        const database = await connect()
        const usersCollection = database.collection('users')
        const filter = { _id: new ObjectId(id) }
        const update = { $set: updateData }
        const updateUserResult = await usersCollection.updateOne(filter, update)
        if (updateUserResult.matchedCount === 0) {
            return { success: false, message: "کاربر یافت نشد" };
        }
        return { success: true, message: "اطلاعات کاربر با موفقیت به‌روزرسانی شد" };
    }
    catch (error) {
        return { success: false, message: "خطا در سرور" };
    }
}

module.exports = { find, findById, update }