function validateForm() {
  let isValid = true;

  // Clear previous error messages
  document.getElementById('nameError').textContent = "";
  document.getElementById('emailError').textContent = "";
  document.getElementById('contactError').textContent = "";
  document.getElementById('messageError').textContent = "";

  // Validate name
  const name = document.getElementById('name').value;
  if (name.trim() === "") {
    document.getElementById('nameError').textContent = "Name is required.";
    isValid = false;
  }

  // Validate email
  const email = document.getElementById('email').value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.trim() === "") {
    document.getElementById('emailError').textContent = "Email is required.";
    isValid = false;
  } else if (!emailPattern.test(email)) {
    document.getElementById('emailError').textContent = "Invalid email format.";
    isValid = false;
  }

  // Validate contact number
  const contact = document.getElementById('contact').value;
  if (contact.trim() === "") {
    document.getElementById('contactError').textContent = "Contact number is required.";
    isValid = false;
  }

  // Validate message
  const message = document.getElementById('message').value;
  if (message.trim() === "") {
    document.getElementById('messageError').textContent = "Message is required.";
    isValid = false;
  }

  // If all fields are valid, submit the form
  if (isValid) {
    submitForm();
  }
}

async function submitForm() {
  const submitButton = document.getElementById('submitBtn');
  submitButton.disabled = true;
  submitButton.textContent = 'Processing';

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    contact: document.getElementById('contact').value,
    message: document.getElementById('message').value
  };

  const scriptURL = 'https://script.google.com/macros/s/AKfycbxIIAnKxGZb2-RSuigGqmxv_JjlcozjcmHjAGSmxHa5q-6saQj31AFcvGv8Oqk8xJEvHg/exec';
  // const scriptURL = 'https://script.google.com/macros/s/AKfycbzxzA5mo7ROysXVGDFZ43ZtBGt0-51_l7WTXpHsxLWUCUCdD1BJSKf2t55sFPxPTtdu/exec';
  const requestBody = new URLSearchParams(formData).toString();

  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: requestBody
    });

    if (response.ok) {
      alert('Your request has been submitted successfully.');
    } else {
      alert('There was an error submitting your request. Please try again later.');
    }
  } catch (error) {
    alert('An error occurred: ' + error.message);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Submit';
  }
}