const url = require('url');
const BookModel = require('../models/books.js');
const bcrypt = require('bcrypt');

const getAll = async (req, res) => {
    const books = await BookModel.find()
    res.writeHead(200, { 'content-type': 'application/json' })
    res.write(JSON.stringify(books))
    res.end()
}

const getBookById = async (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const id = parsedUrl.query.id
    const book = await BookModel.findById(id)
    res.writeHead(200, { 'content-type': 'application/json' })
    res.write(JSON.stringify(book))
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
            const updateResult = await BookModel.update(id, updateData)
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
        const removeResult = await BookModel.remove(id)
        res.writeHead(removeResult.success ? 200 : 404, { 'content-type': 'application/json' })
        res.write(JSON.stringify(removeResult))
        res.end()
    } catch (error) {
        res.writeHead(400, { 'content-type': 'application/json' })
        res.write(JSON.stringify({ success: false, message: 'ورودی نامعتبر' }))
        res.end()
    }
}

const store = async (req, res) => {
    try {
        let newBookInfosBody = ''
        req.on('data', async (data) => {
            newBookInfosBody += data.toString()
        })

        req.on('end', async () => {
            const {
                title,
                author,
                isbn,
                pages,
                publisher,
                copies_available,
                total_copies,
                language,
                publication_date,
                description,
                category,
                image_url } = JSON.parse(newBookInfosBody)

            if (!title ||
                !author ||
                !isbn ||
                !pages ||
                !publisher ||
                !copies_available ||
                !total_copies ||
                !language ||
                !publication_date ||
                !description ||
                !category ||
                !image_url
            ) {
                res.writeHead(400, { 'content-type': 'application/json' })
                res.write(JSON.stringify({ success: false, message: 'تمامی فیلد ها الزامی هستند' }))
                res.end()
            } else {
                const newBookData = {
                    title,
                    author,
                    isbn,
                    pages,
                    publisher,
                    copies_available,
                    total_copies,
                    language,
                    publication_date,
                    description,
                    category,
                    image_url,
                    free: true,
                    created_at: Date.now(),
                    updated_at: Date.now()
                }
                const storeBookResult = await BookModel.store(newBookData)
                res.writeHead(storeBookResult.success ? 201 : 400, { 'content-type': 'application/json' })
                res.write(JSON.stringify(storeBookResult))
                res.end()
            }
        })
    } catch (error) {
        res.writeHead(500, { 'content-type': 'application/json' })
        res.write(JSON.stringify({ success: false, message: 'خطا در سرور' }))
        res.end()
    }
}

module.exports = { getAll, getBookById, update, remove, store }