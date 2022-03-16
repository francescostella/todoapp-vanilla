export default function TodoTemplate(todo) {
  const template = document.getElementById('template--todo-item');
  const $todoItem = template.content.cloneNode(true);

  $todoItem.querySelector('.list__description').textContent = todo.value;
  return $todoItem;
}