class Todo {
    constructor(title, description, dueDate, priority, notes="") {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.notes = notes;
    }

    toggleComplete(todo) {
        this.completed = !todo.completed;
    }
}

export default Todo;