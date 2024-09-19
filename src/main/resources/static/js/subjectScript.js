document.addEventListener('DOMContentLoaded', function() {
    const subjectForm = document.getElementById('subjectForm');
    const subjectList = document.getElementById('subjectList');
    const message = document.getElementById('message');

    // Função para adicionar um subject à lista na página
    function addSubjectToList(subject) {
        const subjectElement = document.createElement('div');
        subjectElement.classList.add('subject');
        subjectElement.innerHTML = `
            <h3>${subject.title}</h3>
            <p>${subject.description}</p>
            <small>ID do Subject: ${subject.id}</small>
        `;
        subjectList.appendChild(subjectElement);
    }

    // Fetch inicial dos subjects existentes
    function fetchSubjects() {
        fetch('/subjects', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Substitua pelo token de autenticação
            }
        })
            .then(response => response.json())
            .then(data => {
                data.forEach(subject => {
                    addSubjectToList(subject);
                });
            })
            .catch(error => {
                console.error('Erro ao buscar subjects:', error);
            });
    }

    // Ao submeter o formulário
    subjectForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        // Fazer a requisição para criar o subject
        fetch('/subjects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Substitua pelo token de autenticação
            },
            body: JSON.stringify({ title, description })
        })
            .then(response => response.json())
            .then(data => {
                addSubjectToList(data); // Adiciona o subject recém-criado à lista
                message.textContent = 'Subject criado com sucesso!';
                message.style.color = '#00c853'; // Verde para sucesso
                subjectForm.reset();
            })
            .catch(error => {
                console.error('Erro ao criar subject:', error);
                message.textContent = 'Erro ao criar subject.';
                message.style.color = '#cf6679'; // Vermelho para erro
            });
    });

    // Carregar subjects ao carregar a página
    fetchSubjects();
});
