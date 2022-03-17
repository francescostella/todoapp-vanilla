export default class Todo {
  constructor(id, value) {
    this.id = id
    this.value = value.trim();
    this.completed = false;
  }

  toggleState() {
    this.completed = !this.completed;
  }

  is(id) {
    return this.id === id;
  }

  setValue(value) {
    this.value = value.trim();
  }
}