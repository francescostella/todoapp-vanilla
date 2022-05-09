import TodoService from './TodoService';
import TodoListComponent from './TodoListComponent';

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

    // Initialize components
    this.todoList = new TodoListComponent(element, this.todoService)

    // Initialization sequence
    this.detectThemeColor();
    this.render();
    this.bind();
  }

  bind() {
    // Listeners to handle theme changes
    this.$themeToggle.addEventListener('click', event => {
      document.documentElement.classList.toggle('dark-theme');
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

    // `blur` event to handle the store and rendering of edited Todos
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

    // Handle ESCAPE and ENTER keys when editing a Todo
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

    // Listen for TodoListComponent render event
    this.$todoList.addEventListener('todolist-render', event => {
      this.render();
    });
  }

  render() {
    this.renderTodos();
    this.renderInfo();
  }

  renderTodos() {
    const todos = this.todoService.getAll();
    this.todoList.render(todos);
  }

  renderInfo() {
    const activeTodos = this.todoService.getCountTodos().active;
    this.$infoLeft.textContent = `${activeTodos} left${activeTodos > 1 ? `s` : ``}`; 
  }

  detectThemeColor() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (prefersDarkScheme.matches) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }
}