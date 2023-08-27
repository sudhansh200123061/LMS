document.addEventListener('DOMContentLoaded', function () {
  const editNameButton = document.getElementById("editNameButton");
  const userDetailsContainer = document.getElementById("userDetails");
  var userDataElement = document.getElementById('user-data');

  const displayUserDetails = async()=>{
    var userDataElement = document.getElementById('user-data');
    var userEmail = userDataElement.getAttribute('data-user-email');
    // fetch user details with this email from database
    const response = await fetch(`/profile/${userEmail}`);    
    const user = await response.json();

    userDetailsContainer.innerHTML = `
      <h2>Hello, ${user.user.name}!</h2>
      <h3>Email: ${user.user.email}</h3>
      <h3>Issued Books:</h3>
      <ul>
        ${user.user.issuedBooks.map(book => `
          <li>
            Book ID: ${book.bookID}<br>
            Issue Date: ${book.issueDate}<br>
            Returned: ${book.returned ? "Yes" : "No"}
          </li>
        `).join("")}
      </ul>
    `;
  } 
  displayUserDetails();

  const updateUsername = async(email, name) => {

    const response = await fetch(`/profile/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name }),
    });
    const data = await response.json();
    displayUserDetails();
  }


  editNameButton.addEventListener("click", function() {
    const newName = prompt("Enter your new name:");
    var userEmail = userDataElement.getAttribute('data-user-email');
    
    if (newName) {
      updateUsername(userEmail, newName);  
      
    }
  });
  
});
  