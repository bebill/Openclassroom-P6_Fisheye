import { fetchPhotographerJSON } from "../pages/photographer.js";

export default function displayLightbox(media, photographerId) {

    if (!media) {
        console.error("No media to show !");
        return;
    }

    const lightbox = document.getElementById("lightbox");
    lightbox.setAttribute("aria-label", "image closeup view");
    lightbox.setAttribute("tabindex", "0");
    const lightboxContent = document.getElementById("lightbox-content");
    const lightboxClose = document.getElementById("lightbox-close");
    lightboxClose.setAttribute("tabindex", "0");
    lightboxClose.setAttribute("aria-label", "Close dialog");
    const lightboxPrev = document.getElementById("lightbox-prev");
    lightboxPrev.setAttribute("tabindex", "0");
    lightboxPrev.setAttribute("aria-label", "Previous Image");
    const lightboxNext = document.getElementById("lightbox-next");
    lightboxNext.setAttribute("tabindex", "0");
    lightboxNext.setAttribute("aria-label", "Next Image");

    let currentIndex; // Index of the current media item in the media array
    let mediaArray; // Array of media items

    // Clear previous content
    lightboxContent.innerHTML = "";

    if (media.image) {
        const img = document.createElement("img");
        const caption = document.createElement("span")
        img.setAttribute("src", `./assets/media/${photographerId}/${media.image}`);
        img.setAttribute("alt", `${media.title}`)
        caption.textContent = `${media.title}`
        lightboxContent.appendChild(img);
        lightboxContent.appendChild(caption);
    } else if (media.video) {
        const video = document.createElement("video");
        const caption = document.createElement("span")
        video.setAttribute("src", `./assets/media/${photographerId}/${media.video}`);
        video.setAttribute("alt", `${media.title}`)
        video.setAttribute("controls", true);
        video.setAttribute("type", "video/mp4");
        caption.textContent = `${media.title}`
        lightboxContent.appendChild(video);
        lightboxContent.appendChild(caption);
    }

    // Display the lightbox
    lightbox.style.display = "flex";

    // Disable keyboard navigation for other elements
    const otherElements = document.querySelectorAll("body > *:not(#lightbox)");
    otherElements.forEach((element) => {
        element.setAttribute("inert", "");
    });


    // Navigate to the previous or next media
    lightboxPrev.addEventListener("click", () => {
        navigateMedia(-1);
    });
    lightboxNext.addEventListener("click", () => {
        navigateMedia(1);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            navigateMedia(-1);
        } else if (event.key === "ArrowRight") {
            navigateMedia(1);
        }
        else if (event.key === "Escape") {
            closeLightbox();
        }
    });


    // Close the lightbox when the close button is clicked
    lightboxClose.addEventListener("click", () => {
        closeLightbox();
    });

    // Close the lightbox when the background outside the content area is clicked
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });


    function closeLightbox() {
        lightbox.style.display = "none";
        const otherElements = document.querySelectorAll("body > *:not(#lightbox)");
        otherElements.forEach((element) => {
            element.removeAttribute("inert");
        });
    }


    // Navigate between media items
    function navigateMedia(direction) {
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < mediaArray.length) {
            currentIndex = newIndex;
            const newMedia = mediaArray[currentIndex];
            displayLightbox(newMedia, photographerId);
        }
    }

    // Set up the media array and current index based on the filtered media items
    async function fetchAndDisplayMedia() {
        try {
            const dataGallery = await fetchPhotographerJSON();
            mediaArray = dataGallery.media.filter(
                (m) => m.photographerId === parseInt(photographerId)
            );
            currentIndex = mediaArray.findIndex((m) => m.id === media.id);
        } catch (error) {
            console.error(error);
        }
    }

    fetchAndDisplayMedia();
}

