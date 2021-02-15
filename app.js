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
    const books = Store.getBooks()
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

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove()
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div')
    div.className = `alert alert-${className}`
    div.appendChild(document.createTextNode(message))
    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')
    container.insertBefore(div, form)

    // vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 2000)
  }

  static clearFields() {
    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#isbn').value = ''
  }
}
// store class: handles storage
class Store {
  static getBooks() {
    let books
    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books
  }

  static addBooks(book) {
    const books = Store.getBooks()
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(isbn) {
    const books = Store.getBooks()
    console.log(books)
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1)
      }
    })

    localStorage.setItem('books', JSON.stringify(books))
  }
}

//events: display books
document.addEventListener('DOMContentLoaded', UI.displayBooks)
//event: add book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  //prevent actual sumbit
  e.preventDefault()

  //Get form values
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const isbn = document.querySelector('#isbn').value

  // validate
  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('please fill in all fields!!', 'danger')
  } else {
    //instantiate a new book
    const book = new Book(title, author, isbn)
    //add Book to UI
    UI.addBookToList(book)

    // add book to store
    Store.addBooks(book)

    //show suceess message
    UI.showAlert('book added successfully!!', 'success')
    // clear fields
    UI.clearFields()
  }
})
//Event: remove book

document.querySelector('#book-list').addEventListener('click', (e) => {
  // remove book from ui
  UI.deleteBook(e.target)
  // remove book from store
  const isbn = e.target.parentElement.previousElementSibling.textContent
  Store.removeBook(isbn)
  //show success message
  UI.showAlert('Book removed!!', 'success')
})
