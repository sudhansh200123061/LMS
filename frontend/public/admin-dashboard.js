// script.js
// Assuming you have a function to fetch book data from your API or database
async function fetchBookData() {
    try {
      const response = await fetch('/books'); // Replace with your API endpoint
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching book data:', error);
      return [];
    }
  }
  
  async function populateBookCounts() {
    const bookData = await fetchBookData();
  
    const totalBooksElement = document.getElementById('totalBooks');
    const availableBooksElement = document.getElementById('availableBooks');
    const unavailableBooksElement = document.getElementById('unavailableBooks');
  
    const totalBooks = bookData.length;
    const availableBooks = bookData.filter(book => book.available).length;
    const unavailableBooks = totalBooks - availableBooks;
  
    totalBooksElement.textContent = totalBooks;
    availableBooksElement.textContent = availableBooks;
    unavailableBooksElement.textContent = unavailableBooks;
  }
  
  populateBookCounts();
  