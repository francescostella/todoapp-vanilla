import Todo from './Todo';

let _lastId = 0;

function generateTodoID() {
  return _lastId += 1;
}
export default class TodoService {
  constructor() {
    this.todos = [];
  }

  add(value) {
    let newTodo = new Todo(generateTodoID(), value)
    this.todos.push(newTodo);
  }

  delete(id) {
    let todoToRemove;

    this.todos = this.todos.filter(todo => {
      if (todo.id !== parseInt(id)) {
        todoToRemove = todo;
        return true;
      }

      return false;
    });

    return todoToRemove;
  }

  getTodoByID(id) {
    return this.todos.find(todo => todo.id === parseInt(id));
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  isEmpty() {
    return this.todos.length === 0;
  }

  moveToTop(id) {
    console.log(`🚀 ~ TodoService ~ moveToTop ~ id`, id)
    const index = this.todos.findIndex(todo => todo.id === id);
    console.log(`🚀 ~ TodoService ~ moveToTop ~ index`, index)

    if (index >= 0) {
      const removeTodo = this.todos.splice(index, 1);
      console.log(`🚀 ~ TodoService ~ moveToTop ~ removeTodo`, removeTodo)
      this.todos.unshift(...removeTodo);
    }
  }

  getCountTodos() {
    const todos = {
      active: 0,
      completed: 0,
      total: 0,
    };

    this.todos.forEach(todo => {
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