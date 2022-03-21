const loginFormHandler = async (event) => {
  event.preventDefault();

  console.log('user is now logged into the application')

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
      const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' },
      });

      console.log('login post route is here')

      if (response.ok) {
          document.location.replace('/');
      } else {
          alert(response.statusText);
      }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);