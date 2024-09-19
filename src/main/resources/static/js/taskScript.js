document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const message = document.getElementById('message');

    // Função para adicionar uma tarefa à lista na página
    function addTaskToList(task) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <small>ID da Matéria: ${task.subjectId}</small>
            <button onclick="toggleComplete('${task.id}', ${task.completed})">
                ${task.completed ? 'Marcar como Não Concluída' : 'Marcar como Concluída'}
            </button>
        `;
        if (task.completed) {
            taskElement.classList.add('completed');
        }
        taskList.appendChild(taskElement);
    }

    // Fetch inicial das tarefas existentes
    function fetchTasks() {
        fetch('/tasks', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Substitua pelo token de autenticação
            }
        })
            .then(response => response.json())
            .then(data => {
                data._embedded.tasks.forEach(task => { // Note que a estrutura de dados pode envolver "_embedded"
                    addTaskToList(task);
                });
            })
            .catch(error => {
                console.error('Erro ao buscar tarefas:', error);
            });
    }

    // Ao submeter o formulário
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const subjectId = document.getElementById('subjectId').value;

        // Fazer a requisição para criar a tarefa
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Substitua pelo token de autenticação
            },
            body: JSON.stringify({ title, description, subjectId, completed: false })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Subject not found');
                }
            })
            .then(data => {
                addTaskToList(data); // Adiciona a tarefa recém-criada à lista
                message.textContent = 'Tarefa criada com sucesso!';
                message.style.color = '#00c853'; // Verde para sucesso
                taskForm.reset();
            })
            .catch(error => {
                console.error('Erro ao criar tarefa:', error);
                message.textContent = error.message;
                message.style.color = '#cf6679'; // Vermelho para erro
            });
    });

    // Função para alternar o status de conclusão de uma tarefa
    window.toggleComplete = function(id, completed) {
        fetch(`/tasks/${id}`, {
            method: 'PATCH', // Use PATCH para atualizar parcialmente
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Substitua pelo token de autenticação
            },
            body: JSON.stringify({ completed: !completed })
        })
            .then(response => response.json())
            .then(data => {
                document.querySelector(`.task[data-id='${id}']`).classList.toggle('completed');
                message.textContent = 'Status da tarefa atualizado!';
                message.style.color = '#00c853'; // Verde para sucesso
            })
            .catch(error => {
                console.error('Erro ao atualizar status da tarefa:', error);
                message.textContent = 'Erro ao atualizar status.';
                message.style.color = '#cf6679'; // Vermelho para erro
            });
    }

    // Carregar tarefas ao carregar a página
    fetchTasks();
});
