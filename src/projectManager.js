import Project from "./project";
import ProjectUI from "./projectUI";

class ProjectManager {
    constructor() {
        this.projects = [];
        this.currentProjectIndex = 0;

        const defaultProject = new Project("Default Project");
        this.projects.push(defaultProject);
        this.setActiveProject(defaultProject.id);
    }

    addProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
        this.setActiveProject(newProject.id);
    }

    deleteProject(id) {
        if (this.projects.length === 1) return false;

        const index = this.projects.findIndex(project => project.id === id);
        if (index === -1) return false;

        const wasActive = index === this.currentProjectIndex;
        this.projects.splice(index, 1);

        if (wasActive) {
            this.currentProjectIndex = Math.max(0, index -1);
        } else if (index < this.currentProjectIndex) {
            this.currentProjectIndex--;
        }
        return true;
    }

    renameProject(id, newName) {
        const project = this.projects.find(project => project.id === id);
        if (project) {
            project.name = newName;
        }
    }

    getProjects() {
        return this.projects;
    }

    setActiveProject(id) {
        const index = this.projects.findIndex(project => project.id === id);
        if (index !== -1 && index < this.projects.length) {
            this.currentProjectIndex = index;
        }
    }

    getActiveProject() {
        if (this.projects.length > 0 && this.currentProjectIndex < this.projects.length) {
            return this.projects[this.currentProjectIndex];
        }
    }

    addTodoToProject(todo) {
        const activeProject = this.getActiveProject();
        if (activeProject) {
            activeProject.addTodo(todo);
        }
    }
}

export default ProjectManager;