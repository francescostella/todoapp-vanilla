import TodoService from './TodoService';
import TodoTemplate from './TodoTemplate';

export default class TodoApp {
  constructor() {}

  init() {
    // Get HTML element references
    this.todoService = new TodoService();
    this.$todoList = document.querySelector('.list');
    this.$newTodoInput = document.querySelector('.add-form__input');
    this.$addForm = document.querySelector('.add-form');

    // Initialization sequence
    this.renderTodos();
    this.bind();
  }

  bind() {
    this.$addForm.addEventListener('submit', event => {
      event.preventDefault();

      const newValue = this.$newTodoInput.value;

      if (newValue) {
        this.todoService.add(this.$newTodoInput.value);
        this.renderTodos();
        this.$newTodoInput.value = '';
      }
    });
  }

  renderTodos() {
    if (this.todoService.isEmpty()) {
      this.$todoList.innerHTML = '<p>No todos.</p>';
      return;
    }

    this.$todoList.innerHTML = '';

    this.todoService.todos.forEach(todo => {
      this.$todoList.appendChild(TodoTemplate(todo));
    });
  }
}