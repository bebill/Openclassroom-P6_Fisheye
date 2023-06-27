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
const form = document.getElementById("contactRequest");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const message = document.getElementById("message");
const submitForm = document.getElementById("btn-submit");

// Regular expressions
const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
const emailRegex = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9]+\.[a-z]+$/;

// Function to display error message
function displayErrorMessage(element, message) {
    const errorElement = element.parentElement.querySelector(".error-message");
    errorElement.textContent = message;
    element.classList.add("error");
}

// Function to remove error message
function removeErrorMessage(element) {
    const errorElement = element.parentElement.querySelector(".error-message");
    errorElement.textContent = "";
    element.classList.remove("error");
}

// Submit button event listener
submitForm.addEventListener("click", (e) => {
    e.preventDefault();

    // Clear previous error messages
    removeErrorMessage(firstName);
    removeErrorMessage(lastName);
    removeErrorMessage(email);
    removeErrorMessage(message);

    // Trim leading and trailing spaces from the fields
    firstName.value = firstName.value.trim();
    lastName.value = lastName.value.trim();
    email.value = email.value.trim();
    message.value = message.value.trim();




    // Validate form fields
    let isValid = true;

    if (firstName.value === "") {
        displayErrorMessage(firstName, "Please enter your first name");
        isValid = false;
    } else if (!nameRegex.test(firstName.value)) {
        displayErrorMessage(firstName, "Please enter a valid first name");
        isValid = false;
    }

    if (lastName.value === "") {
        displayErrorMessage(lastName, "Please enter your last name");
        isValid = false;
    } else if (!nameRegex.test(lastName.value)) {
        displayErrorMessage(lastName, "Please enter a valid last name");
        isValid = false;
    }

    if (email.value === "") {
        displayErrorMessage(email, "Please enter your email address");
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        displayErrorMessage(email, "Please enter a valid email address");
        isValid = false;
    }

    if (message.value === "") {
        displayErrorMessage(message, "Please enter your message");
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Retrieve form values
    const formData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        message: message.value,
    };

    // Perform desired actions with the form data
    console.log("Form data:", formData);

    // Reset the form
    form.reset();

    // Close the modal
    closeModal();
});
