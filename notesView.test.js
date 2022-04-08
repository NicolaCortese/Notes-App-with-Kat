/**
 * @jest-environment jsdom
 */

require("jest-fetch-mock").enableMocks();
const fs = require("fs");
const NotesModel = require("./notesModel");
const NotesView = require("./notesView");

let notesView;
let notesModel;

beforeEach(() => {
  document.body.innerHTML = fs.readFileSync("./index.html");
  notesModel = new NotesModel();
  mockApi = {
    createNote: () => ["hello"],
    loadNotes: () => ["hello"],
  };
  notesView = new NotesView(notesModel, mockApi);
  this.mainContainerEl = document.querySelector("#main-container");
  this.addButton = document.querySelector("#add-button");
  this.inputField = document.querySelector("#message-input");
});

describe("notesView", () => {
  it("starts with a list of empty notes", () => {
    expect(document.querySelector("#main-container :nth-child(1)")).toEqual(
      null
    );
  });

  it("displays the stored notes", async () => {
    await notesView.addNote();
    console.log(
      document.querySelector("#main-container :nth-child(1)").innerText
    );
    expect(document.querySelectorAll(".note").length).toBe(1);
  });

  // it("clicks add button and we see the first note", async () => {
  //   await this.addButton.click();
  //   expect(document.querySelector(".note").innerText).toEqual("hello");
  // });

  // it("adds a note to the model with text", async () => {
  //   const inputField = document.querySelector("#message-input");
  //   inputField.value = "hello";
  //   const addButton = document.querySelector("#add-button");
  //   addButton.click();
  //   setTimeout(() => {
  //     expect(this.firstNote).toBe("hello");
  //   }, 0);
  // });

  // it("clears input field when add note button is clicked", () => {
  //   const inputField = document.querySelector("#message-input");
  //   inputField.value = "hello";
  //   const addButton = document.querySelector("#add-button");
  //   addButton.click();
  //   setTimeout(() => {
  //     expect(document.querySelector("#message-input").value).toBe("");
  //   });
  // });
});
