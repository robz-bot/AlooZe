const result_data = document.querySelector("#result_data");
const input = document.querySelector("#input");
const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("click", function() {
    var text = input.value;
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            var res_html = "";

            // Loop through each word in the response (data is an array)
            data.forEach((resultData) => {
                var word = resultData.word;

                res_html += `
                    <div class="word-container my-4">
                        <h3>Word: ${word}</h3>
                `;

                // Handle phonetics (if available)
                if (resultData.phonetics && resultData.phonetics.length > 0) {
                    var phonetic = resultData.phonetics.find((x) => x.audio && x.audio !== "");

                    if (phonetic) {
                        res_html += `
                            <div class="d-flex flex-wrap justify-content-evenly my-3">
                                <audio controls>
                                    <source src="${phonetic.audio}" type="audio/mpeg">
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        `;
                    }
                }

                // Handle meanings (if available)
                if (resultData.meanings && resultData.meanings.length > 0) {
                    res_html += `<div class="d-flex flex-wrap justify-content-evenly">`;

                    resultData.meanings.forEach((meaning) => {
                        res_html += `
                            <div class="p-2 bd-highlight">
                                <div class="bd-highlight">
                                    <h4>Part of Speech: ${meaning.partOfSpeech}</h4>
                                </div>
                                <details>
                                    <summary>Definition</summary>
                                    <p>${meaning.definitions[0].definition}</p>
                                </details>
                            </div>
                        `;
                    });

                    res_html += `</div>`; // Close meanings div
                }

                res_html += `</div>`; // Close word-container div
            });

            // Insert the HTML into the result container
            if (res_html) {
                result_data.innerHTML = res_html;
            } else {
                result_data.innerHTML = "No results found.";
                result_data.setAttribute("class", "text-center text-dark");
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            result_data.innerHTML = "An error occurred. Please try again.";
            result_data.setAttribute("class", "text-center text-danger");
        });
});
