class Library {
    constructor() {
        this.library = [];
    }

    addBookToLibrary(book) {
        this.library.push(book);
    }

    removeBookFromLibrary(book) {
        let index = this.library.findIndex(obj => obj === book)
        if (index != -1) {
            this.library.splice(index, 1);
        }
    }
}

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    readStatus() {
        this.read = !this.read;
    }
}

const displayController = (() => {
    const myLibrary = new Library();

    const newBookButton = document.querySelector('#new-book-button');
    const library = document.querySelector('.library');

    const newBookForm = document.querySelector('#new-book-form');
    const addToLibraryBtn = document.querySelector('#add-button');
    const closeButton = document.querySelector('#close-button');    

    const bookTitle = document.querySelector('#book-title');
    const bookAuthor = document.querySelector('#book-author');
    const bookPages = document.querySelector('#book-pages');
    const bookRead = document.querySelector('#book-read');

    function openModal() {
        newBookForm.showModal();
    }

    function closeModal() {
        newBookForm.close();
        clearInput();
    }

    function clearInput() {
        bookTitle.value = '';
        bookAuthor.value = '';
        bookPages.value = '';
    }

    function validateForm() {
        let isValid = true;

        if (isDuplicateTitle(bookTitle.value.trim())) {
            bookTitle.setCustomValidity('This book already exists in the library');
        } else {
            bookTitle.setCustomValidity('');
        }

        if (!bookTitle.checkValidity()) {
            bookTitle.reportValidity();
            isValid = false;
        }

        if (!bookAuthor.checkValidity()) {
            bookAuthor.reportValidity();
            isValid = false;
        }

        if (!bookPages.checkValidity()) {
            bookPages.reportValidity();
            isValid = false;
        }

        return isValid;
    }

    function isDuplicateTitle(title) {
        return myLibrary.library.some(book => book.title.toLowerCase() === title.toLowerCase());
    }

    function createBook() {
       if (!validateForm()) return

        const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked);
        myLibrary.addBookToLibrary(newBook);
        renderBook(newBook)
        closeModal();
    }

    function removeBook(book) {
        const card = document.querySelector(`[data-title="${book.title}"]`);
        myLibrary.removeBookFromLibrary(book);
        library.removeChild(card);
    }

    function renderBook(book) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.title = book.title;

        const title = document.createElement('h3');
        title.textContent = book.title;
        title.classList.add('card-header');

        const author = document.createElement('p');
        author.textContent = `by ${book.author}`;
        author.classList.add('card-author');

        const pages = document.createElement('p');
        pages.textContent = `${book.pages} pages`;
        
        const read = document.createElement('button');
        updateReadStatus(read, book);

        read.addEventListener('click', () => {
            book.readStatus();
            updateReadStatus(read, book);
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');

        removeButton.addEventListener('click', () => {
            removeBook(book);
        });

        card.append(title, author, pages, read, removeButton);
        library.appendChild(card);
    }

    function updateReadStatus(button, book) {
        button.textContent = book.read ? 'Read' : 'Not Read';
        button.classList.remove('read', 'not-read'); 
        button.classList.add(book.read ? 'read' : 'not-read');
    }

    function addEventListeners() {
        newBookButton.addEventListener('click', openModal);

        closeButton.addEventListener('click', closeModal);

        addToLibraryBtn.addEventListener('click', (event) => {
            event.preventDefault();
            createBook();
        });
    }

    function init() {
        addEventListeners();
    }

    return { init };
})();

displayController.init();