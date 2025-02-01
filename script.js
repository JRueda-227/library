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

addBookToLibrary('LOTR', 'Tolkien', '295')
addBookToLibrary('Meditations', 'Marcus Aurelious', '200');

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

const button = document.querySelector('button')
button.addEventListener('click', displayBook);
