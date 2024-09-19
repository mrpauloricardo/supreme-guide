document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comment-list');
    const message = document.getElementById('message');

    function addCommentToList(comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment-card';
        commentElement.innerHTML = `
            <p><strong>Assunto ID:</strong> ${comment.subjectId}</p>
            <p>${comment.content}</p>
        `;
        commentList.appendChild(commentElement);
    }

    function fetchComments() {
        fetch('/comments', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Substitua pelo token de autenticação
            }
        })
            .then(response => response.json())
            .then(data => {
                data._embedded.comments.forEach(comment => {
                    addCommentToList(comment);
                });
            })
            .catch(error => {
                console.error('Erro ao buscar comentários:', error);
            });
    }

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const subjectId = document.getElementById('subjectId').value;
        const content = document.getElementById('content').value;

        fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Substitua pelo token de autenticação
            },
            body: JSON.stringify({ subjectId, content, userId: 'current-user-id' }) // Substitua 'current-user-id' pelo ID do usuário atual
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Subject not found');
                }
            })
            .then(data => {
                addCommentToList(data);
                message.textContent = 'Comentário adicionado com sucesso!';
                message.style.color = '#00c853'; // Verde para sucesso
                commentForm.reset();
            })
            .catch(error => {
                console.error('Erro ao adicionar comentário:', error);
                message.textContent = error.message;
                message.style.color = '#cf6679'; // Vermelho para erro
            });
    });

    // Carregar comentários ao carregar a página
    fetchComments();
});
