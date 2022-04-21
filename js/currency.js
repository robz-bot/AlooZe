var result = []; //stores like inr - indian rupee
var convertorBtn = document.querySelector("#currency-convertor-btn");
var moreConvertorBtn = document.querySelector("#more-currency-convertor-btn");
var select1 = document.querySelector("#currencyDdl1");
var select2 = document.querySelector("#currencyDdl2");
var end_result = document.querySelector("#result-display");
var more_input_1 = document.querySelector("#more-input-1").value;
var more_input_2 = document.querySelector("#more-input-2").value;
var result_value;

fetch("./json/currencies.json")
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        for (var i in data) result.push([i + " - " + data[i]]);
        var str = "";
        for (var item of result) {
            var temp = item.toString().split(" ")[0]; // to get the currency value
            str += `<option value="${temp}">${item}</option>`; // to bind the values in option
        }
        select1.innerHTML = str; // binding first select box
        select2.innerHTML = str; // binding second select box
    });

convertorBtn.addEventListener("click", displayResults);
moreConvertorBtn.addEventListener("click", displayMoreResults);

function displayMoreResults() {
    moreConvertorBtn.innerHTML = `<i class='bi bi-arrow-clockwise'></i> Converting...`;
    if (more_input_1.value > 0) {
        var res = result_value * more_input_1.value;
        document.querySelector("#more-input-2").value = res;
    } else {
        moreConvertorBtn.innerHTML = `Convert`;
        more_input_1.value = "";
        alert("Invalid Input");
        return;
    }

    console.log(res);
}

function resetValues() {
    more_input_1.value = "";
    more_input_1.value = "";
}

function displayResults() {
    resetValues();
    convertorBtn.innerHTML = `<i class='bi bi-arrow-clockwise'></i> Converting...`;
    var convert_from = select1.value;
    var convert_to = select2.value;
    fetch(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${convert_from}/${convert_to}.json`
        )
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            convertorBtn.innerHTML = "Convert";
            result_value = Object.values(data)[1];
            document.querySelector("#modalTitle").innerHTML =
                "Convert with your quantities";
            document.querySelector(
                "#desc"
            ).innerHTML = ` <strong>Note: 1 ${convert_from} </strong>equals <strong>${result_value} ${convert_to}</strong>`;
            document.querySelector("#form-label-1").innerHTML = convert_from;
            document.querySelector("#form-label-2").innerHTML = convert_to;
            end_result.innerHTML = `<div class="col-2">
            </div> <div class="col-8 ">
            <div class="alert alert-dark" role="alert">
            <h4 class="alert-heading">Converted Successfully! 
            <button type="button" class="btn btn-secondary float-end" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            More Calculations?</button>
            <hr>
            <p class="mb-0 text-uppercase ">
            <strong>1 ${convert_from} </strong>equals <strong>${result_value} ${convert_to}</strong>
            </p>
        </div>
        </div>
        <div class="col-2"></div>`;
        });
}