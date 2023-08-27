document.addEventListener('DOMContentLoaded', () => {
    const addBookForm = document.getElementById('add-book-form');
    const bookList = document.getElementById('book-list');

    // Function to fetch and display available books
    const displayBooks = async () => {
        bookList.innerHTML = '';

        const response = await fetch('/books');
        const books = await response.json();

        const tableBody = document.getElementById('book-list');
        books.forEach(book => {
            const row = tableBody.insertRow();

            const uniqueCodeCell = row.insertCell();
            uniqueCodeCell.textContent = book.uniqueCode;         

            const titleCell = row.insertCell();
            titleCell.textContent = book.title;

            const authorsCell = row.insertCell();
            authorsCell.textContent = book.authors.join(', ');

            const statusCell = row.insertCell();
            statusCell.textContent = book.available ? 'Available' : 'Not Available';
            const actionsCell = row.insertCell();
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                const response = await fetch(`/books/${book._id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    displayBooks(); // Refresh the list after deletion
                }
            });
            actionsCell.appendChild(deleteButton);
        });
        
    };

    // Add book form submission
    addBookForm.addEventListener('submit', async event => {
        event.preventDefault();

        const title = addBookForm.title.value;
        const authors = addBookForm.authors.value.split(',').map(author => author.trim());

        const response = await fetch('/books/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, authors })
        });

        if (response.ok) {
            displayBooks();
            addBookForm.reset();
        }
    });

    // Initial display of available books
    displayBooks();
});
