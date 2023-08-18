import MediaTemplate from "../templates/mediaTemplate.js";
import displayLightbox from "./lightbox.js";

export default function displayUpdatedMediaGallery(container, media, photographerId) {
    container.innerHTML = '';
  
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
  
      container.appendChild(mediaElement);
    });
  }