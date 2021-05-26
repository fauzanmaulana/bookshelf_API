const {nanoid} = require('nanoid')

module.exports = (name, year, author, summary, publisher, pageCount, readPage, reading) => {
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt
    return {
        id: nanoid(16),
        name: name,
        year: year,
        author: author,
        summary: summary,
        publisher: publisher,
        pageCount: pageCount,
        readPage: readPage,
        finished: pageCount == readPage ? true : false,
        reading: reading,
        insertedAt: insertedAt,
        updatedAt: updatedAt,
    }
}