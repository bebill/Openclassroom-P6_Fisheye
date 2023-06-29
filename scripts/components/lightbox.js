function displayLightbox(media) {

    if (!media) {
        console.error("No media to show !");
        return;
    }

    const lightbox = document.getElementById("lightbox");
    const lightboxContent = document.getElementById("lightbox-content");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    let currentIndex; // Index of the current media item in the media array
    let mediaArray; // Array of media items

    // Clear previous content
    lightboxContent.innerHTML = "";

    if (media.image) {
        const img = document.createElement("img");
        img.setAttribute("src", `./assets/media/${photographerId}/${media.image}`);
        lightboxContent.appendChild(img);
    } else if (media.video) {
        const video = document.createElement("video");
        video.setAttribute("src", `./assets/media/${photographerId}/${media.video}`);
        video.setAttribute("controls", true);
        lightboxContent.appendChild(video);
    }

    // Display the lightbox
    lightbox.style.display = "block";

    // Navigate to the previous or next media
    lightboxPrev.addEventListener("click", () => {
        navigateMedia(-1);
    });
    lightboxNext.addEventListener("click", () => {
        navigateMedia(1);
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
    }

    // Navigate between media items
    function navigateMedia(direction) {
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < mediaArray.length) {
            currentIndex = newIndex;
            const newMedia = mediaArray[currentIndex];
            displayLightbox(newMedia);
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

