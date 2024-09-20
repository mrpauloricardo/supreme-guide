document.addEventListener('DOMContentLoaded', function() {
    const subjectForm = document.getElementById('subjectForm');
    const subjectList = document.getElementById('subjectList');
    const message = document.getElementById('message');
    const sidebarSubjects = document.getElementById('sidebarSubjects');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const logoutButton = document.getElementById('logoutButton');

    // Função para adicionar um subject à lista na página
    function addSubjectToList(subject, container) {
        const subjectElement = document.createElement('div');
        subjectElement.classList.add('subject');
        subjectElement.innerHTML = `
            <h3>${subject.title}</h3>
            <p>${subject.description}</p>
            <small>ID do Subject: ${subject.id}</small>
        `;
        container.appendChild(subjectElement);
    }

    // Fetch inicial dos subjects existentes (todos os subjects)
    function fetchAllSubjects() {
        fetch('/subjects', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            data.forEach(subject => {
                addSubjectToList(subject, subjectList); // Adiciona à lista principal
            });
        })
        .catch(error => {
            console.error('Erro ao buscar subjects:', error);
        });
    }

    // Fetch subjects criados pelo usuário logado
    function fetchUserSubjects() {
        fetch('/subjects/user', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            sidebarSubjects.innerHTML = ''; // Limpa a barra lateral
            data.forEach(subject => {
                addSubjectToList(subject, sidebarSubjects); // Adiciona à barra lateral
            });
        })
        .catch(error => {
            console.error('Erro ao buscar subjects do usuário:', error);
        });
    }

    // Fetch dados do usuário logado
    function fetchUserProfile() {
        fetch('/auth/profile', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            usernameDisplay.textContent = data.username || 'Usuário';
        })
        .catch(error => {
            console.error('Erro ao buscar dados do usuário:', error);
        });
    }

    // Logout
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });

    // Submeter o formulário de criação de subject
    subjectForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        fetch('/subjects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description })
        })
        .then(response => response.json())
        .then(data => {
            addSubjectToList(data, subjectList);
            message.textContent = 'Subject criado com sucesso!';
            message.style.color = '#00c853';
            subjectForm.reset();
        })
        .catch(error => {
            console.error('Erro ao criar subject:', error);
            message.textContent = 'Erro ao criar subject.';
            message.style.color = '#cf6679';
        });
    });

    // Carregar subjects e dados do usuário ao carregar a página
    fetchAllSubjects();
    fetchUserSubjects();
    fetchUserProfile();
});
