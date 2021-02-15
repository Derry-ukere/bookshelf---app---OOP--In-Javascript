// Book class
class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}

// UI class for ui tasks
class UI {
  static displayBooks() {
    const storeBooks = [
      {
        title: 'book one',
        author: 'john doe',
        isbn: '2366520',
      },
      {
        title: 'book two',
        author: 'jane doe',
        isbn: '0060320',
      },
    ]
    const books = storeBooks
    books.forEach((book) => UI.addBookToList(book))
  }
  static addBookToList(book) {
    const list = document.querySelector('#book-list')
    const row = document.createElement('tr')
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = '#' class = "btn btn-danger btn-sm delete">X</a></td>`

    list.appendChild(row)
  }
}
// store class: handles storage

//events: display books
document.addEventListener('DOMContentLoaded', UI.displayBooks)
//event: add book

//envent: remove book
