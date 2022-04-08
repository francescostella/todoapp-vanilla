import { default as $todoTemplate } from './TodoTemplate';

const SELECTOR_EMPTY_LIST_TEMPLATE = '#template--empty-list';
const SELECTOR_TODO_ITEM = '#template--todo-item';

export default class TodoListComponent {
  constructor(element, todoService) {
    const templateEmptyList = element.querySelector(SELECTOR_EMPTY_LIST_TEMPLATE)
    const templateTodoItem = element.querySelector(SELECTOR_TODO_ITEM);
    this.$emptyList = templateEmptyList.content.cloneNode(true);
    this.$todoItem = templateTodoItem.content.cloneNode(true);

    this.todoService = todoService;
    this.$todoList = element.querySelector('.list');
    this.bind();
  }

  bind() {
    // Bind `click` evente for each Todo item functionality
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

      const eventRender = new CustomEvent('todolist-render');

      // Toggle completed state on each Todo
      if (event.target.matches('.list__checkbox')) {
        todo.toggleCompleted();
        this.$todoList.dispatchEvent(eventRender);
      }

      // Fav Todos
      if (event.target.matches('.list__button--fav')) {
        $elementTodoItem.classList.remove('list__item--show');
        $elementTodoItem.classList.toggle('list__item--fav');
        todo.toggleFavorite();
        this.todoService.moveToTop(selectedID)
        this.$todoList.dispatchEvent(eventRender);
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
          this.$todoList.dispatchEvent(eventRender);
        });
      }

      // Show buttons if clicked on info button
      if (event.target.matches('.list__info')) {
        $elementTodoItem.classList.toggle('list__item--show');
      }
    });
  }

  render() {
    this.$todoList.innerHTML = '';

    if (this.todoService.isEmpty()) {
      this.$todoList.appendChild(this.$emptyList);
      return;
    }

    this.todoService.getAll().forEach(todo => {
      this.$todoList.appendChild(this.renderTodo(todo));
    });
  }

  renderTodo(todo) {
    return $todoTemplate(todo);
  }
}