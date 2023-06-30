// Retrieve the query parameters from the URL 
// Extract the value of the 'id' parameter from the query parameters
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');


// fetch data from json
async function fetchPhotographerJSON() {
  try {
    const response = await fetch('./data/photographers.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// display of header with photographer's info + contact-me button
async function displayHeader() {
  const dataHeader = await fetchPhotographerJSON();
  // Find the photographer object that matches the specified photographerId
  const photographer = dataHeader.photographers.find(p => p.id === parseInt(photographerId));

  if (!photographer) {
    console.error("Photographer not found");
    return;
  }

  const photographerTemplate = new PhotographerTemplate(photographer);
  const infoArticle = photographerTemplate.createInfoHeader();
  const buttonArticle = photographerTemplate.createButtonArticle();
  const portraitArticle = photographerTemplate.createPortraitArticle();

  const headerContainer = document.querySelector(".photograph-header");
  headerContainer.appendChild(infoArticle);
  headerContainer.appendChild(buttonArticle);
  headerContainer.appendChild(portraitArticle);
}

// display of the photographer's gallery
async function displayMedia() {
  const dataGallery = await fetchPhotographerJSON();
  // Filter the media items based on the photographerId
  const media = dataGallery.media.filter((m) => m.photographerId === parseInt(photographerId));

  if (!media) {
    console.error("Media not found");
    return;
  }

  const mediaContainer = document.querySelector(".photograph-gallery");
  console.log(media)
  media.forEach((item) => {
    const mediaTemplate = new MediaTemplate(item);
    const mediaElement = mediaTemplate.createMediaContent();

    // display the lightbox
    if (item.image) {
      const img = mediaElement.querySelector("img");
      img.addEventListener("click", () => {
        displayLightbox(item);
      });
    } else if (item.video) {
      const video = mediaElement.querySelector("video");
      video.addEventListener("click", () => {
        displayLightbox(item);
      });
    }

    mediaContainer.appendChild(mediaElement);
  });
}

// display the sticky box showing photographer's price + sum up of likes
async function displayBox() {
  const dataBox = await fetchPhotographerJSON();
  const photographer = dataBox.photographers.find(p => p.id === parseInt(photographerId));
  const photographerMedia = dataBox.media.filter((m) => m.photographerId === parseInt(photographerId));

  if (!photographer || !photographerMedia) {
    if (!photographer) {
      console.error("Photographer not found");
    }
    if (!photographerMedia) {
      console.error("Media not found");
    }
    return;
  }

  const boxTemplate = new PhotographerTemplate(photographer);
  const priceRecap = boxTemplate.createPriceRecap();
  const likesRecap = boxTemplate.createLikesRecap(photographerMedia);

  const boxContainer = document.querySelector(".photograph-sumbox");
  boxContainer.appendChild(priceRecap);
  boxContainer.appendChild(likesRecap);
}





async function init() {
  try {
    await displayHeader();
  } catch (error) {
    console.error('Error occurred while displaying header:', error);
  }

  try {
    await displayMedia();
  } catch (error) {
    console.error('Error occurred while displaying media:', error);
  }

  try {
    await displayBox();
  } catch (error) {
    console.error('Error occurred while displaying box:', error);
  }
}

init();

