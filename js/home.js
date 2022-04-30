const RANDOM_QUOTES_BASE_URL = new URL("https://api.quotable.io/random");
var random_quote_text = document.querySelector("#random-quote");
var random_quote_author = document.querySelector("#random-quote-author");

var searchCard = document.querySelector("#searchCard");

var card_img1 = document.querySelector("#card-img1");
var card_img2 = document.querySelector("#card-img2");
var card_img3 = document.querySelector("#card-img3");
var card_img4 = document.querySelector("#card-img4");
var card_img5 = document.querySelector("#card-img5");
var card_img6 = document.querySelector("#card-img6");
var card_img7 = document.querySelector("#card-img7");
var card_img8 = document.querySelector("#card-img8");

var cardRow = document.querySelectorAll("#mainRow");
var headingTags = document.getElementsByTagName("h5");

randomQuoteFunction();
searchCard.addEventListener("keyup", searchCards);

function searchCards() {
    var searchTxt = searchCard.value.toUpperCase();
    console.log(searchTxt);
    if (searchTxt.length > 0) {
        for (var i = 0; i < cardRow[0].childElementCount; i++) {
            let match = cardRow[0].children[i].getElementsByTagName("h5")[0];
            console.log(match.textContent);
            if (match) {
                let textValue = match.textContent || match.innerHTML;
                if (textValue.toUpperCase().includes(searchTxt)) {
                    // if (textValue.toUpperCase().indexOf(searchTxt) > -1) {
                    cardRow[0].children[i].style.display = "";
                } else {
                    cardRow[0].children[i].style.display = "none";
                }
            }
        }
    } else {
        for (var i = 0; i < cardRow[0].childElementCount; i++) {
            cardRow[0].children[i].style.display = "";
        }
    }
}

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
    card_img3.setAttribute(
        "src",
        "https://source.unsplash.com/random/925X617/?news"
    );
    card_img4.setAttribute(
        "src",
        "https://source.unsplash.com/random/925X617/?weather"
    );
    card_img5.setAttribute(
        "src",
        "https://source.unsplash.com/random/925X617/?coding"
    );
    card_img6.setAttribute(
        "src",
        "https://source.unsplash.com/random/925X617/?language"
    );
    card_img7.setAttribute(
        "src",
        "https://source.unsplash.com/random/925X617/?QR"
    );
    card_img8.setAttribute(
        "src",
        "https://source.unsplash.com/random/925X617/?dictionary"
    );
}

function renderCards() {
    card1Data();
    card2Data();
    card3Data();
    card4Data();
    card5Data();
    card6Data();
    card7Data();
    card8Data();
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

function card3Data() {
    document.querySelector("#title3").innerHTML =
        "<i class='bi bi-newspaper'></i> MRI - Most Recent Info";
    document.querySelector("#content3").textContent =
        "Check today's news brief on National, Politics, Sports, Business, Education, etc... Keep update yourself";
}

function card4Data() {
    document.querySelector("#title4").innerHTML =
        "<i class='bi bi-cloud-lightning-rain-fill'></i> SWF - Subsequent Weather Forecast";
    document.querySelector("#content4").textContent =
        "This weather forecast establishes predictable meteorological conditions over a specific area where you are standing.";
}

function card5Data() {
    document.querySelector("#title5").innerHTML =
        "<i class='bi bi-code-square'></i> PYP - Prove Your Potential";
    document.querySelector("#content5").textContent =
        "Are you a programmer? To demonstrate your worth here, try to solve the problems in the timely coding contest.";
}

function card6Data() {
    document.querySelector("#title6").innerHTML =
        "<i class='bi bi-code-translate'></i> AZ - Alooze Translation";
    document.querySelector("#content6").textContent =
        "This tool will translate from the default language of English to any of the languages you specify.";
}

function card7Data() {
    document.querySelector("#title7").innerHTML =
        "<i class='bi bi-qr-code-scan'></i> QR - Your QR";
    document.querySelector("#content7").textContent =
        "Use this QR code to send your secret message. Are you concerned about your privacy? Go here";
}

function card8Data() {
    document.querySelector("#title8").innerHTML =
        "<i class='bi bi-journal-bookmark-fill'></i> AD - AlooZe Dictionary";
    document.querySelector("#content8").textContent =
        "This gathers information about a word and instructs when and where it should be used, as well as how to pronounce it. Expand your vocabulary.";
}