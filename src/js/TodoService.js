export default class TodoService {
  constructor() {
    this.todos = [];
  }

  addTodo(item) {
    this.todos.push(item);
  }

  deleteTodo(item) {
    this.todos = this.todos.filter(todo => todo !== item)
  }

  getCountTodos() {
    const todos = {
      completed: 0
    }
  }
}