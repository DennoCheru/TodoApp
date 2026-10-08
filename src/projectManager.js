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
        const index = this.projects.findIndex(project => project.id === id);

        if (index !== -1) {
            this.projects.splice(index, 1);
        } else if(this.projects.length === 1){
            alert("Error! Can not delete the last Project");
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