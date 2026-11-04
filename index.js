const wordInput = document.getElementById("wordInput");
const searchButton = document.getElementById("searchButton");
const wordDisplay = document.getElementById("word");
const pronunciationDisplay = document.getElementById("pronunciation");
const definitionDisplay = document.getElementById("definition");
const exampleDisplay = document.getElementById("example");
const audioDisplay = document.getElementById("audio");

function searchWord() {
    const word = wordInput.value.trim();
    if (word === "") {
        alert("Please enter a word.");
        return;
    }
    
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0)  {
                const wordData = data[0];
                wordDisplay.textContent = wordData.word;
                pronunciationDisplay.textContent = wordData.phonetic || "N/A";
            definitionDisplay.innerHTML = wordData.meanings.map(m =>
    `<div><h3>${m.partOfSpeech}</h3><ul>${m.definitions.map(d => `<li>${d.definition}</li>`).join("")}</ul></div>`
).join("");
               const examples = wordData.meanings.flatMap(m => m.definitions.filter(d => d.example).map(d => `<li>${d.example}</li>`));
exampleDisplay.innerHTML = examples.length ? `<ul>${examples.join("")}</ul>` : "N/A";
                if (wordData.phonetics && wordData.phonetics.length > 0 && wordData.phonetics[0].audio) {
                    audioDisplay.innerHTML = `<audio controls src="${wordData.phonetics[0].audio}"></audio>`;
                } else {
                    audioDisplay.innerHTML = "N/A";
                }
            }  else {
                wordDisplay.textContent = "word not found. please confirm the spelling";
            }
        })
        .catch(error => {
            console.error("word not found. please confirm the spelling:", error);
            wordDisplay.textContent = "word not found. please confirm the spelling";
        });  

}

searchButton.addEventListener("click", searchWord);
searchButton.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchWord();
    }     
}); 
   