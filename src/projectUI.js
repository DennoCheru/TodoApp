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
}

export default ProjectUI;