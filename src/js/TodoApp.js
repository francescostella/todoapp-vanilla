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

    // Dev
    this.setupSample();

    // Initialization sequence
    this.render();
    this.bind();
  }

  setupSample() {
    const samples = [
      'Clean the batcave',
      'Pick up cape from drycleaning',
      'Clean Daily Planet desk',
    ];

    samples.forEach(item => {
      this.todoService.add(item);
    });
  }

  bind() {
    // Bind `submit` for the AddForm input field
    this.$addForm.addEventListener('submit', event => {
      event.preventDefault();

      const newValue = this.$newTodoInput.value;

      if (newValue) {
        this.todoService.add(this.$newTodoInput.value);
        this.render();
        this.$newTodoInput.value = '';
      }
    });

    // Bind `focus` and `blur` events for each
    // Todo item edit input text field
    document.addEventListener('focus', event => {
      if (!event.target.matches('.list__description--edit')) {
        return false;
      }
      // Set input text field background color
      event.target.style.background = 'aliceblue';
    }, true);

    document.addEventListener('blur', event => {
      if (!event.target.matches('.list__description--edit')) {
        return false;
      }

      // Remove input text field background color
      event.target.style.background = '';

      const $elementTodoItem = event.target.closest('.list__item');
      const selectedID = $elementTodoItem.getAttribute('data-todo-id');
      const todo = this.todoService.getTodoByID(selectedID);
      todo.setValue(event.target.value)
      this.render();
    }, true);

    // Bind `click` event for Todo item
    this.$todoList.addEventListener('click', event => {
      if (
        !event.target.matches('.list__checkbox') &&
        !event.target.matches('.list__button')
      ) {
        return false;
      }

      const $elementTodoItem = event.target.closest('.list__item');
      const selectedID = $elementTodoItem.getAttribute('data-todo-id');
      const todo = this.todoService.getTodoByID(selectedID);

      // Toggle completed state on each Todo
      if (event.target.matches('.list__checkbox')) {
        todo.toggleCompleted();
        this.render();
      }

      // Delete Todos
      if (event.target.matches('.list__button--delete')) {
        this.todoService.delete(selectedID);
        this.render();
      }

      // Edit Todos
      if (event.target.matches('.list__button--edit')) {
        $elementTodoItem.classList.toggle('list__item--edit')
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