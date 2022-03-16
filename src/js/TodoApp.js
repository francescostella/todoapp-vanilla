import TodoService from './TodoService';
import TodoTemplate from './TodoTemplate';

export default class TodoApp {
  constructor() {
    this.todoService = new TodoService();
    this.$todoList = document.querySelector('.list');
    this.$newTodoInput = document.querySelector('.add-form__input');
    this.$addButton = document.querySelector('.add-form__button');

    this.renderTodos();
    this.bind();
  }

  init() {
    console.log('HEY HEY HEY');
  }

  bind() {
    this.$addButton.addEventListener('click', event => {
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