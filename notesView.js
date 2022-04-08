class NotesView {
  constructor(model, api) {
    this.model = model;
    this.api = api;
    this.mainContainerEl = document.querySelector("#main-container");
    this.setUpEventListeners();
  }

  setUpEventListeners() {
    this.addButton = document.querySelector("#add-button");
    this.addButton.addEventListener("click", () => {
      this.addNote();
      console.log("i've been clicked");
    });
  }

  getModel() {
    return this.model;
  }

  async addNote() {
    const inputField = document.querySelector("#message-input");
    await this.api.createNote(inputField.value, () => {});
    inputField.value = "";
    this.displayNotes();
  }

  async displayNotes() {
    const clearNotes = document.querySelectorAll(".note");
    clearNotes.forEach((note) => note.remove());

    const serverNotes = await this.api.loadNotes(() => {
      this.displayError();
    });
    this.model.setNotes(serverNotes);
    console.log(serverNotes);
    const notes = this.model.getNotes();
    console.log(notes);
    notes.forEach((note) => {
      console.log(note);
      const div = document.createElement("div");
      div.innerText = note;
      div.classList.add("note");
      document.querySelector("#main-container").append(div);
    });
    console.log(document.querySelector(".note"));
  }

  displayError() {
    document.write("Oopsie");
  }
}

module.exports = NotesView;
