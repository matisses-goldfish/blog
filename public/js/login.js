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


const newUserFormHandler = async (event) => {
  event.preventDefault();
  console.log('user is now logged out of the application')
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
      const response = await fetch('/api/users/', {
          method: 'POST',
          body: JSON.stringify({ username, email, password }),
          headers: { 'Content-Type': 'application/json' },
      });
      document.location.replace('/');
      if (response.ok) {
          document.location.replace('/');
      } else {
          alert('failed to create account, please try again at a latter time');
      }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.new-user-form').addEventListener('submit', newUserFormHandler);