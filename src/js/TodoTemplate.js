const ID_TODO_ITEM_TEMPLATE = 'template--todo-item';
const CLASS_COMPLETED_TODO = 'list__item--completed';
const CLASS_FAV_TODO = 'list__item--fav';
const SELECTOR_TODO_ITEM = '.list__item';
const SELECTOR_TODO_CHECKBOX = '.list__checkbox';

export default function TodoTemplate(todo) {
  const template = document.getElementById(ID_TODO_ITEM_TEMPLATE);
  const $todoItem = template.content.cloneNode(true);

  if (todo.completed) {
    $todoItem.querySelector(SELECTOR_TODO_ITEM).classList.add(CLASS_COMPLETED_TODO);
    $todoItem.querySelector(SELECTOR_TODO_CHECKBOX).setAttribute('checked', true)
  } else {
    $todoItem.querySelector(SELECTOR_TODO_CHECKBOX).removeAttribute('checked')
  }

  if (todo.favorite) {
    $todoItem.querySelector(SELECTOR_TODO_ITEM).classList.add(CLASS_FAV_TODO);
  } else {
    $todoItem.querySelector(SELECTOR_TODO_ITEM).classList.remove(CLASS_FAV_TODO);
  }

  $todoItem.querySelector('.list__description--view').textContent = todo.value;
  $todoItem.querySelector('.list__description--edit').value = todo.value;
  $todoItem.querySelector(SELECTOR_TODO_ITEM).setAttribute('data-todo-id', todo.id);

  return $todoItem;
}