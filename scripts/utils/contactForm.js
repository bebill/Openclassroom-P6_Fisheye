function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


// close confirmation modal form after submit
function displayModalSubmit() {
    modal.style.display = 'none';
}

// DOM Elements
const modal = document.getElementById("contact_modal");
const form = document.querySelector("form");
const formData = document.querySelectorAll(".formData");
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const submitForm = document.querySelector("#btn-submit");




// form validation
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formErrors();

    if (
        validFirst === true &&
        validLast === true &&
        validMail === true &&
        validMessage === true
    ) {
        // group data collected in the form in an object for the console.log
        const formData = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            message: message.value,
        };

        console.log("User input:", formData);
        displayModalSubmit();
        form.reset();
        // window.location.href = "index.html"; 
    }
});

// check errors
function formErrors() {
    let isValid = true;

    if (!firstNameVerify()) {
        isValid = false;
    }
    if (!lastNameVerify()) {
        isValid = false;
    }
    if (!emailVerify()) {
        isValid = false;
    }
    if (!messageVerify()) {
        isValid = false;
    }
}




// validation conditions : return to 'true' when ok
let validFirst = false;
let validLast = false;
let validMail = false;
let validMessage = false;



// error settings
function setError(elem) {
    const formData = elem.parentElement;
    //change class to error
    formData.className = "formData error";
}

// success settings
function setSuccess(elem) {
    const formData = elem.parentElement;
    //change class to success
    formData.className = "formData success";
}



//last name verify
function firstNameVerify() {
    const firstNameValue = firstName.value.trim();
    if (firstNameValue === "") {
        setError(firstName);
    } else if (!firstNameValue.match(/^[a-zA-Z-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ\s]+$/)) {
        setError(firstName);
    } else if (firstNameValue.length < 1) {
        setError(firstName);
    } else {
        setSuccess(firstName);
        return validFirst = true;
    }
}


//last name verify
function lastNameVerify() {
    const lastNameValue = lastName.value.trim();
    if (lastNameValue === "") {
        setError(lastName);
    } else if (!lastNameValue.match(/^[a-zA-Z-àáâãäåçèéêëìíîïðòóôõöùúûüýÿ\s]+$/)) {
        setError(lastName);
    } else if (lastNameValue.length < 1) {
        setError(lastName);
    } else {
        setSuccess(lastName);
        return validLast = true;
    }
}


// email verify
function emailVerify() {
    const emailValue = email.value.trim();
    if (emailValue === "") {
        setError(email);
    } else if (!emailRegex(emailValue)) {
        setError(email);
    } else {
        setSuccess(email);
        return validMail = true;
    }
}

function emailRegex(email) {
    /*  Adresse mail valide : xyz.abc@example.com
        Format : "lettres/chiffres._-"  + "@" + "lettres/chiffres" + "." + "lettres"   */
    return (
        /^[a-z0-9.-_]+@[a-z0-9]+\.[a-z]+$/.test(email)
    );
}

//message verify
function messageVerify() {
    const messageValue = message.value.trim();
    if (messageValue === "") {
        setError(message);
    } else if (messageValue.length < 1) {
        setError(message);
    } else {
        setSuccess(message);
        return validMessage = true;
    }
}


