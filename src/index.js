import ProjectManager from "./projectManager";
import ProjectUI from "./projectUI";

const projectManager = new ProjectManager();

const projectUI = new ProjectUI(projectManager);

projectUI.renderProjects();
