import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://scrimba-solo-personalnotes-app-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const personalNotesInDB = ref(database, "personalNotes");

const inputTextEl = document.getElementById("input-note");
const inputTextAreaEl = document.getElementById("input-textarea");
const saveNoteBtnEl = document.getElementById("save-note-btn");
const notesContainerEl = document.getElementById("notes-container");

saveNoteBtnEl.addEventListener("click", function() {
    console.log("button clicked");
    let newNote = {note: inputTextEl.value, description: inputTextAreaEl.value};
    
    push(personalNotesInDB, newNote);

    clearInputElements();

})

onValue(personalNotesInDB, function(snapshot) {
    
    if (snapshot.exists()) {
        let notesArray = Object.entries(snapshot.val());

        /*clearNotesContainerEl();*/

        for (let i = 0; i < notesArray.length; i++) {
            let currentNote = notesArray[i];
            let currentNoteID = currentNote[0];
            let currentNoteValue = currentNote[1];

            appendNoteToNotesContainerEl(currentNoteID, currentNoteValue);
        }

        

    } else {
        notesContainerEl.innerHTML = "No notes here... yet";
    }
})

function clearInputElements() {
    inputTextEl.value = "";
    inputTextAreaEl.value = "";
}

/*function clearNotesContainerEl() {
    notesContainerEl.innerHTML = "";
}*/

function appendNoteToNotesContainerEl(noteID, noteValue) {
    
    let newNoteDivEl = document.createElement("div");
    newNoteDivEl.classList.add("note");

    let newNoteEl = document.createElement("h3");
    let newDescriptionEl = document.createElement("p");
    
    newNoteEl.textContent = noteValue.note;
    newDescriptionEl.textContent = noteValue.description;

    newNoteDivEl.appendChild(newNoteEl);
    newNoteDivEl.appendChild(newDescriptionEl);

    notesContainerEl.appendChild(newNoteDivEl);
}

