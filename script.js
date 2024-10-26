//lets grab all classes and id from the html
const cardNumberOutput = document.getElementsByClassName("card-number")
const cardHolderOutput = document.getElementsByClassName("card-name")
const cardExpirationOutput = document.getElementsByClassName("card-exp")
const cardCvvOutput = document.getElementsByClassName("card-cvv")
const cardNumberInput = document.getElementById("card-number")
const cardHolderInput = document.getElementById("card-holder")
const expireMonthInput = document.getElementById("expire-month")
const expireYearInput = document.getElementById("expire-year")
const cardCvvInput = document.getElementById("cvv")
const subBtn = document.getElementById("submit")
const backBtn = document.getElementById("back")

//lets add when input is being typed in the input field it should be displayed in the output field and also have a defult display
cardNumberInput.addEventListener("input", () => {
    cardNumberOutput[0].textContent = cardNumberInput.value
    cardNumberOutput[1].textContent = cardNumberInput.value
    formatCardNumber(cardNumberInput)
})

cardHolderInput.addEventListener("input", () => {
    let value = cardHolderInput.value.replace(/\s+/g, ' ').trim();
    cardHolderOutput[0].textContent = value;
    cardHolderOutput[1].textContent = value;
})

//let take expriation month and year and display it in the output field with '/' in between

expireMonthInput.addEventListener("input", () => {
    cardExpirationOutput[0].textContent = `${expireMonthInput.value}/${expireYearInput.value}`;
    cardExpirationOutput[1].textContent = `${expireMonthInput.value}/${expireYearInput.value}`;
});

expireYearInput.addEventListener("input", () => {
    cardExpirationOutput[0].textContent = `${expireMonthInput.value}/${expireYearInput.value}`;
    cardExpirationOutput[1].textContent = `${expireMonthInput.value}/${expireYearInput.value}`;
});

cardCvvInput.addEventListener("input", () => {
    cardCvvOutput[0].textContent = cardCvvInput.value
    cardCvvOutput[1].textContent = cardCvvInput.value
})

/*
fonction to chack if input filed are left empty
or card number isnt full
or card number is not a number
or card holder is not a string
or card holder is empty
or card expiration month is empty
or card expiration year is empty
or card cvv is empty
or card cvv is not a number
and if it meet error its should add class to input field 'error'
and if it meet success it should remove the class 'error'
and every time the btn is submitted it should check if the input field is empty or no
also need to check if the card number is valid or not by following the rules:
Visa cards begin with a 4 and have 13 or 16 digits.
Mastercard cards begin with a 5 and has 16 digits.
American Express cards begin with a 3, followed by a 4 or a 7 has 15 digits.
Discover cards begin with a 6 and have 16 digits.
and have the card number input field should have to include the space between the number when counting the length
*/

subBtn.addEventListener("click", () => {
    let cardNumber = cardNumberInput.value.replace(/\s+/g, '');
    let cardHolder = cardHolderInput.value;
    let expireMonth = expireMonthInput.value;
    let expireYear = expireYearInput.value;
    let cardCvv = cardCvvInput.value;
    let isValid = true;

    if (cardNumber.length < 13 || cardNumber.length > 16 || isNaN(cardNumber)) {
        cardNumberInput.classList.add("error");
        isValid = false;
    } else {
        cardNumberInput.classList.remove("error");
    }

    if (cardHolder.length < 1 || !isNaN(cardHolder)) {
        cardHolderInput.classList.add("error");
        isValid = false;
    } else {
        cardHolderInput.classList.remove("error");
    }

    if (expireMonth.length < 1 || isNaN(expireMonth)) {
        expireMonthInput.classList.add("error");
        isValid = false;
    } else {
        expireMonthInput.classList.remove("error");
    }

    if (expireYear.length < 1 || isNaN(expireYear)) {
        expireYearInput.classList.add("error");
        isValid = false;
    } else {
        expireYearInput.classList.remove("error");
    }

    if (cardCvv.length < 3 || cardCvv.length > 4 || isNaN(cardCvv)) {
        cardCvvInput.classList.add("error");
        isValid = false;
    } else {
        cardCvvInput.classList.remove("error");
    }

    if (isValid) {
        if ((cardNumber.startsWith("4") && (cardNumber.length === 13 || cardNumber.length === 16)) ||
            (cardNumber.startsWith("5") && cardNumber.length === 16) ||
            ((cardNumber.startsWith("34") || cardNumber.startsWith("37")) && cardNumber.length === 15) ||
            (cardNumber.startsWith("6") && cardNumber.length === 16)) {
            cardNumberInput.classList.remove("error");
        } else {
            cardNumberInput.classList.add("error");
            isValid = false;
        }
    }

    if (isValid) {
        document.querySelector(".form-credit-card").classList.add("hide");
        document.querySelector(".thanks").classList.remove("hide");
    }
});

