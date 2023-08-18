export default class MediaTemplate {
  constructor(data) {
    const { photographerId, id, title, likes, date, price, image, video } = data;
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.likes = likes;
    this.originalLikes = this.likes;
    this.date = date;
    this.price = price;
    this.image = image ? `./assets/media/${data.photographerId}/${image}` : null;
    this.video = video ? `./assets/media/${data.photographerId}/${video}` : null;
  }


  createMediaContent() {
    const mediaContent = document.createElement("figure");
    const mediaLink = document.createElement("a");

    if (this.image) {
      const img = document.createElement("img");
      img.setAttribute("src", this.image);
      img.setAttribute("alt", this.title + ", closeup view");
      img.setAttribute("tabindex", "0");

      mediaLink.appendChild(img);
    } else if (this.video) {
      const video = document.createElement("video");
      video.setAttribute("src", this.video);
      video.setAttribute("alt", this.title + ", closeup view");
      video.setAttribute("tabindex", "0");
      video.setAttribute("controls", true);
      video.setAttribute("type", "video/mp4");
      mediaLink.appendChild(video);
    }

    const mediaCaption = document.createElement("figcaption");
    mediaCaption.classList.add("media-caption")

    const mediaTitle = document.createElement("span");
    mediaTitle.textContent = this.title;
    mediaCaption.appendChild(mediaTitle);

    const like = document.createElement("div");
    like.classList.add("like")
    like.setAttribute("aria-label", "likes")

    const nbLikes = document.createElement("span");
    nbLikes.textContent = this.likes + " ";
    like.appendChild(nbLikes);

    const heart = document.createElement("i");
    heart.setAttribute("class", "heart-media fa-regular fa-heart");
    heart.setAttribute("tabindex", "0")
    like.appendChild(heart);

    heart.addEventListener("click", () => {
      let classToAdd = '';

      if (this.likes === this.originalLikes) {
        // Increase the likes count
        this.likes++;
        classToAdd = "fa-solid";
      } else {
        // Reset the likes count
        this.likes = this.originalLikes;
        classToAdd = "fa-regular";
      }

      nbLikes.textContent = this.likes + " ";
      heart.setAttribute("class", `heart-media ${classToAdd} fa-heart`);

    });

    heart.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        let classToAdd = '';

        if (this.likes === this.originalLikes) {
          this.likes++;
          classToAdd = "fa-solid";
        } else {
          this.likes = this.originalLikes;
          classToAdd = "fa-regular";
        }

        nbLikes.textContent = this.likes + " ";
        heart.setAttribute("class", `heart-media ${classToAdd} fa-heart`);
      }
    });

    mediaContent.appendChild(mediaLink);
    mediaCaption.appendChild(like);
    mediaContent.appendChild(mediaCaption);

    return mediaContent;
  }
}
