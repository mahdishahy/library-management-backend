require('dotenv').config();
const path = require('path');
const { connect, ObjectId } = require(path.resolve('src/api/v1/config/database.js'));

const find = async () => {
    const database = await connect()
    const booksCollection = database.collection('books')
    const books = await booksCollection.find().toArray()
    return books
}

const findById = async (id) => {
    const database = await connect()
    const booksCollection = database.collection("books")
    const book = await booksCollection.findOne({ _id: new ObjectId(id) })
    return book
}

const update = async (id, updateData) => {
    try {
        const database = await connect()
        const booksCollection = database.collection('books')
        const filter = { _id: new ObjectId(id) }
        const update = { $set: updateData }
        const updateResult = await booksCollection.updateOne(filter, update)
        if (updateResult.matchedCount === 0) {
            return { success: false, message: "کتاب یافت نشد" };
        }
        return { success: true, message: "اطلاعات کتاب با موفقیت به‌روزرسانی شد" };
    }
    catch (error) {
        return { success: false, message: "خطا در سرور" };
    }
}

const remove = async (id) => {
    try {
        const database = await connect()
        const booksCollection = database.collection('books')
        const rermoveResult = await booksCollection.deleteOne({ _id: new ObjectId(id) })
        if (rermoveResult.deletedCount === 0) {
            return { success: false, message: 'کتاب یافت نشد' }
        }
        return { success: true, message: 'کتاب مورد نظر با موفقیت حذف شد' }
    } catch (error) {
        return { success: false, message: 'خطا در سرور' }
    }
}

const store = async (newBookInfos) => {
    try {
        const database = await connect()
        const booksCollection = database.collection('books')
        const storeResult = await booksCollection.insertOne(newBookInfos)
        if (!storeResult.insertedId) {
            return { success: false, message: 'ثبت کتاب ناموفق بود' }
        }
        return { success: true, message: 'ثبت کتاب با موفقیت انجام شد', bookId: storeResult.insertedId }
    } catch (error) {
        return { success: false, message: 'خطا در سرور' }
    }
}

module.exports = { find, findById, update, remove, store }