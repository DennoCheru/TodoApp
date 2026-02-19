import ProjectManager from "./projectManager";
import Todo from "./todo";

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

            projectName.addEventListener('click', () => {
                this.projectManager.setActiveProject(project.id);
                this.renderTodos();
            });

            projectsContainer.appendChild(projectName);
        });
    }

    renderTodos() {
        const activeProject = this.projectManager.getActiveProject();

        const title = document.querySelector('#header');
        const todosContainer = document.querySelector('#todos');

        title.textContent = `${activeProject.name}'s Todos.`        
        todosContainer.textContent = "";

        
        const todos = activeProject.todos;
        todos.forEach((todo) => {
            const todoCard = document.createElement('div');
            const todoTitle = document.createElement('h2');
            todoTitle.textContent = todo.title;
            const todoDueDate = document.createElement('p');
            todoDueDate.textContent = todo.dueDate;
            const buttonsDiv = document.createElement('div');
            const toggleCompleteBtn = document.createElement('button');
            toggleCompleteBtn.textContent = todo.completed ? "Mark Incomplete" : "Mark Complete";
            const editBtn = document.createElement('button');
            editBtn.textContent = "Edit";
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Delete";

            buttonsDiv.append(toggleCompleteBtn, editBtn, deleteBtn)

            todoCard.append(todoTitle, todoDueDate, buttonsDiv)

            todosContainer.appendChild(todoCard);

            toggleCompleteBtn.addEventListener('click', () => {
                todo.completed = !todo.completed;
                this.renderTodos();
            });

            editBtn.addEventListener('click', () => {
                const editTodoModal = document.querySelector('#addTodoModal');
                document.querySelector('#todoTitle').value = todo.title;
                document.querySelector('#todoDescription').value = todo.description;
                document.querySelector('#todoDueDate').value = todo.dueDate;
                document.querySelector('#todoPriority').value = todo.priority;
                document.querySelector('#todoNotes').value = todo.notes;                
                editTodoModal.showModal();
            });

            deleteBtn.addEventListener('click', () => {
                activeProject.deleteTodo(todo.id);
                this.renderTodos();
            });
        });
    }

    addEventListeners() {
        const addProjectBtn = document.querySelector('#addProject');
        const addProjectModal = document.querySelector('#addProjectModal');
        const addProjectForm = document.querySelector('#addProjectForm');
        const saveProjectBtn = document.querySelector('#saveProject');

        addProjectBtn.addEventListener('click', () => {
            addProjectModal.showModal();
        });

        saveProjectBtn.addEventListener('click', () => {
            const projectName = document.querySelector('#projectName');
            this.projectManager.addProject(projectName.value);
            addProjectForm.reset();
            addProjectModal.close();
            this.renderProjects();
        });

        const addTodoBtn = document.querySelector('#addTodo');
        const addTodoModal = document.querySelector('#addTodoModal');
        const addTodoForm = document.querySelector('#addTodoForm');
        const saveTodoBtn = document.querySelector('#saveTodo')

        addTodoBtn.addEventListener('click', () => {
            addTodoModal.showModal();
        });

        saveTodoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const todoTitle = document.querySelector('#todoTitle');
            const todoDescription = document.querySelector('#todoDescription');
            const todoDueDate = document.querySelector('#todoDueDate');
            const todoPriority = document.querySelector('#todoPriority');
            const todoNotes = document.querySelector('#todoNotes');

            const todo = new Todo(
                todoTitle.value,
                todoDescription.value,
                todoDueDate.value,
                todoPriority.value,
                todoNotes.value
            );

            this.projectManager.addTodoToProject(todo);
            addTodoForm.reset();
            addTodoModal.close();
            console.log(this.projectManager.getActiveProject().todos);
            this.renderTodos();
        });
    }
    
}

export default ProjectUI;