/* eslint-disable require-jsdoc */
class FilterQuery {
    constructor(books, value, type) {
        this.books = books
        this.value = value
        this.result = []

        switch (type) {
            case 'name':
                this.filterByName()
                break;

            case 'reading':
                this.value = this.value == '1' ? true : false
                this.filterByReading()
                break;

            case 'finished':
                this.value = this.value == '1' ? true : false
                this.filterByFinished()
                break;
        }
    }

    filterByName() {
        this.result = this.books.filter((book) => book.name.includes(this.value))
    }

    filterByReading() {
        this.result = this.books.filter((book) => book.reading == this.value)
    }

    filterByFinished() {
        this.result = this.books.filter((book) => book.finished == this.value)
    }
}

module.exports = FilterQuery