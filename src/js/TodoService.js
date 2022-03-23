import Todo from './Todo';

let _lastId = 0;

function generateTodoID() {
  return _lastId += 1;
}
export default class TodoService {
  _todos = [];

  constructor(todos) {
    if (todos) {
      todos.forEach(todo => this.add(todo));
    }
  }

  add(value) {
    let newTodo = new Todo(generateTodoID(), value)
    this._todos.unshift(newTodo);
  }

  delete(id) {
    let todoToRemove;

    this._todos = this._todos.filter(todo => {
      if (todo.id !== parseInt(id)) {
        todoToRemove = todo;
        return true;
      }

      return false;
    });

    return todoToRemove;
  }

  getTodoByID(id) {
    return this._todos.find(todo => todo.id === parseInt(id));
  }

  clearCompleted() {
    this._todos = this._todos.filter(todo => !todo.completed);
  }

  isEmpty() {
    return this._todos.length === 0;
  }

  moveToTop(id) {
    const index = this._todos.findIndex(todo => todo.id === id);

    if (index >= 0) {
      const removeTodo = this._todos.splice(index, 1);
      this._todos.unshift(...removeTodo);
    }
  }

  getCountTodos() {
    const todos = {
      active: 0,
      completed: 0,
      total: 0,
    };

    this._todos.forEach(todo => {
      if (todo.completed) {
        todos.completed++;
      } else {
        todos.active++;
      }

      todos.total++;
    });

    return todos;
  }
}