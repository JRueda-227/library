const myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
    const newBook = new Book(title, author, pages);
    myLibrary.push(newBook);
}


function displayBook() {
    for (let book of myLibrary) {
        const card = document.createElement('div');
        const title = document.createElement('h3');
        const author = document.createElement('h4');
        const pages = document.createElement('h4');

        card.classList.add('card');

        title.textContent = book.title;
        card.appendChild(title);

        author.textContent = book.author;
        card.appendChild(author);

        pages.textContent = book.pages;
        card.appendChild(pages);

        library.appendChild(card);
    }
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

    const bookTitle = document.querySelector('#book-title').value;
    const bookAuthor = document.querySelector('#book-author').value;
    const bookPages = document.querySelector('#book-pages').value;
    
    addBookToLibrary(bookTitle, bookAuthor, bookPages);
    displayBook();

})



