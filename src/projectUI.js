class ProjectUI {
    constructor(projectManager) {
        this.projectManager = projectManager;
    }

    renderProjects() {
        const projectsContainer = document.querySelector('#projectsContainer');
        projectsContainer.textContent = "";

        const projects = this.projectManager.getProjects();
        projects.forEach(project => {
            const projectItem = document.createElement('div');
            const projectName = document.createElement('span');
            projectName.textContent = project.name;

            const activeProject = this.projectManager.getActiveProject();
            if(activeProject.id === project.id) {
                projectItem.classList.add('active');
            }

            projectName.addEventListener('click', () => {
                this.projectManager.setActiveProject(project.id);
                this.renderProjects();
                this.renderTodos();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener('click', () => {
                this.projectManager.deleteProject(project.id);
            });

            projectItem.append(projectName, deleteBtn);
            projectItem.appendChild(projectItem);
        });
    }
}