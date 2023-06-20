const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

async function fetchPhotographerJSON() {
  try {
    const response = await fetch('./data/photographers.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function displayHeader() {
  const dataHeader = await fetchPhotographerJSON();
  const photographer = dataHeader.photographers.find(p => p.id === parseInt(photographerId));

  const photographerTemplate = new PhotographerTemplate(photographer);
  const infoArticle = photographerTemplate.createInfoHeader();
  const buttonArticle = photographerTemplate.createButtonArticle();
  const portraitArticle = photographerTemplate.createPortraitArticle();

  const headerContainer = document.querySelector(".photograph-header");
  headerContainer.appendChild(infoArticle);
  headerContainer.appendChild(buttonArticle);
  headerContainer.appendChild(portraitArticle);
}



async function init() {
  await displayHeader();

  // Perform additional initialization tasks here
  // ...
}

init();
