import displayUpdatedMediaGallery from "./updatedGallery.js";

const customDropdown = document.getElementsByClassName("custom-dropdown")[0];
const dropdownOptionsContainer = document.getElementsByClassName("dropdown-options")[0];
const dropdownOptions = document.querySelectorAll(".dropdown-option");
const selectedOption = document.getElementById("selected-option");

function displayDropdown() {
    dropdownOptionsContainer.classList.toggle("show");
}
function closeDropdown() {
    dropdownOptionsContainer.classList.remove("show");
}


customDropdown.addEventListener("click", () => {
    displayDropdown();
});
customDropdown.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        displayDropdown();
    } else if (event.key === "ArrowDown") {
        navigateOption(1);
    } else if (event.key === "ArrowUp") {
        navigateOption(-1);
    }
});

document.addEventListener("click", event => {
    if (event.target !== customDropdown) {
        closeDropdown();
    }
});

export default function handleOptionSelection(option, mediaContainer, media, photographerId) {
    const selectedValue = option.getAttribute("data-value");

    // Sort based on the selected value
    switch (selectedValue) {
        case 'date':
            media.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;

        case 'title':
            media.sort((a, b) => a.title.localeCompare(b.title));
            break;

        case 'popularity':
        default:
            media.sort((a, b) => b.likes - a.likes);
            break;
    }
    selectedOption.textContent = option.textContent;
    closeDropdown();
    displayUpdatedMediaGallery(mediaContainer, media, photographerId);
}

// keyboard navigation setup
let currentOptionIndex = 0;
export function navigateOption(direction) {
    const newOptionIndex = currentOptionIndex + direction;
    if (newOptionIndex >= 0 && newOptionIndex < dropdownOptions.length) {
        currentOptionIndex = newOptionIndex;
        dropdownOptions[currentOptionIndex].focus();
    }
}