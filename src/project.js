class Project {
    constructor(name) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo)
    }

    deleteTodo(id) {
        const index = this.todos.findIndex(todo => todo.id === id);

        if(index !==-1) {
            this.todos.splice(index, 1);
        }
    }
}

export default Project;