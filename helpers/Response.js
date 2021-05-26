/* eslint-disable require-jsdoc */
const books = require('../src/books')

class Response {
    constructor(name=null, pageCount=null, readPage=null, bookId=null) {
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
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }
    }

    readPageMoreThanPageCount() {
        this.isValidate = false
        this.response = {
            code: 400,
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }
    }

    bookNotFound(id) {
        const book = books.filter((book) => book.id === id)[0]
        if (!book) {
            this.isValidate = false
            this.response = {
                code: 404,
                status: 'fail',
                message: 'Id tidak ditemukan',
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