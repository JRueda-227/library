const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.readStatus = function() {
    this.read = !this.read;
}

function addBookToLibrary() {
    const bookTitle = document.querySelector('#book-title').value;
    const bookAuthor = document.querySelector('#book-author').value;
    const bookPages = document.querySelector('#book-pages').value;
    const bookRead = document.querySelector('#book-read').checked;
    const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
    myLibrary.push(newBook);
}

function displayBook() {
    library.textContent = '';
    for (let i = 0; i < myLibrary.length; i++) {
        let book = myLibrary[i];
        const card = document.createElement('div');
        const title = document.createElement('h3');
        const author = document.createElement('h5');
        const pages = document.createElement('p');
        const read = document.createElement('button');
        const removeButton = document.createElement('button');

        card.classList.add('card');

        title.textContent = book.title;
        title.classList.add('card-header');
        card.appendChild(title);

        author.textContent = book.author;
        card.appendChild(author);

        pages.textContent = book.pages;
        card.appendChild(pages);

        read.textContent = book.read ? 'Read' : 'Not Read';
        read.classList.add(book.read ? 'read' : 'not-read');
        card.appendChild(read);

        read.addEventListener('click', () => {
            book.readStatus();
            displayBook()
        })

        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        card.appendChild(removeButton);

        removeButton.addEventListener('click', () => {
            removeBook(book);
            library.removeChild(card);
        })

        library.appendChild(card);
    }
}

function removeBook(book) {
    let index = myLibrary.findIndex(obj => obj.title === book.title)
    if (index != -1) {
        myLibrary.splice(index, 1);
    }
}

function clearInput() {
    document.querySelector('#book-title').value = '';
    document.querySelector('#book-author').value = '';
    document.querySelector('#book-pages').value = '';
}

const library = document.querySelector('.library');
const newBookForm = document.querySelector('#new-book-form');
const form = document.querySelector('#form');
const newBookButton = document.querySelector('#new-book-button');
const addButton = document.querySelector('#add-button');
const closeButton = document.querySelector('#close-button');

newBookButton.addEventListener('click', () => {
    newBookForm.showModal();
})

closeButton.addEventListener('click', () => {
    newBookForm.close();
})

addButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    addBookToLibrary();
    displayBook();
    clearInput();
})



