form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const firstName = form.querySelector('input[name="firstName"]').value.trim();
  const lastName = form.querySelector('input[name="lastName"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();

  if (!firstName || !lastName || !email) {
    alert('Please fill out all required fields.');
    return;
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Package data and send to serverless API
  const formData = new FormData();
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);
  formData.append('email', email);

  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      window.location.href = '/thank-you.html';
    } else {
      alert('There was a problem submitting the form.');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    alert('An error occurred. Please try again.');
  }
});
