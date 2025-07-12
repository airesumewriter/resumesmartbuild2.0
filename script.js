document.addEventListener('DOMContentLoaded', () => {
  console.log('Enhanced JS loaded');

  const handleFormSubmit = (form) => {
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
  };

  document.querySelectorAll('form').forEach(handleFormSubmit);

  // Modal Popup
  const modalBtn = document.getElementById('getStartedModalBtn');
  const modal = document.getElementById('modal');
  const closeModalBtn = document.querySelector('.modal-close');

  if (modalBtn && modal && closeModalBtn) {
    modalBtn.addEventListener('click', () => modal.style.display = 'flex');
    closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  // Scroll Reveal
  const revealElements = document.querySelectorAll('.tool-card, .hero, .signup-form');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });

  // Thank-You Page PDF Countdown
  if (window.location.pathname.includes('thank-you.html')) {
    const downloadLink = document.querySelector('a[download]');
    if (downloadLink) {
      downloadLink.addEventListener('click', function (e) {
        e.preventDefault();
        const countdownModal = document.createElement('div');
        countdownModal.innerHTML = `
          <div style="position:fixed;top:0;left:0;width:100%;height:100%;
                      background:rgba(0,0,0,0.6);display:flex;align-items:center;
                      justify-content:center;z-index:9999;">
            <div style="background:white;padding:30px;border-radius:10px;
                        text-align:center;">
              <p>Your download will begin in <span id="countdown">5</span> seconds...</p>
            </div>
          </div>`;
        document.body.appendChild(countdownModal);

        let counter = 5;
        const interval = setInterval(() => {
          counter--;
          document.getElementById('countdown').textContent = counter;
          if (counter <= 0) {
            clearInterval(interval);
            window.location.href = downloadLink.href;
            countdownModal.remove();
          }
        }, 1000);
      });
    }
  }
});
