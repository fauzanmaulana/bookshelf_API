const books = require('./books')
const modelBook = require('../model/Book')
const Response = require('../helpers/Response')
const FilterQuery = require('../helpers/FilterQuery')

let result

const getAllBooksHandler = (request, h) => {
    const response = new Response()
    const {name, reading, finished} = request.query

    let data = books.map((book) => ({id: book.id, name: book.name, publisher: book.publisher}))

    const filter = new FilterQuery(books, name || reading || finished, Object.keys(request.query).toString())
    if (name || reading || finished) {
        console.log('DO FILTER..')
        data = filter.result.map((book) => ({id: book.id, name: book.name, publisher: book.publisher}))
    }

    result = h.response(response.customResponse('Daftar Buku', {books: data}))
    result.code(200)
    return result
}

const showBookHandler = (request, h) => {
    const {bookId} = request.params
    const response = new Response(null, null, null, bookId)

    if (!response.isValidate) {
        const {status, message, code} = response.response
        result = h.response({status, message})
        result.code(code)
        return result
    }

    const book = books.filter((book) => book.id === bookId)[0]

    result = h.response(response.customResponse('Buku ditemukan', {book: book}))
    result.code(200)
    return result
}

const addBookHandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload

    const response = new Response(name, pageCount, readPage)

    if (!response.isValidate) {
        const {status, message, code} = response.response
        result = h.response({status, message})
        result.code(code)
        return result
    }

    const book = modelBook(name, year, author, summary, publisher, pageCount, readPage, reading)

    if (books.filter((data) => data.id === book.id).length > 0) {
        const {status, message, code} = response.genericError()
        result = h.response(status, message)
        result.code(code)
        return result
    }

    books.push(book)

    result = h.response(response.customResponse('Buku berhasil ditambahkan', {bookId: book.id}))
    result.code(201)
    return result
}

const updateBookHandler = (request, h) => {
    const {bookId} = request.params
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload
    const updatedAt = new Date().toISOString()

    const response = new Response(name, pageCount, readPage, bookId)

    if (!response.isValidate) {
        const {status, message, code} = response.response
        result = h.response({status, message})
        result.code(code)
        return result
    }

    const book = modelBook(name, year, author, summary, publisher, pageCount, readPage, reading)
    book.updatedAt = updatedAt

    const index = books.findIndex((book) => book.id === bookId)

    if (index !== -1) {
        books.splice(index, 1, book)

        result = h.response(response.customResponse('Buku berhasil diperbarui'))
        result.code(200)
        return result
    }
}

const deleteBookHandler = (request, h) => {
    const {bookId} = request.params
    const response = new Response(null, null, null, bookId)

    if (!response.isValidate) {
        const {status, code} = response.response
        const message = 'Buku gagal dihapus. Id tidak ditemukan'
        result = h.response({status, message})
        result.code(code)
        return result
    }

    const index = books.findIndex((book) => book.id === bookId)

    if (index !== -1) {
        books.splice(index, 1)

        result = h.response(response.customResponse('Catatan berhasil dihapus'))
        result.code(200)
        return result
    }
}

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    showBookHandler,
    updateBookHandler,
    deleteBookHandler,
}