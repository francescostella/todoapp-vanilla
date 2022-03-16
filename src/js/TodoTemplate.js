export default function TodoTemplate(todo) {
  const template = document.getElementById('template--todo-item');
  console.log(`🚀 ~ TodoTemplate ~ template`, template)

  const $todoItem = template.content.cloneNode(true);
  $todoItem.querySelector('.list__description').textContent = todo.value;
  return $todoItem;


  // const item = document.createElement('li');
  // item.classList.add('list__item');

  // const label = document.createElement('label');
  // label.classList.add('list__label');

  // const checkbox = document.createElement('input');
  // checkbox.classList.add('list__checkbox');
  // checkbox.type = 'checkbox';

  // const description = document.createElement('span');
  // description.classList.add('list__description');
  // description.textContent = todo.value;

  // const button = document.createElement('button')
  // button.classList.add('list__delete');
  // button.textContent = '❌';

  // label.appendChild(checkbox);
  // label.appendChild(description);
  // item.appendChild(label);
  // item.appendChild(button);

  // return item;
}