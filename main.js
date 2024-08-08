const bookSubmitForm = document.getElementById('inputBook');
const searchBookForm = document.getElementById('searchBook');
const searchResetButton = document.getElementById('searchReset');

// Fungsi untuk menghasilkan ID unik berdasarkan timestamp
function generateId() {
    return +new Date();
}

// Fungsi untuk menyimpan data buku ke dalam Local Storage
function saveBooksToLocalStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

// Fungsi untuk mengambil data buku dari Local Storage
function loadBooksFromLocalStorage() {
    const storedBooks = localStorage.getItem('books');
    return storedBooks ? JSON.parse(storedBooks) : [];
}

// Fungsi untuk merender rak buku berdasarkan status (selesai atau belum selesai dibaca)
function renderBookshelf(bookshelf, books) {
    const bookshelfList = bookshelf === 'complete' ? completeBookshelfList : incompleteBookshelfList;
    bookshelfList.innerHTML = '';

    books.forEach(book => {
        const bookItem = createBookItem(book, bookshelf);
        bookshelfList.appendChild(bookItem);
    });
}

// Fungsi untuk membuat template item buku pada rak
function createBookItem(book, bookshelf) {
    const { id, title, author, year, isComplete } = book;

    const article = document.createElement('article');
    article.classList.add('book_item');

    const bookTitle = document.createElement('h3');
    bookTitle.textContent = title;

    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = `Penulis: ${author}`;

    const bookYear = document.createElement('p');
    bookYear.textContent = `Tahun: ${year}`;

    const actionDiv = document.createElement('div');
    actionDiv.classList.add('action');

    const moveButton = document.createElement('button');
    moveButton.textContent = bookshelf === 'complete' ? 'Belum selesai di Baca' : 'Selesai dibaca';
    moveButton.classList.add('green');
    moveButton.dataset.id = id;
    moveButton.addEventListener('click', () => {
        const fromShelf = bookshelf === 'complete' ? 'complete' : 'incomplete';
        const toShelf = bookshelf === 'complete' ? 'incomplete' : 'complete';
        moveBook(id, fromShelf, toShelf);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus buku';
    deleteButton.classList.add('red');
    deleteButton.dataset.id = id;
    deleteButton.addEventListener('click', () => {
        deleteBook(id);
    });

    actionDiv.appendChild(moveButton);
    actionDiv.appendChild(deleteButton);

    article.appendChild(bookTitle);
    article.appendChild(bookAuthor);
    article.appendChild(bookYear);
    article.appendChild(actionDiv);

    return article;
}

// Fungsi untuk menambahkan buku baru ke dalam rak "Belum selesai dibaca"
function addBook() {
    const inputBookTitle = document.getElementById('inputBookTitle').value;
    const inputBookAuthor = document.getElementById('inputBookAuthor').value;
    const inputBookYear = document.getElementById('inputBookYear').value;
    const inputBookIsComplete = document.getElementById('inputBookIsComplete').checked;

    const year = inputBookYear ? parseInt(inputBookYear) : 0;

    const newBook = {
        id: generateId(),
        title: inputBookTitle,
        author: inputBookAuthor,
        year: year,
        isComplete: inputBookIsComplete,
    };
    const books = loadBooksFromLocalStorage();
    books.push(newBook);
    saveBooksToLocalStorage(books);

    // Render ulang kedua rak buku
    renderBookshelf('incomplete', books.filter(book => !book.isComplete));
    renderBookshelf('complete', books.filter(book => book.isComplete));

    bookSubmitForm.reset();
}


// Fungsi untuk memindahkan buku dari rak "Belum selesai dibaca" ke rak "Selesai dibaca" dan sebaliknya
function moveBook(bookId, fromShelf, toShelf) {
    const books = loadBooksFromLocalStorage();
    const movedBookIndex = books.findIndex(book => book.id == bookId);

    if (movedBookIndex !== -1) {
        const movedBook = books[movedBookIndex];

        // Memeriksa apakah buku sudah ada di rak tujuan
        const isBookExistInDestinationShelf = books.some(
            book => book.id !== bookId && book.title === movedBook.title && book.isComplete === !movedBook.isComplete
        );

        if (!isBookExistInDestinationShelf) {
            // Jika buku belum ada di rak tujuan, maka baru bisa dipindahkan
            movedBook.isComplete = !movedBook.isComplete;
            saveBooksToLocalStorage(books);

            renderBookshelf(fromShelf, books.filter(book => !book.isComplete));
            renderBookshelf(toShelf, books.filter(book => book.isComplete));
        } else {
            alert('Buku yang sama sudah ada di rak tujuan!');
        }
    }
}



// Fungsi untuk memindahkan buku dari rak "Belum selesai dibaca" ke rak "Selesai dibaca" dan sebaliknya
function moveBook(bookId, fromShelf, toShelf) {
    const books = loadBooksFromLocalStorage();
    const movedBookIndex = books.findIndex(book => book.id == bookId);

    if (movedBookIndex !== -1) {
        const movedBook = books[movedBookIndex];

        // Jika buku ada di rak tujuan, maka jangan lakukan apa-apa
        if (movedBook.isComplete === (toShelf === 'complete')) {
            alert('Buku sudah ada di rak tujuan.');
            return;
        }

        movedBook.isComplete = toShelf === 'complete';
        saveBooksToLocalStorage(books);

        renderBookshelf('incomplete', books.filter(book => !book.isComplete));
        renderBookshelf('complete', books.filter(book => book.isComplete));
    }
}



// Fungsi untuk memindahkan buku dari rak "Belum selesai dibaca" ke rak "Selesai dibaca" dan sebaliknya
function moveBook(bookId, fromShelf, toShelf) {
    const books = loadBooksFromLocalStorage();
    const movedBookIndex = books.findIndex(book => book.id == bookId);

    if (movedBookIndex !== -1) {
        const movedBook = books[movedBookIndex];

        // Jika buku ada di rak tujuan, maka jangan lakukan apa-apa
        if (movedBook.isComplete === (toShelf === 'complete')) {
            alert('Buku sudah ada di rak tujuan.');
            return;
        }

        movedBook.isComplete = toShelf === 'complete';
        saveBooksToLocalStorage(books);

        renderBookshelf('incomplete', books.filter(book => !book.isComplete));
        renderBookshelf('complete', books.filter(book => book.isComplete));
    }
}

// Fungsi untuk menghapus buku dari rak
function deleteBook(bookId) {
    const books = loadBooksFromLocalStorage();
    const deletedBookIndex = books.findIndex(book => book.id == bookId);

    if (deletedBookIndex !== -1) {
        const deletedBook = books[deletedBookIndex];

        // Memeriksa apakah buku ada di rak yang sesuai
        const isBookInCorrectShelf = (shelf) => {
            if (shelf === 'complete') {
                return deletedBook.isComplete;
            } else {
                return !deletedBook.isComplete;
            }
        };

        if (isBookInCorrectShelf('complete') || isBookInCorrectShelf('incomplete')) {
            books.splice(deletedBookIndex, 1);
            saveBooksToLocalStorage(books);

            renderBookshelf('incomplete', books.filter(book => !book.isComplete));
            renderBookshelf('complete', books.filter(book => book.isComplete));
        } else {
            alert('Buku tidak ditemukan di rak yang sesuai!');
        }
    }
}
// Event listener untuk form tambah buku
bookSubmitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
});

