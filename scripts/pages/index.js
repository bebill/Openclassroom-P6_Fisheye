import PhotographerTemplate from "../templates/photographerTemplate.js";

async function fetchPhotographersJSON() {
    //retrieve the data from JSON file,
    //parse the JSON data using response.json()
    //extract the photographers array from the parsed data and return it.
    try {
        const response = await fetch('./data/photographers.json');
        const photographers = await response.json();
        console.log(photographers); // return an array with photographers data in console.
        return photographers;
    } catch (error) {
        console.error(error);
    }
}

// display the photograhers id card
async function displayData(photographers) {
    const photographersSection = document.getElementsByClassName("photographer-section");
    const photographersSectionArray = [...photographersSection];

    photographers.forEach((photographer) => {
        const photographerModel = new PhotographerTemplate(photographer)
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSectionArray[0].appendChild(userCardDOM);
    });
}

async function init() {
    //starts the process of loading the photographers' data and displaying it in the application
    try {
    const { photographers } = await fetchPhotographersJSON();
    displayData(photographers);
    } catch (error) {
        console.error(error)
    }
}

init();
