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
            projectsContainer.appendChild(projectItem);
        });
    }

    renderTodos() {
        const todosContainer = document.querySelector('todosContainer');
        todosContainer.textContent = "";

        const activeProject = this.projectManager.getActiveProject();
        if(activeProject) {
            const todos =  activeProject.todos;

            const projectTitle = document.querySelector('.todos h2');
            projectTitle.textContent = `${activeProject.name} Todos`;

            todos.forEach(todo => {
                const todoItem = document.createElement('div');
                todoItem.classList.add('todo-item', this.getTodoPriority(todo.priority));

                const title = document.createElement('p');
                title.textContent = todo.title;

                const description = document.createElement('p');
                description.textContent = todo.description;

                const dueDate = document.createElement('p');
                dueDate.textContent = `Due: ${todo.dueDate}`;

                const priority = document.createElement('p');
                priority.textContent = `Priority: ${todo.priority}`;


                const buttonDiv = document.createElement('div');
                buttonDiv.classList.add('button-div');

                const statusBtn = document.createElement('button');
                statusBtn.textContent = todo.completed
                    ? "Mark Incomplete"
                    : "Mark Complete";
                statusBtn.addEventListener('click', () => {
                    todo.toggleComplete();
                    this.renderTodos();
                });
                
                const editBtn = document.createElement('button');
                editBtn.textContent = "Edit";
                editBtn.addEventListener('click', (todo, index) => {
                    editTodoModal(todo, index);
                })

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = "Delete";
                deleteBtn.addEventListener('click', () => {
                    const activeProject = this.getActiveProject();
                    activeProject.deleteTodo(todo.id);
                });

                buttonDiv.append(statusBtn, deleteBtn)
            })
        }
    }

    getTodoPriority(priority) {
        switch(priority) {
            case 'high': return 'high';
            case 'medium': return 'medium';
            case 'low': return 'low';
            default: return '';
        }
    }

    openTodoModal() {
        const modal = document.querySelector('#todo-modal');
        modal.computedStyleMap.display = 'block';
    }

    closeTodoModal() {
        const modal = document.querySelector('#todo-modal');
        modal.computedStyleMap.display = 'none';
    }

    editTodoModal() {
        document.querySelector('#title').value = todo.title;
        document.querySelector('#description').value = todo.description;
        document.querySelector('#dueDate').value = todo.dueDate;
        document.querySelector('#priority').value = todo.priority;
        document.querySelector('#notes').value = todo.notes;
        
        document.querySelector('#todo-modal').setAttribute('data-edit-index', index);
        openTodoModal();
    }

    clearTodoModal() {
        document.querySelector('#title').value = "";
        document.querySelector('#description').value = "";
        document.querySelector('#dueDate').value = "";
        document.querySelector('#priority').value = "";
        document.querySelector('#notes').value = "";
        
        document.querySelector('#todo-modal').setAttribute('data-edit-index', index);
    }

    openProjectModal() {
        const modal = document.querySelector('#project-modal');
        modal.computedStyleMap.display = 'block';
    }

    closeProjectModal() {
        const modal = document.querySelector('#project-modal');
        modal.computedStyleMap.display = 'none';
    }

    saveTodo() {
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;
        const dueDate = document.querySelector('#dueDate').value;
        const priority = document.querySelector('#priority').value;
        const notes = document.querySelector('#notes').value;

        const index = document.querySelector('#todo-modal').getAttribute('data-edit-index');

        if(index === null) {
            const newTodo = new Todo(title, description,dueDate,priority,notes);
            this.projectManager.addTodoToProject(newTodo);
        } else {
            const todoToEdit = activeProject.todos[index];
            todoToEdit.title = title;
            todoToEdit.description = description;
            todoToEdit.dueDate = dueDate;
            todoToEdit.priority = priority;
            todoToEdit.notes = notes;
        }
        this.renderTodos();
        this.closeTodoModal()
        this.clearTodoModal();
    }
    
    saveProject() {
        this.projectManager.addProject(projectName);
        this.renderProjects();
        this.closeProjectModal();
    }
    
    eventListeners() {
        const addTodoBtn = document.querySelector('#addTodo');
        addTodoBtn.addEventListener('click', this.openTodoModal());

        const closeTodoModalBtn = document.querySelector('#closeTodoModal');
        closeTodoModalBtn.addEventListener('click', this.closeTodoModal());

        const saveTodoBtn = document.querySelector('#saveTodo');
        saveTodoBtn.addEventListener('click',this.saveTodo());

        const addProjectBtn = document.querySelector('#addProject');
        addProjectBtn.addEventListener('click', this.openProjectModal());

        const closeProjectModalBtn = document.querySelector('#closeProjectModal');
        closeProjectModalBtn.addEventListener('click', this.closeProjectModal());

        const saveProjectBtn = document.querySelector('#saveProject');
        saveProjectBtn.addEventListener('click', this.saveProject());
    }
    
}

export default ProjectUI;