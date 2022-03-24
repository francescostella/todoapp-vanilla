import TodoService from './TodoService';
import TodoTemplate from './TodoTemplate';

export default class TodoApp {
  constructor(element, todos) {
    this.todoService = new TodoService(todos);
    this.initialize(element);
  }

  initialize(element) {
    // Get HTML element references
    this.$todoList = element.querySelector('.list');
    this.$newTodoInput = element.querySelector('.add-form__input');
    this.$addForm = element.querySelector('.add-form');
    this.$buttonClear = element.querySelector('.add-form__button--clear');
    this.$infoLeft = element.querySelector('.info__left');
    this.$themeToggle = element.querySelector('.theme-toggle__button');

    // Initialization sequence
    this.detectThemeColor();
    this.render();
    this.bind();
  }

  bind() {
    this.$themeToggle.addEventListener('click', event => {
      if (document.documentElement.classList.contains('dark-theme')) {
        document.documentElement.classList.remove('dark-theme');
      } else {
        document.documentElement.classList.add('dark-theme');
      }
    });

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

    // Bind `click` for the Clear Completed button
    this.$buttonClear.addEventListener('click', event => {
      this.todoService.clearCompleted();
      this.render();
    });

    document.addEventListener('blur', event => {
      if (!event.target.matches('.list__description--edit')) {
        return false;
      }

      const $elementTodoItem = event.target.closest('.list__item');
      const selectedID = $elementTodoItem.getAttribute('data-todo-id');
      const todo = this.todoService.getTodoByID(selectedID);
      todo.setValue(event.target.value)
      this.render();
    }, true);

    document.addEventListener('keydown', event => {
      if (!event.target.matches('.list__description--edit')) {
        return false;
      }

      if (event.code === 'Escape' || event.code === 'Enter') {
        const $elementTodoItem = event.target.closest('.list__item');
        $elementTodoItem.classList.toggle('list__item--edit');
        $elementTodoItem.querySelector('.list__description--edit').blur();
      }
    }, true);

    // Bind `click` event for Todo item
    this.$todoList.addEventListener('click', event => {
      if (
        !event.target.matches('.list__checkbox') &&
        !event.target.matches('.list__button') &&
        !event.target.matches('.list__info')
      ) {
        return false;
      }

      const $elementTodoItem = event.target.closest('.list__item');
      const selectedID = parseInt($elementTodoItem.getAttribute('data-todo-id'));
      const todo = this.todoService.getTodoByID(selectedID);

      // Toggle completed state on each Todo
      if (event.target.matches('.list__checkbox')) {
        todo.toggleCompleted();
        this.render();
      }

      // Fav Todos
      if (event.target.matches('.list__button--fav')) {
        $elementTodoItem.classList.remove('list__item--show');
        $elementTodoItem.classList.toggle('list__item--fav');
        todo.toggleFavorite();
        this.todoService.moveToTop(selectedID)
        this.render();
      }

      // Edit Todos
      if (event.target.matches('.list__button--edit')) {
        $elementTodoItem.classList.remove('list__item--show');
        $elementTodoItem.classList.toggle('list__item--edit');
      }

      // Delete Todos
      if (event.target.matches('.list__button--delete')) {
        $elementTodoItem.classList.remove('list__item--show');
        $elementTodoItem.classList.add('list__item--delete');
        $elementTodoItem.addEventListener('animationend', () => {
          $elementTodoItem.remove();
          this.todoService.delete(selectedID);
          this.render();
        });
      }

      // Show buttons if clicked on info button
      if (event.target.matches('.list__info')) {
        $elementTodoItem.classList.toggle('list__item--show');
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

    this.todoService._todos.forEach(todo => {
      this.$todoList.appendChild(TodoTemplate(todo));
    });
  }

  renderInfo() {
    const activeTodos = this.todoService.getCountTodos().active;
    this.$infoLeft.textContent = `${activeTodos} left${activeTodos > 1 ? `s` : ``}`; 
  }

  detectThemeColor() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    if (prefersDarkScheme.matches) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }
}