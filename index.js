const wordInput = document.getElementById("wordInput");
const searchButton = document.getElementById("searchButton");
const wordDisplay = document.getElementById("word");
const pronunciationDisplay = document.getElementById("pronunciation");
const definitionDisplay = document.getElementById("definition");
const exampleDisplay = document.getElementById("example");
const audioDisplay = document.getElementById("audio");
const messageElement = document.getElementById("message");

function searchWord() {
    const word = wordInput.value.trim(); //get the word entered by the user
  //clear previous results  
    wordDisplay.textContent = "";
    messageElement.textContent = "";
  pronunciationDisplay.textContent = "";
  definitionDisplay.innerHTML = "";
  exampleDisplay.innerHTML = "";
  audioDisplay.innerHTML = "";
  if (word==="") {
    messageElement.textContent("Please enter a word to search.");
    return;
  }
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Word not found.kindly check the spelling");
      }
    })
    .then(data => {
        if (data&&data.length > 0) {
            const wordData = data[0];
            wordDisplay.textContent = wordData.word;
            pronunciationDisplay.textContent = wordData.phonetic || "N/A";
            definitionDisplay.innerHTML = wordData.meanings.map(meaning => {
                const partOfSpeech = meaning.partOfSpeech;
                const definitions = meaning.definitions.map(def => `<li>${def.definition}</li>`).join("");
                return `<p><strong>${partOfSpeech}:</strong></p><ul>${definitions}</ul>`;
            }).join("");
            exampleDisplay.innerHTML = wordData.meanings.map(meaning => {
                return meaning.definitions.map(def => def.example ? `<p><em>Example:</em> ${def.example}</p>` : "").join("");
            }).join("");
            if (wordData.phonetics && wordData.phonetics.length > 0) {
                const audioUrl = wordData.phonetics.find(phonetic => phonetic.audio)?.audio;
                if (audioUrl) {
                    audioDisplay.innerHTML = `<audio controls><source src="${audioUrl}" type="audio/mpeg">Your browser does not support the audio element.</audio>`;
                }
            }
        } else {
            messageElement.textContent = "No data found for the entered word.";
        }
    })
    //handle errors and display a message to the user
    .catch(error => {
        console.error("Error:", error);
        messageElement.textContent = "Word not found.kindly check your spelling.";
    });
}

searchButton.addEventListener("click", searchWord);
wordInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchWord();
    }
});