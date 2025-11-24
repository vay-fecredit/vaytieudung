
/* form.js - Handles form submission and validation */
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.querySelector('form[onsubmit="vn4subscribe_qwertyuiop_os8s7MXr2dKDEYfOCjEb()"]');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const emailInput = document.getElementById('vn4subscribe_os8s7MXr2dKDEYfOCjEb');
      const email = emailInput.value;
      const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (emailRegex.test(email)) {
        fetch('https://shinhan.com.vn/vn4-subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `_token=flBZzgVCzEBmPwoEyekJgpET4VkG6FCAU6WnPQta&email=${encodeURIComponent(email)}`
        })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              // Fix: Use textContent instead of innerHTML to prevent XSS
              document.getElementById('message_message').textContent = 'Sign Up Success. We will update you with the latest news from Shinhan Bank.';
              document.getElementById('btn-success').click();
              emailInput.value = '';
            }
          })
          .catch(error => {
            // Form submission error occurred
            // Fix: Use textContent instead of innerHTML to prevent XSS
            document.getElementById('message_message').textContent = 'An error occurred. Please try again.';
            document.getElementById('btn-success').click();
          });
      } else {
        // Fix: Use textContent instead of innerHTML to prevent XSS
        document.getElementById('message_message').textContent = 'Please enter the correct email format';
        document.getElementById('btn-success').click();
      }
    });
  }
});
