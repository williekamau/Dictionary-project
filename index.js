const wordInput = document.getElementById("wordInput");
const searchButton = document.getElementById("searchButton");
const wordElement = document.getElementById("word");
const pronunciationElement = document.getElementById("pronunciation");
const definitionElement = document.getElementById("definition");
const exampleElement = document.getElementById("example");
const audioElement = document.getElementById("audio");

async function searchWord(word) {
    const word = wordInput.value.trim();
    if (!word) {
        alert("Please enter a word.");
        return;
    }

}