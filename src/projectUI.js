import Todo from "./todo";

import editIcon from "./icons/edit.svg";
import deleteIcon from "./icons/delete.svg";

class ProjectUI {
    constructor(projectManager) {
        this.projectManager = projectManager;
        this.editingTodoId = null;
        this.editingProjectId = null;
    }

    renderProjects() {
        const projectsContainer = document.querySelector('#projects');
        projectsContainer.textContent = "";

        const projects = this.projectManager.getProjects();
        projects.forEach((project) => {
            const projectItem = document.createElement('li');

            const projectName = document.createElement('span');
            projectName.textContent = project.name;

            const actions = document.createElement('span');
            actions.classList.add('projectActions');

            const editBtn = document.createElement('button');
            editBtn.innerHTML = editIcon;
            editBtn.title = 'Edit Project'
            editBtn.setAttribute('aria-label', `Edit ${project.name}`);

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = deleteIcon;
            deleteBtn.title = 'Delete Project';
            deleteBtn.setAttribute('aria-label', `Delete ${project.name}`);

            actions.append(editBtn, deleteBtn)
            projectItem.append(projectName, actions)

            if (project.id === this.projectManager.getActiveProject().id) {
                projectName.classList.add('active');
            }

            projectItem.addEventListener('click', () => {
                this.projectManager.setActiveProject(project.id);
                this.renderProjects();
                this.renderTodos();
            });

            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editingProjectId = project.id;
                document.querySelector('#projectModalTitle').textContent = "Edit Project";
                document.querySelector('#projectName').value = project.name;
                document.querySelector('#addProjectModal').showModal();
            });

            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if(this.projectManager.getProjects().length === 1) {
                    alert("You can't delete the last project.");
                    return;
                }
                if (confirm(`Delete "${project.name}" and all its Todos?`)) {
                    this.projectManager.deleteProject(project.id);
                    this.renderProjects();
                    this.renderTodos();
                }
            });

            projectsContainer.appendChild(projectItem);
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
            todoCard.classList.add('card');
            todoCard.classList.add(`priority-${todo.priority}`);
            const todoTitle = document.createElement('h2');
            todoTitle.textContent = todo.title;
            const todoDueDate = document.createElement('p');
            todoDueDate.textContent = todo.dueDate;
            const buttonsDiv = document.createElement('div');
            buttonsDiv.classList.add('buttonDiv');
            const toggleCompleteBtn = document.createElement('button');
            toggleCompleteBtn.textContent = todo.completed ? "Mark Incomplete" : "Mark Complete";
            const editBtn = document.createElement('button');
            editBtn.textContent = "Edit";
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Delete";

            buttonsDiv.append(toggleCompleteBtn, editBtn, deleteBtn);

            todoCard.append(todoTitle, todoDueDate, buttonsDiv);

            todosContainer.appendChild(todoCard);

            toggleCompleteBtn.addEventListener('click', () => {
                todo.completed = !todo.completed;
                this.renderTodos();
            });

            editBtn.addEventListener('click', () => {
                this.editingTodoId = todo.id;
                const editTodoModal = document.querySelector('#addTodoModal');
                document.querySelector('#todoModalTitle').textContent = "Edit Todo";
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

    eventListeners() {
        const addProjectBtn = document.querySelector('#addProject');
        const addProjectModal = document.querySelector('#addProjectModal');
        const addProjectForm = document.querySelector('#addProjectForm');

        addProjectBtn.addEventListener('click', () => {
            this.editingProjectId = null;
            addProjectForm.reset();
            document.querySelector('#projectModalTitle').textContent = "Add Project"
            addProjectModal.showModal();
        });

        addProjectForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.querySelector('#projectName').value.trim();
            if (!name) return;
            if (this.editingProjectId === null) {
                this.projectManager.addProject(name);
            } else {
                this.projectManager.renameProject(this.editingProjectId, name)
            }
            
            this.editingProjectId = null;
            addProjectForm.reset();
            addProjectModal.close();
            this.renderProjects();
            this.renderTodos();
        });

        const addTodoBtn = document.querySelector('#addTodo');
        const addTodoModal = document.querySelector('#addTodoModal');
        const addTodoForm = document.querySelector('#addTodoForm');

        addTodoBtn.addEventListener('click', () => {   
            document.querySelector('#todoModalTitle').textContent = "Add Todo";         
            this.editingTodoId = null;
            addTodoModal.showModal();
        });

        addTodoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const todoData = {
                title: document.querySelector('#todoTitle').value,
                description: document.querySelector('#todoDescription').value,
                dueDate: document.querySelector('#todoDueDate').value,
                priority: document.querySelector('#todoPriority').value,
                notes: document.querySelector('#todoNotes').value,
            }

            if (this.editingTodoId === null) {
                const todo = new Todo(
                    todoData.title,
                    todoData.description,
                    todoData.dueDate,
                    todoData.priority,
                    todoData.notes
                )
                this.projectManager.addTodoToProject(todo);
            } else {
                const activeProject = this.projectManager.getActiveProject();
                const todo = activeProject.todos.find(t => t.id === this.editingTodoId);
                if (todo) {
                    Object.assign(todo, todoData);
                }
            }

            this.editingTodoId = null;
            addTodoForm.reset();
            addTodoModal.close();
            this.renderTodos();
        });
    }
    
}

export default ProjectUI;