//function that make sure card holder will contain only a-z and A-Z and upto 20 character

cardHolderInput.addEventListener("input", () => {
    cardHolderInput.value = cardHolderInput.value.replace(/[^a-zA-Z\s]/g, '').substring(0, 20);
})

//function that make sure expireMonthInput and expireYearInput is only 2 digit and only number

expireMonthInput.addEventListener("input", () => {
    expireMonthInput.value = expireMonthInput.value.replace(/\D/g, '').substring(0, 2);
})

expireYearInput.addEventListener("input", () => {
    expireYearInput.value = expireYearInput.value.replace(/\D/g, '').substring(0, 2);
})

function formatCardNumber(input) {
    let value = input.value.replace(/\D/g, '');
    let formattedValue;

    if (value.startsWith("34") || value.startsWith("37")) {
        // American Express card format: 4-6-5
        formattedValue = value.match(/(\d{1,4})(\d{1,6})?(\d{1,5})?/)
            ?.slice(1, 4)
            .filter(Boolean)
            .join(' ') || '';
    } else if (value.startsWith("4")) {
        // Visa card format: 4-4-4-4 or 4-4-4-4-4
        formattedValue = value.match(/(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,4})?/)
            ?.slice(1, 6)
            .filter(Boolean)
            .join(' ') || '';
    } else if (value.startsWith("5")) {
        // Mastercard card format: 4-4-4-4
        formattedValue = value.match(/(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/)
            ?.slice(1, 5)
            .filter(Boolean)
            .join(' ') || '';
    } else if (value.startsWith("6")) {
        // Discover card format: 4-4-4-4
        formattedValue = value.match(/(\d{1,4})(\d{1,4})?(\d{1,4})?(\d{1,4})?/)
            ?.slice(1, 5)
            .filter(Boolean)
            .join(' ') || '';
    } else {
        // Default card format: 4-4-4-4
        formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
    }

    input.value = formattedValue;
}

//function that make sure cvv will only be 3 digit and only number or if it American Express it should be 4 digit and only number and show only 3 digit in the output field or 4 if needed

cardCvvInput.addEventListener("input", () => {
    let value = cardCvvInput.value.replace(/\D/g, '');
    let formattedValue;

    if (cardNumberInput.value.startsWith("34") || cardNumberInput.value.startsWith("37")) {
        formattedValue = value.substring(0, 4);
    } else {
        formattedValue = value.substring(0, 3);
    }

    cardCvvInput.value = formattedValue;
    cardCvvOutput[0].textContent = formattedValue;
    cardCvvOutput[1].textContent = formattedValue;
});


//back button to go back to the form and clean the form inputs

backBtn.addEventListener("click", () => {
    document.querySelector(".form-credit-card").classList.remove("hide");
    document.querySelector(".thanks").classList.add("hide");

    cardNumberInput.value = '';
    cardHolderInput.value = '';
    expireMonthInput.value = '';
    expireYearInput.value = '';
    cardCvvInput.value = '';

    cardNumberOutput[0].textContent = '0000 0000 0000 0000';
    cardNumberOutput[1].textContent = '0000 0000 0000 0000';
    cardHolderOutput[0].textContent = 'FULL NAME';
    cardHolderOutput[1].textContent = 'FULL NAME';
    cardExpirationOutput[0].textContent = 'MM/YY';
    cardExpirationOutput[1].textContent = 'MM/YY';
    cardCvvOutput[0].textContent = '000';
    cardCvvOutput[1].textContent = '000';
    cardNumberInput.classList.remove("error");
    cardHolderInput.classList.remove("error");
    expireMonthInput.classList.remove("error");
    expireYearInput.classList.remove("error");
    cardCvvInput.classList.remove("error");
})