async function fetchPhotographersJSON() {
    //retrieve the data from JSON file,
    //parse the JSON data using response.json()
    //extract the photographers array from the parsed data and return it.
    const response = await fetch('./data/photographers.json');
    const photographers = await response.json();
    console.log(photographers); // return an array with photographers data in console.
    return photographers;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    //starts the process of loading the photographers' data and displaying it in the application
    const { photographers } = await fetchPhotographersJSON();
    displayData(photographers);
}

init();

