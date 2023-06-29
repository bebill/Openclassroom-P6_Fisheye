function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// DOM Elements
const modal = document.getElementById("contact_modal");
const formData = document.querySelectorAll(".formData"); 
const formDOM = document.getElementById("contactRequest");
const firstNameDOM = document.getElementById("first");
const lastNameDOM = document.getElementById("last");
const emailDOM = document.getElementById("email");
const messageDOM = document.getElementById("message");
const submitForm = document.getElementById("btn-submit");

// Regular expressions
const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
const emailRegex = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9]+\.[a-z]+$/;


function displayErrorMessage(element, message) {
    const errorElement = element.parentElement.querySelector(".error-message");
    errorElement.textContent = message;
    element.classList.add("error");
}

function removeErrorMessage(element) {
    const errorElement = element.parentElement.querySelector(".error-message");
    errorElement.textContent = "";
    element.classList.remove("error");
}

// Submit button event listener
submitForm.addEventListener("click", (e) => {
    e.preventDefault();

    // Clear previous error messages
    [firstNameDOM, lastNameDOM, emailDOM, messageDOM].forEach(input => removeErrorMessage(input))

    firstNameDOM.value = firstNameDOM.value.trim();
    lastNameDOM.value = lastNameDOM.value.trim();
    emailDOM.value = emailDOM.value.trim();
    messageDOM.value = messageDOM.value.trim();




    // Validate formDOM fields
    let isValid = true;

    if (firstNameDOM.value === "") {
        displayErrorMessage(firstNameDOM, "Veuillez entrer votre Prénom");
        isValid = false;
    } else if (!nameRegex.test(firstNameDOM.value)) {
        displayErrorMessage(firstNameDOM, "Ce champ ne peut contenir que des lettres");
        isValid = false;
    }

    if (lastNameDOM.value === "") {
        displayErrorMessage(lastNameDOM, "Veuillez entrer votre Nom");
        isValid = false;
    } else if (!nameRegex.test(lastNameDOM.value)) {
        displayErrorMessage(lastNameDOM, "Ce champ ne peut contenir que des lettres");
        isValid = false;
    }

    if (emailDOM.value === "") {
        displayErrorMessage(emailDOM, "Veuillez entrer votre Courriel");
        isValid = false;
    } else if (!emailRegex.test(emailDOM.value)) {
        displayErrorMessage(emailDOM, "Veuillez entrez un format de courriel valide (ex: xyz@example.com)");
        isValid = false;
    }

    if (messageDOM.value === "") {
        displayErrorMessage(messageDOM, "Veuillez entrer votre Message");
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Retrieve formDOM values
    const formData = {
        firstName: firstNameDOM.value,
        lastName: lastNameDOM.value,
        email: emailDOM.value,
        message: messageDOM.value,
    };

    console.log("User input:", formData);
    formDOM.reset();
    closeModal();
});
