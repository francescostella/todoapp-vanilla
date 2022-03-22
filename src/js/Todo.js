export default class Todo {
  constructor(id, value) {
    this.id = id
    this.value = value.trim();
    this.completed = false;
    this.favorite = false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
  
  toggleFavorite() {
    this.favorite = !this.favorite;
  }

  setCompleted(value) {
    if (typeof value === 'boolean') {
      this.completed = value;
    }
  }

  setValue(value) {
    this.value = value.trim();
  }
}