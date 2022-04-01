import Todo from './Todo';

/**
 * Utilities
 */
let _lastId = 0;

function generateTodoID() {
  return _lastId += 1;
}

/**
 *  TodoService
 *  service delegated to add, count, clear and get all Todos
 */
export default class TodoService {
  _todos = [];

  /**
   * Create a TodoService
   * if `todos` param is passed, it will be initialized 
   * with the items passed in it.
   * @constructor
   * @param {Todo[]} todos - List of todos
   */
  constructor(todos) {
    if (todos) {
      todos.forEach(todo => this.add(todo));
    }
  }

  /**
   * Checks if the todos list is empty
   * @returns {boolean} true if todos list is empty
   */
  isEmpty() {
    return this._todos.length === 0;
  }

  /**
   * Add a todo
   * @param {string} value - will be used as value of the new Todo
   */
  add(value) {
    let newTodo = new Todo(generateTodoID(), value)
    this._todos.unshift(newTodo);
  }

  /**
   * Delete a todo by id
   * @param {string} id - matching the todo to delete
   * @returns {Todo} deleted Todo
   */
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

  /**
   * Get the todo matching the id passed
   * @param {string} id - matching the todo that will be returned
   * @returns {Todo} return a single todo
   */
  getTodoByID(id) {
    return this._todos.find(todo => todo.id === parseInt(id));
  }

  /**
   * Get the count of the different todos states.
   * @returns {{
   *  active: number,
   *  completed: number,
   *  total: number
   * }} an object with `active`, `completed`, and `total` todos
   */
  getCountTodos() {
    const counters = {
      active: 0,
      completed: 0,
      total: 0,
    };

    this._todos.forEach(todo => {
      if (todo.completed) {
        counters.completed++;
      } else {
        counters.active++;
      }

      counters.total++;
    });

    return counters;
  }

  /**
   * Clear all the todos marked as 'completed'
   */
  clearCompleted() {
    this._todos = this._todos.filter(todo => !todo.completed);
  }

  /**
   * Move the todo matching the `id` passed as 
   * first element of the `todos` list
   * @param {string} id - matching the todo to move
   */
  moveToTop(id) {
    const index = this._todos.findIndex(todo => todo.id === id);

    if (index >= 0) {
      const removeTodo = this._todos.splice(index, 1);
      this._todos.unshift(...removeTodo);
    }
  }
}