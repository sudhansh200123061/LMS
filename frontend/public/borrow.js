var userDataElement = document.getElementById('user-data');
var userEmail = userDataElement.getAttribute('data-user-email');
var bookID = userDataElement.getAttribute('book-id');
var enteredOTP;
var verified= false
document.getElementById('otp-button').addEventListener('click', async () => {    
    const response = await fetch('/otp/send-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userEmail })
    });

    const result = await response.json();
    if (result.success) {
        alert('OTP has been sent to your email.');
    } else {
        alert(result.message);
    }
});

function focusNextInput(currentInput) {
    const maxLength = parseInt(currentInput.getAttribute('maxlength'));
    const currentLength = currentInput.value.length;
    
    if (currentLength === maxLength) {
      const nextInput = currentInput.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
    
    const otpInputs = document.querySelectorAll('.otp-input');
    let otpValue = '';
    
    otpInputs.forEach(input => {
      otpValue += input.value;
    });
    enteredOTP = otpValue;    
    
  }
document.getElementById('verify-otp-button').addEventListener('click', async () => {

    const response = await fetch('/otp/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ enteredOTP })
    });

    const result = await response.json();
    alert(result.message);
    if(result.success){
        verified=true;
    }
});

const borrowButton = document.getElementById('borrow-button');
borrowButton.addEventListener('click', async () => {
    if(!verified){
        alert("Please verify OTP first");
        return;
    }
  try {
    const response = await fetch(`/bookBorrow/${userEmail}/${bookID}`, {
      method: 'POST',
    });

    const data = await response.json();

    if (response.ok) {
        alert(data.message);
        window.location.href = '/user_dashboard';
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
