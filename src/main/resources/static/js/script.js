
function showLoginPage() {
    window.location.href = 'auth.html';
    console.log("Redirecionando para a página de login");
}

function showRegisterPage() {
    window.location.href = 'auth.html';
    console.log("Redirecionando para a página de registro");
}

function showProjectManagement() {
    document.getElementById('welcome-page').style.display = 'none';
    document.getElementById('project-management').style.display = 'block';
    renderProjects();
}

function renderProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            `;
        projectList.appendChild(projectCard);
    });
}

document.getElementById('new-project-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('project-title').value;
    const description = document.getElementById('project-description').value;
    const newProject = {
        id: projects.length + 1,
        title: title,
        description: description
    };
    projects.push(newProject);
    renderProjects();
    this.reset();
});

// Uncomment the line below to show the project management page by default
// showProjectManagement();
