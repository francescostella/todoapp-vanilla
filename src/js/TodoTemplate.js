export default function TodoTemplate(todo) {
  const template = document.getElementById('template--todo-item');
  const $todoItem = template.content.cloneNode(true);

  if (todo.completed) {
    $todoItem.querySelector('.list__item').classList.add('list__item--completed');
    $todoItem.querySelector('.list__checkbox').setAttribute('checked', true)
  } else {
    $todoItem.querySelector('.list__checkbox').removeAttribute('checked')
  }

  $todoItem.querySelector('.list__description--view').textContent = todo.value;
  $todoItem.querySelector('.list__description--edit').value = todo.value;
  $todoItem.querySelector('.list__item').setAttribute('data-todo-id', todo.id);

  return $todoItem;
}