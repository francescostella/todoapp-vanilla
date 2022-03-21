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
    this.$infoLeft = document.querySelector('.info__left');

    // Initialization sequence
    this.render();
    this.bind();
  }

  bind() {
    this.$addForm.addEventListener('submit', event => {
      event.preventDefault();

      const newValue = this.$newTodoInput.value;

      if (newValue) {
        this.todoService.add(this.$newTodoInput.value);
        this.render();
        this.$newTodoInput.value = '';
      }
    });

    this.$todoList.addEventListener('click', event => {
      if (
        !event.target.matches('.list__checkbox') &&
        !event.target.matches('.list__delete')
      ) {
        return false;
      }

      const selectedID = event.target.closest('.list__item').getAttribute('data-todo-id');
      const todo = this.todoService.getTodoByID(selectedID);

      // Toggle completed state on each Todo
      if (event.target.matches('.list__checkbox')) {
        todo.toggleCompleted();
        this.render();
      }

      // Delete Todos
      if (event.target.matches('.list__delete')) {
        this.todoService.delete(selectedID);
        this.render();
      }
    });
  }

  render() {
    this.renderTodos();
    this.renderInfo();
  }

  renderTodos() {
    if (this.todoService.isEmpty()) {
      this.$todoList.innerHTML = '<p class="list__empty">No todos.</p>';
      return;
    }

    this.$todoList.innerHTML = '';

    this.todoService.todos.forEach(todo => {
      this.$todoList.appendChild(TodoTemplate(todo));
    });
  }

  renderInfo() {
    const activeTodos = this.todoService.getCountTodos().active;
    this.$infoLeft.textContent = `${activeTodos} left${activeTodos > 1 ? `s` : ``}`; 
  }
}