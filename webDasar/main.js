document.addEventListener("DOMContentLoaded", function () {
    const localStorageKey = 'books';
    const RENDER_EVENT = "render";
    
    let books = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    
    function saveBooksToLocalStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(books));
    }
    
    function generateId() {
        return Date.now();
    }
    function addBook() {
        const title = document.getElementById("inputBookTitle").value;
        const author = document.getElementById("inputBookAuthor").value;
        const year = document.getElementById("inputBookYear").value;
        const isComplete = document.getElementById("inputBookIsComplete").checked;

        
        const generatedID = generateId();
        const newBook = generateBookObject(generatedID, title, author, year, isComplete);
        books.push(newBook);
        saveBooksToLocalStorage();
        renderNewBook(newBook);
        alert("Buku berhasil ditambahkan!");
    }


    function generateBookObject(id, title, author, year, isComplete) {
        year = parseInt(year);
        return { id, title, author, year, isComplete };
    }

    function renderNewBook(book) {
        const bookList = document.getElementById(book.isComplete ? 'completeBookshelfList' : 'incompleteBookshelfList');
        const bookElement = makeBookElement(book);
        bookList.appendChild(bookElement);
    }

    function makeBookElement(book) {
        const { title, author, year, isComplete } = book;

        const textJudul = document.createElement('h3');
        textJudul.innerText = title;

        const authorBook = document.createElement('p');
        authorBook.innerText = author;

        const yearBook = document.createElement('p');
        yearBook.innerText = year;

        const textContainer = document.createElement('article');
        textContainer.classList.add('book_item');
        textContainer.appendChild(textJudul);
        textContainer.appendChild(authorBook);
        textContainer.appendChild(yearBook);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('action');

        const selesaiButton = document.createElement('button');
        selesaiButton.setAttribute('id', 'green');
        selesaiButton.innerText = isComplete ? 'Belum Selesai' : 'Selesai di Baca';
        selesaiButton.addEventListener('click', function () {
            book.isComplete = !book.isComplete;
            saveBooksToLocalStorage();
            renderBooks();
        });

        const hapusButton = document.createElement('button');
        hapusButton.innerText = 'Hapus buku';
        hapusButton.setAttribute('id', 'red');
        hapusButton.addEventListener('click', function () {
            const index = books.findIndex(b => b.id === book.id);
            if (index !== -1) {
                books.splice(index, 1);
                saveBooksToLocalStorage();
                renderBooks();
            }
        });

        buttonContainer.appendChild(selesaiButton);
        buttonContainer.appendChild(hapusButton);

        const container = document.createElement('div');
        container.classList.add('book_list');
        container.appendChild(textContainer);
        container.appendChild(buttonContainer);

        return container;
    }

    function renderBooks() {
        const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
        const completeBookshelfList = document.getElementById('completeBookshelfList');
        incompleteBookshelfList.innerHTML = '';
        completeBookshelfList.innerHTML = '';

        books.forEach(book => {
            const bookElement = makeBookElement(book);
            if (book.isComplete) {
                completeBookshelfList.appendChild(bookElement);
            } else {
                incompleteBookshelfList.appendChild(bookElement);
            }
        });
    }

    renderBooks();

    const submitBook = document.getElementById("inputBook");
    submitBook.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    const searchBookForm = document.getElementById("searchBook");
    searchBookForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const searchTerm = document.getElementById("searchBookTitle").value.toLowerCase();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm)
        );
        renderFilteredBooks(filteredBooks);
    });

    function renderFilteredBooks(filteredBooks) {
        const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
        const completeBookshelfList = document.getElementById('completeBookshelfList');
        incompleteBookshelfList.innerHTML = '';
        completeBookshelfList.innerHTML = '';

        filteredBooks.forEach(book => {
            const bookElement = makeBookElement(book);
            if (book.isComplete) {
                completeBookshelfList.appendChild(bookElement);
            } else {
                incompleteBookshelfList.appendChild(bookElement);
            }
        });
    }
});
