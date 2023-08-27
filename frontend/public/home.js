const quoteCarousel = document.getElementById("quote-carousel");
const newArrivalsCarousel = document.getElementById("new-arrivals-carousel");

const quotes = [
    "Reading is dreaming with open eyes.",
    "A room without books is like a body without a soul.",
    // Add more quotes here
];

const newArrivals = [
    "New Arrival: 'The Alchemist' by Paulo Coelho",
    "New Arrival: 'Educated' by Tara Westover",
    // Add more new arrivals here
];

let index = 0;

function changeContent() {
    quoteCarousel.innerHTML = `<p class="quote">${quotes[index]}</p>`;
    newArrivalsCarousel.innerHTML = `<p class="new-arrival">${newArrivals[index]}</p>`;
    index = (index + 1) % quotes.length;
}

setInterval(changeContent, 5000); // Change content every 5 seconds

const userlogin = document.getElementById('user');
userlogin.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default link behavior

  const confirmation = confirm('Are you sure you want to login as user? This will end your session as admin (if any).');

  if (confirmation) {
    window.location.href = '/user_dashboard'; // Redirect if user agrees
  }
});
const adminlogin = document.getElementById('admin');
adminlogin.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the default link behavior

  const confirmation = confirm('Are you sure you want to login as admin? This will end your session as user (if any).');

  if (confirmation) {
    window.location.href = '/admin_dashboard'; // Redirect if user agrees
  }
});




