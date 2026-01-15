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
}

export default ProjectUI;