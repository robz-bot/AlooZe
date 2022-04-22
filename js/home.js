const RANDOM_QUOTES_BASE_URL = new URL("https://api.quotable.io/random");
var random_quote_text = document.querySelector("#random-quote");
var random_quote_author = document.querySelector("#random-quote-author");
var card_img1 = document.querySelector("#card-img1");
var card_img2 = document.querySelector("#card-img2");

randomQuoteFunction();

async function randomQuoteFunction() {
    random_quote_text.innerHTML =
        "<i class='bi bi-arrow-clockwise'></i>Loading todays quotes...";
    random_quote_author.innerHTML = "";

    try {
        const response = await fetch(RANDOM_QUOTES_BASE_URL);
        // If the response is not 200 OK...
        if (!response.ok) {
            // ...throw an error. This causes control flow
            // to skip to the `catch` block below.
            throw Error(response.statusText);
        }
        const data = await response.json();
        // console.log(data);
        random_quote_text.innerHTML = data.content;
        random_quote_author.innerHTML = data.author;
        render_card_images();
        //working with title cards
        renderCards();
    } catch (err) {
        console.log(err);
        // alert("Failed to fetch new quote");
    }
}

function render_card_images() {
    card_img1.setAttribute(
        "src",
        "https://source.unsplash.com/random/925X617/?currency"
    );
    card_img2.setAttribute(
        "src",
        "https://source.unsplash.com/random/925X617/?postbox"
    );
}

function renderCards() {
    card1Data();
    card2Data();
}

function card1Data() {
    document.querySelector("#title1").innerHTML =
        "<i class='bi bi-currency-exchange'></i> CER - Currency Exchange Rate";
    document.querySelector("#content1").textContent =
        "Currency exchange rate calculator helps you conversion of all major world currencies by latest foreign exchange rates.";
}

function card2Data() {
    document.querySelector("#title2").innerHTML =
        "<i class='bi bi-mailbox2'></i> PIN - Post Index Number";
    document.querySelector("#content2").textContent =
        "PIN allows to get details of Post Office by searching Postal PIN Code or Post Office Branch Name of India.";
}