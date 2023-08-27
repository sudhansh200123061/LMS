document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('book-list');

    // Function to fetch and display available books
    const displayBooks = async () => {
        bookList.innerHTML = '';

        const response = await fetch('/userbooks');
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
            if (!book.available) {
                return;
            }
            const borrowButton = document.createElement('button');
            borrowButton.textContent = 'Borrow';
            actionsCell.appendChild(borrowButton);
            borrowButton.addEventListener('click', async () => {
                //redirect to borrow page with book unique code
                window.location.href = `/borrow/${book.uniqueCode}`;
            });

        });
        
    };

    displayBooks();
});
