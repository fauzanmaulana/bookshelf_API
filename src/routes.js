const {
    getAllBooksHandler,
    addBookHandler,
    showBookHandler,
    updateBookHandler,
    deleteBookHandler,
} = require('./handler')

const routes = [
    {
        method: 'GET',
        path: '/books',
        config: {
            handler: getAllBooksHandler,
        },
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        config: {
            handler: showBookHandler,
        },
    },
    {
        method: 'POST',
        path: '/books',
        config: {
            handler: addBookHandler,
        },
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        config: {
            handler: updateBookHandler,
        },
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        config: {
            handler: deleteBookHandler,
        },
    },
]

module.exports = routes