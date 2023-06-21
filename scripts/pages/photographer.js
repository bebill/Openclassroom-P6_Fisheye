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

async function displayMedia() {
  const dataGallery = await fetchPhotographerJSON();
  const media = dataGallery.media.filter((m) => m.photographerId === parseInt(photographerId));

  const mediaContainer = document.querySelector(".photograph-gallery");
  console.log(media)
  media.forEach((item) => {
    const mediaTemplate = new MediaTemplate(item);
    const mediaElement = mediaTemplate.createMediaContent();

    mediaContainer.appendChild(mediaElement);


  });
}


async function displayBox() {
  const dataBox = await fetchPhotographerJSON();
  const photographer = dataBox.photographers.find(p => p.id === parseInt(photographerId));
  const boxTemplate = new MediaTemplate(photographer);

  const sumBox = boxTemplate.createSumBox();

  const boxContainer = document.querySelector(".photograph-sumbox");
    boxContainer.appendChild(sumBox);
  }





async function init() {
  await displayHeader();
  await displayMedia();
  await displayBox();

}

init();
