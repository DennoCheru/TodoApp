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

    static today() {
        const d = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    }

    isOverdue() {
        if (this.completed || !this.dueDate) return;
        return this.dueDate < Todo.today();
    }
}

export default Todo;