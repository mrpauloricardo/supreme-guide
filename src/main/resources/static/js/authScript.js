document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');

    function changeTitle(title) {
        document.title = title;
    }

    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
        changeTitle('Registro');
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
        changeTitle('Login');
    });

    const registerUrl = 'http://localhost:8080/auth/register';
    const loginUrl = 'http://localhost:8080/auth/login';

    function handleResponse(response) {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); });
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json();
        } else {
            return response.text();
        }
    }

    function registerUser(username, email, password) {
        fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
        .then(handleResponse)
        .then(data => {
            console.log('Register Response:', data);
            registerMessage.textContent = typeof data === 'string' ? data : (data.message || 'User registered successfully');
            setTimeout(() => {
                registerContainer.style.display = 'none';
                loginContainer.style.display = 'block';
                changeTitle('Login');
            }, 2000);
        })
        .catch(error => {
            console.error('Register Error:', error);
            registerMessage.textContent = error.message || 'An error occurred during registration.';
        });
    }

    function loginUser(email, password) {
        fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(handleResponse)
        .then(data => {
            console.log('Login Response:', data);
            loginMessage.textContent = typeof data === 'string' ? data : (data.message || 'Login successful');
            if (data === 'Login successful' || (typeof data === 'object' && data.message === 'Login successful')) {
                setTimeout(() => {
                    window.location.href = '/src/main/resources/static/subject.html';
                }, 2000);
            }
        })
        .catch(error => {
            console.error('Login Error:', error);
            loginMessage.textContent = error.message || 'An error occurred during login.';
        });
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        loginUser(email, password);
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        registerUser(username, email, password);
    });
});

/* document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginMessage = document.getElementById('loginMessage');
    const registerMessage = document.getElementById('registerMessage');

    // Função para alterar o título
    function changeTitle(title) {
        document.title = title;
    }

    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
        changeTitle('Registro');  // Alterando o título para Registro
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerContainer.style.display = 'none';
        loginContainer.style.display = 'block';
        changeTitle('Login');  // Alterando o título para Login
    });

    // URLs para os endpoints do backend
    const registerUrl = 'http://localhost:8080/auth/register';
    const loginUrl = 'http://localhost:8080/auth/login';

    // Função para registrar usuário
    function registerUser(username, email, password) {
        fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
            .then(response => {
                // Verifica se a resposta é um erro HTML (não JSON)
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text); });
                }
                return response.json();
            })
            .then(data => {
                console.log('Register Response:', data);
                registerMessage.textContent = data.message || 'User registered successfully';
                if (response.ok) {
                    window.location.href = '../auth.html'; // Redireciona para a página de login após registro
                }
            })
            .catch(error => {
                console.error('Register Error:', error);
                registerMessage.textContent = 'An error occurred during registration.';
            });
    }

    // Função para login de usuário
    function loginUser(email, password) {
        fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => {
                // Verifica se a resposta é um erro HTML (não JSON)
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text); });
                }
                return response.json();
            })
            .then(data => {
                console.log('Login Response:', data);
                loginMessage.textContent = data.message || 'Login successful';
                if (response.ok) {
                    window.location.href = '/../subject.html'; // Redireciona para a página de assunto após login
                }
            })
            .catch(error => {
                console.error('Login Error:', error);
                loginMessage.textContent = 'An error occurred during login.';
            });
    }

    // Adiciona event listeners para os formulários
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        loginUser(email, password);
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        registerUser(username, email, password);
    });
});
*/