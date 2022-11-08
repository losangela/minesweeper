export default class Box {
  constructor(val) {
    this.val = val;
    this.isOpen = false;
    this.isFlagged = false;
  }

  canOpen() {
    return !this.isOpen && !this.isFlagged;
  }

  openBox(override) {
    if (override || this.canOpen()) {
      this.isOpen = true;
    }
  }

  flagBox() {
    if (this.canOpen()) {
      this.isFlagged = true;
    }
  }
};