import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://scrimba-solo-personalnotes-app-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const personalNotesInDB = ref(database, "personalNotes");

const inputTextEl = document.getElementById("input-note");
const inputTextAreaEl = document.getElementById("input-textarea");
const saveNoteBtnEl = document.getElementById("save-note-btn");

saveNoteBtnEl.addEventListener("click", function() {
    
    let newNote = {note: inputTextEl.value, description: inputTextAreaEl.value};
    
    push(personalNotesInDB, newNote);

    clearInputElements()

})

function clearInputElements() {
    inputTextEl.value = "";
    inputTextAreaEl.value = "";
}