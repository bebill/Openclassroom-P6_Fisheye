export function displayModal() {
  const modal = document.getElementById("contact-modal");
  modal.style.display = "block";
  const firstInput = document.getElementById("first");
  firstInput.focus();
  const otherElements = document.querySelectorAll("body > *:not(#contact-modal)");
  otherElements.forEach((element) => {
    element.setAttribute("inert", "");
  });

  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });


  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}

export function closeModal() {
  const modal = document.getElementById("contact-modal");
  modal.style.display = "none";
  const otherElements = document.querySelectorAll("body > *:not(#lightbox)");
  otherElements.forEach((element) => {
    element.removeAttribute("inert");
  });
}

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

export function addSubmitFormListener() {
  // Submit button event listener
  const submitForm = document.getElementById("btn-submit");
  submitForm.setAttribute("aria-label", "Send");
  submitForm.addEventListener("click", (e) => {
    e.preventDefault();

    // DOM Elements
    const formDOM = document.getElementById("contact-request");
    const firstNameDOM = document.getElementById("first");
    const lastNameDOM = document.getElementById("last");
    const emailDOM = document.getElementById("email");
    const messageDOM = document.getElementById("message");

    // Clear previous error messages
    [firstNameDOM, lastNameDOM, emailDOM, messageDOM].forEach((input) =>
      removeErrorMessage(input)
    );

    firstNameDOM.value = firstNameDOM.value.trim();
    lastNameDOM.value = lastNameDOM.value.trim();
    emailDOM.value = emailDOM.value.trim();
    messageDOM.value = messageDOM.value.trim();

    // Validate form fields
    let isValid = true;

    if (firstNameDOM.value === "") {
      displayErrorMessage(firstNameDOM, "Veuillez entrer votre Prénom");
      isValid = false;
    } else if (!nameRegex.test(firstNameDOM.value)) {
      displayErrorMessage(
        firstNameDOM,
        "Ce champ ne peut contenir que des lettres"
      );
      isValid = false;
    }

    if (lastNameDOM.value === "") {
      displayErrorMessage(lastNameDOM, "Veuillez entrer votre Nom");
      isValid = false;
    } else if (!nameRegex.test(lastNameDOM.value)) {
      displayErrorMessage(
        lastNameDOM,
        "Ce champ ne peut contenir que des lettres"
      );
      isValid = false;
    }

    if (emailDOM.value === "") {
      displayErrorMessage(emailDOM, "Veuillez entrer votre Courriel");
      isValid = false;
    } else if (!emailRegex.test(emailDOM.value)) {
      displayErrorMessage(
        emailDOM,
        "Veuillez entrez un format de courriel valide (ex: xyz@example.com)"
      );
      isValid = false;
    }

    if (messageDOM.value === "") {
      displayErrorMessage(messageDOM, "Veuillez entrer votre Message");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Retrieve form values
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
}