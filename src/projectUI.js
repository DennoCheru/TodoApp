import ProjectManager from "./projectManager";

class ProjectUI {
    constructor() {
        this.projectManager = new ProjectManager();
    }

    renderProjects() {
        const projectsContainer = document.querySelector('#projects');
        projectsContainer.textContent = "";

        const projects = this.projectManager.getProjects();
        projects.forEach((project) => {
            const projectName = document.createElement('li');
            projectName.textContent = project.name;

            projectsContainer.appendChild(projectName);
        });
    }

    renderTodos() {
        const todosContainer = document.querySelector('#todos');
        todosContainer.textContent = "";

        const activeProject = this.projectManager.getActiveProject();
        const todos = activeProject.todos;
        todos.forEach((todo) => {
            const todoCard = document.createElement('div');
            todoCard.textContent = todo.name;

        });
    }

    addEventListeners() {
        const addProjectBtn = document.querySelector('#addProject');
        const addProjectModal = document.querySelector('#addProjectModal');
        const addProjectForm = document.querySelector('#addProjectForm')
        addProjectBtn.addEventListener('click', () => {
            addProjectModal.showModal();

        });

        const saveProjectBtn = document.querySelector('#saveProject');
        saveProjectBtn.addEventListener('click', () => {
            const projectName = document.querySelector('#projectName');
            this.projectManager.addProject(projectName.value);
            addProjectForm.reset();
            addProjectModal.close();
            this.renderProjects();
        });
    }
    
}

export default ProjectUI;