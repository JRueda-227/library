class Library {
    constructor() {
        this.library = [];

        this.newBookForm = document.querySelector('#new-book-form');
        this.newBookButton = document.querySelector('#new-book-button');
        this.addButton = document.querySelector('#add-button');
        this.closeButton = document.querySelector('#close-button');

        this.newBookButton.addEventListener('click', () => {
            this.newBookForm.showModal();
        })

        this.closeButton.addEventListener('click', () => {
            this.newBookForm.close();
        })

        this.addButton.addEventListener('click', (event) => {
            event.preventDefault();
            
            this.addBookToLibrary();
            this.displayBook();
            this.clearInput();
        })
    }

    addBookToLibrary() {
        const bookTitle = document.querySelector('#book-title').value;
        const bookAuthor = document.querySelector('#book-author').value;
        const bookPages = document.querySelector('#book-pages').value;
        const bookRead = document.querySelector('#book-read').checked;
        const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
        this.library.push(newBook);
    }

    displayBook() {
        const library = document.querySelector('.library');
        
        library.textContent = '';
        for (let i = 0; i < this.library.length; i++) {
            let book = this.library[i];
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
                this.displayBook()
            })

            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-button');
            card.appendChild(removeButton);

            removeButton.addEventListener('click', () => {
                this.removeBook(book);
                library.removeChild(card);
            })

            library.appendChild(card);
        }
    }

    removeBook(book) {
        let index = this.library.findIndex(obj => obj.title === book.title)
        if (index != -1) {
            this.library.splice(index, 1);
        }
    }

    clearInput() {
        document.querySelector('#book-title').value = '';
        document.querySelector('#book-author').value = '';
        document.querySelector('#book-pages').value = '';
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

const myLibrary = new Library();


