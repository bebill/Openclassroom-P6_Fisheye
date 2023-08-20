import displayUpdatedMediaGallery from "./updatedGallery.js";
import { displayUpdatedBox } from "./updatedLikeCounter.js";

const customDropdown = document.getElementsByClassName("custom-dropdown")[0];
customDropdown.setAttribute("aria-haspopup", "listbox")
const dropdownOptionsContainer = document.getElementsByClassName("dropdown-options")[0];
dropdownOptionsContainer.setAttribute("role", "listbox")
dropdownOptionsContainer.setAttribute("aria-labelledby", "listboxlabel")
const dropdownOptions = document.querySelectorAll(".dropdown-option");
const selectedOption = document.getElementById("selected-option");

const popularityOption = document.querySelector(".dropdown-option[data-value='popularity']");
const titleOption = document.querySelector(".dropdown-option[data-value='title']");
const dateOption = document.querySelector(".dropdown-option[data-value='date']");
const whiteline1 = document.getElementById("whiteline1");
const whiteline2 = document.getElementById("whiteline2");
const whiteline3 = document.getElementById("whiteline3");

popularityOption.style.display = "none";
whiteline1.style.display = "none";


function openDropdown() {
    customDropdown.classList.toggle("active");
    customDropdown.setAttribute("aria-expanded", "true")
    dropdownOptionsContainer.classList.toggle("show");
}
function closeDropdown() {
    customDropdown.classList.remove("active");
    customDropdown.setAttribute("aria-expanded", "false")
    dropdownOptionsContainer.classList.remove("show");
}

customDropdown.addEventListener("click", () => {
    openDropdown();
});
customDropdown.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        openDropdown();
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
   
    switch (selectedValue) {
        case 'date':
        dateOption.setAttribute("aria-selected", "true");
        dateOption.style.display = "none";
        popularityOption.setAttribute("aria-selected", "false");
        popularityOption.style.display = "block";
        titleOption.setAttribute("aria-selected", "false");
        titleOption.style.display = "block";
        whiteline1.style.display = "block";
        whiteline2.style.display = "none";
        whiteline3.style.display = "block";
        media.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;

        case 'title':
        titleOption.setAttribute("aria-selected", "true");
        titleOption.style.display = "none";
        popularityOption.setAttribute("aria-selected", "false");
        popularityOption.style.display = "block";
        dateOption.setAttribute("aria-selected", "false");
        dateOption.style.display = "block";
        whiteline1.style.display = "block";
        whiteline2.style.display = "block";
        whiteline3.style.display = "none";
        media.sort((a, b) => a.title.localeCompare(b.title));
        break;

        case 'popularity':
        default:
        popularityOption.setAttribute("aria-selected", "true");
        popularityOption.style.display = "none";
        titleOption.setAttribute("aria-selected", "false");
        titleOption.style.display = "block";
        dateOption.setAttribute("aria-selected", "false");
        dateOption.style.display = "block";
        whiteline1.style.display = "none";
        whiteline2.style.display = "block";
        whiteline3.style.display = "block";
        media.sort((a, b) => b.likes - a.likes);
        break;
    }
    selectedOption.textContent = option.textContent;
    closeDropdown();
    displayUpdatedMediaGallery(mediaContainer, media, photographerId);
    displayUpdatedBox(media);
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