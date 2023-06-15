async function fetchPhotographersJSON() {
    //fetch data ;we use fetch to retrieve the data from the "photographers.json" file, and then we parse the JSON data using response.json(). Finally, we extract the photographers array from the parsed data and return it.
    const response = await fetch('./data/photographers.json');
    const photographers = await response.json();
    console.log(photographers); // affiche le tableau des photographers array dans la console
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
        // Récupère les datas des photographes
        const { photographers } = await fetchPhotographersJSON();
        displayData(photographers);
    }
    
    init();
    
