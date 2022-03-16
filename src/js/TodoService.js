export default class TodoService {
  constructor() {
    this.todos = [];
  }

  add(value) {
    this.todos.push({
      value,
      completed: false
    });
  }

  delete(item) {
    this.todos = this.todos.filter(todo => todo !== item);
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  isEmpty() {
    return this.todos.length === 0;
  }

  getCountTodos() {
    const todos = {
      total: 0,
      completed: 0
    };

    this.todos.forEach(todo => {
      if (todo.completed) {
        todos.completed++
      }

      todo.total++
    });

    return todos;
  }
}