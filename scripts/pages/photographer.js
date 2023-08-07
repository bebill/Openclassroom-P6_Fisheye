import PhotographerTemplate from "../templates/photographerTemplate.js";
import MediaTemplate from "../templates/mediaTemplate.js";
import displayLightbox from "../components/lightbox.js";
import { addSubmitFormListener } from "../utils/contactForm.js"

// fetch data from json
export async function fetchPhotographerJSON() {
  try {
    const response = await fetch('./data/photographers.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// display of header with photographer's info + contact-me button
async function displayHeader(dataHeader, photographerId) {
  // Find the photographer object that matches the specified photographerId
  const photographer = dataHeader.photographers.find(
    (p) => p.id === parseInt(photographerId)
  );

  if (!photographer) throw new Error("Photographer not found");

  const photographerTemplate = new PhotographerTemplate(photographer);
  const infoArticle = photographerTemplate.createInfoHeader();
  const buttonArticle = photographerTemplate.createButtonArticle();
  const portraitArticle = photographerTemplate.createPortraitArticle();

  const modalAlt = document.getElementById("contact-modal");
  modalAlt.setAttribute("aria-label", `Contact Me ${photographer.name}`);
  modalAlt.setAttribute("aria-labelledby", "modal-title-name");
  
  const modalTitleName = document.getElementById("modal-title-name");
  modalTitleName.textContent = photographer.name;

  const headerContainer = document.getElementsByClassName("photograph-header")[0];
  headerContainer.appendChild(infoArticle);
  headerContainer.appendChild(buttonArticle);
  headerContainer.appendChild(portraitArticle);
}




// display of the photographer's gallery
async function displayMediaGallery(dataGallery, photographerId) {
  // Filter the media items based on the photographerId
  const media = dataGallery.media.filter((m) => m.photographerId === parseInt(photographerId));

  if (!media) throw new Error("Media not found");

  const mediaContainer = document.getElementsByClassName("photograph-gallery")[0];
  mediaContainer.innerHTML = '';

  console.log(media);
  media.forEach((item) => {
    const mediaTemplate = new MediaTemplate(item);
    const mediaElement = mediaTemplate.createMediaContent();
    const img = mediaElement.getElementsByTagName("img");
    const video = mediaElement.getElementsByTagName("video");

    // display the lightbox
    if (img.length > 0) {
      img[0].addEventListener("click", () => displayLightbox(item, photographerId));
      img[0].addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          displayLightbox(item, photographerId);
        }
      });
    } else if (video.length > 0) {
      video[0].addEventListener("click", () => displayLightbox(item, photographerId));
      video[0].addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          displayLightbox(item, photographerId);
        }
      });
    }
    

    mediaContainer.appendChild(mediaElement);
  });

  // sortlist
  const sortBySelect = document.getElementById('sort-by');
  sortBySelect.addEventListener("change", () => {
    const sortBy = sortBySelect.value;

    // Sort the media array based on the selected value
    switch (sortBy) {
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

    displayUpdatedMediaGallery(mediaContainer, media, photographerId);
  });
}

// display the updated photographer's gallery after sorting
function displayUpdatedMediaGallery(container, media, photographerId) {
  container.innerHTML = '';

  media.forEach((item) => {
    const mediaTemplate = new MediaTemplate(item);
    const mediaElement = mediaTemplate.createMediaContent();
    const img = mediaElement.getElementsByTagName("img");
    const video = mediaElement.getElementsByTagName("video");

    // display the lightbox
    if (img.length > 0) {
      img[0].addEventListener("click", () => displayLightbox(item, photographerId));
    } else if (video.length > 0) {
      video[0].addEventListener("click", () => displayLightbox(item, photographerId));
    }

    container.appendChild(mediaElement);
  });
}



// display the sticky box showing photographer's price + sum up of likes
async function displayBox(dataBox, photographerId) {
  const photographer = dataBox.photographers.find(
    (p) => p.id === parseInt(photographerId)
  );
  const photographerMedia = dataBox.media.filter(
    (m) => m.photographerId === parseInt(photographerId)
  );

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

  const boxContainer = document.getElementsByClassName("photograph-sumbox")[0];
  boxContainer.appendChild(likesRecap);
  boxContainer.appendChild(priceRecap);
}


async function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get("id");

  try {
    const photographerJson = await fetchPhotographerJSON();
    displayHeader(photographerJson, photographerId);
    displayMediaGallery(photographerJson, photographerId);
    displayBox(photographerJson, photographerId);
    addSubmitFormListener();
  } catch (error) {
    console.error("Error occurred while displaying header/media/box:", error);
  }
}

init();

