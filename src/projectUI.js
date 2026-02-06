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
        })   
    }
}

export default ProjectUI;