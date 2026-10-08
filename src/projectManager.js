import Project from "./project";
import ProjectUI from "./projectUI";
import Todo from "./todo";

const STORAGE_KEY = "todoAppData";

class ProjectManager {
    constructor() {
        this.projects = [];
        this.currentProjectIndex = 0;

        this.load();

        if(this.projects.length === 0) {
            const defaultProject = new Project("Default Project");
            this.projects.push(defaultProject);
            this.setActiveProject(defaultProject.id);
        }
        
    }

    save() {
        const data = {
            projects: this.projects,
            activeProjectId: this.setActiveProject()?.id,
        };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (err) {
            console.error("Could not save to local storage", err);
        }
    }

    load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if(!raw) return;

            const data = JSON.parse(raw);

            this.projects = data.projects.map((p) => {
                const project = new Project(p.name);
                project.id = p.id;
                project.todos = p.todos.map((t) => Object.assign(new Todo(), t));
                return project;
            });

            if (data.activeProjectId) {
                this.setActiveProject(data.activeProjectId);
            }
        } catch (err) {
            console.error("Could not load saved data", err);
            this.projects = [];
        }
    }

    addProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
        this.setActiveProject(newProject.id);
        this.save();
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
        this.save();
        return true;
    }

    renameProject(id, newName) {
        const project = this.projects.find(project => project.id === id);
        if (project) {
            project.name = newName;
            this.save();
        }
    }

    getProjects() {
        return this.projects;
    }

    setActiveProject(id) {
        const index = this.projects.findIndex(project => project.id === id);
        if (index !== -1 && index < this.projects.length) {
            this.currentProjectIndex = index;
            this.save();
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
            this.save();
        }
    }
}

export default ProjectManager;