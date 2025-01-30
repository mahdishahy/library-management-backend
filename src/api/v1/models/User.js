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
        const updateResult = await usersCollection.updateOne(filter, update)
        if (updateResult.matchedCount === 0) {
            return { success: false, message: "کاربر یافت نشد" };
        }
        return { success: true, message: "اطلاعات کاربر با موفقیت به‌روزرسانی شد" };
    }
    catch (error) {
        return { success: false, message: "خطا در سرور" };
    }
}

const remove = async (id) => {
    try {
        const database = await connect()
        const usersCollection = database.collection('users')
        const rermoveResult = await usersCollection.deleteOne({ _id: new ObjectId(id) })
        if (rermoveResult.deletedCount === 0) {
            return { success: false, message: 'کاربر یافت نشد' }
        }
        return { success: true, message: 'کاربر مورد نظر با موفقیت حذف شد' }
    } catch (error) {
        return { success: false, message: 'خطا در سرور' }
    }
}

module.exports = { find, findById, update, remove }