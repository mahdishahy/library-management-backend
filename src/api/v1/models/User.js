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

const findByEmail = async (email) => {
    const database = await connect()
    const usersCollection = database.collection("users")
    const user = await usersCollection.findOne({ email: email })
    return user
}

const findByPhoneNumber = async (phoneNumber) => {
    const database = await connect()
    const usersCollection = database.collection("users")
    const user = await usersCollection.findOne({ phone_number: phoneNumber })
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

const store = async (newUserInfos) => {
    try {
        const database = await connect()
        const usersCollection = database.collection('users')
        const storeResult = await usersCollection.insertOne(newUserInfos)
        if (!storeResult.insertedId) {
            return { success: false, message: 'ثبت نام ناموفق بود' }
        }
        return { success: true, message: 'ثبت نام با موفقیت انجام شد', userId: storeResult.insertedId }
    } catch (error) {
        return { success: false, message: 'خطا در سرور' }
    }
}


module.exports = { find, findById, update, remove, store, findByEmail, findByPhoneNumber }