// Event listener untuk form cari buku
searchBookForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchBookTitle = document.getElementById('searchBookTitle').value;

    if (searchBookTitle.trim() !== '') {
        const searchResult = searchBooksByTitle(searchBookTitle);
        renderSearchResult(searchResult);
    } else {
        // Jika input pencarian kosong, tampilkan semua buku
        const books = loadBooksFromLocalStorage();
        renderBookshelf('incomplete', books.filter(book => !book.isComplete));
        renderBookshelf('complete', books.filter(book => book.isComplete));
    }
});

// Event listener untuk tombol reset pencarian
searchResetButton.addEventListener('click', function () {
    const books = loadBooksFromLocalStorage();
    renderBookshelf('incomplete', books.filter(book => !book.isComplete));
    renderBookshelf('complete', books.filter(book => book.isComplete));
    searchBookForm.reset();
});

// Fungsi untuk melakukan pencarian buku berdasarkan judul
function searchBooksByTitle(title) {
    const books = loadBooksFromLocalStorage();
    return books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
}

// Fungsi untuk merender hasil pencarian buku
function renderSearchResult(searchResult) {
    const incompleteBooks = searchResult.filter(book => !book.isComplete);
    const completeBooks = searchResult.filter(book => book.isComplete);

    renderBookshelf('incomplete', incompleteBooks);
    renderBookshelf('complete', completeBooks);
}

// Fungsi untuk melakukan render awal ketika halaman dimuat
function renderOnLoad() {
    const books = loadBooksFromLocalStorage();
    renderBookshelf('incomplete', books.filter(book => !book.isComplete));
    renderBookshelf('complete', books.filter(book => book.isComplete));
}

// Memanggil fungsi renderOnLoad untuk melakukan render awal
renderOnLoad();
const storedData = localStorage.getItem('books');

// Periksa apakah data tersedia
if (storedData) {
    // Konversi data dari string JSON menjadi objek JavaScript
    const parsedData = JSON.parse(storedData);
    console.log(parsedData);
} else {
    console.log('Data tidak ditemukan di Local Storage.');
}