/* eslint-disable require-jsdoc */
const books = require('../src/books')

class Response {
    constructor(name=null, pageCount=null, readPage=null, bookId=null) {
        this.name = name
        this.pageCount = pageCount
        this.readPage = readPage
        this.bookId = bookId
        this.isValidate = true
        this.response = null
        if (!name) {
            this.nullName()
        }
        if (readPage > pageCount) {
            this.readPageMoreThanPageCount()
        }
        if (!name && !pageCount && !readPage && bookId) {
            this.bookNotFound(bookId)
        }
    }

    nullName() {
        this.isValidate = false
        this.response = {
            code: 400,
            status: 'fail',
            message: `Gagal ${this.bookId ? 'memperbarui' :'menambahkan'} buku. Mohon isi nama buku`,
        }
    }

    readPageMoreThanPageCount() {
        this.isValidate = false
        this.response = {
            code: 400,
            status: 'fail',
            message: `Gagal ${this.bookId ? 'memperbarui' :'menambahkan'} buku. readPage tidak boleh lebih besar dari pageCount`,
        }
    }

    bookNotFound(id) {
        this.isValidate = true
        const book = books.filter((book) => book.id === id)[0]
        if (!book) {
            this.response = {
                code: 404,
                status: 'fail',
                message: `${this.bookId && !this.name && !this.pageCount && !this.readPage ? 'Buku tidak ditemukan' : 'Gagal memperbarui buku. Id tidak ditemukan'}`,
            }
        }
    }

    genericError() {
        return {
            code: 500,
            status: 'fail',
            message: 'Buku gagal ditambahkan',
        }
    }

    customResponse(message, data=null, isSuccess=true) {
        if (!data) {
            return {
                status: isSuccess ? 'success' : 'fails',
                message: message,
            }
        }
        return {
            status: isSuccess ? 'success' : 'fails',
            message: message,
            data,
        }
    }
}

module.exports = Response