//mediaTemplate.js

class MediaTemplate {
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

    if (this.image) {
      const img = document.createElement("img");
      img.setAttribute("src", this.image);

      mediaContent.appendChild(img);
    } else if (this.video) {
      const video = document.createElement("video");
      video.setAttribute("src", this.video);
      video.setAttribute("controls", true);

      mediaContent.appendChild(video);
    }

    const mediaCaption = document.createElement("figcaption");
    mediaCaption.classList.add("media-caption")

    const mediaTitle = document.createElement("span");
    mediaTitle.textContent = this.title;
    mediaCaption.appendChild(mediaTitle);

    const like = document.createElement("div");
    like.classList.add("like")

    const nbLikes = document.createElement("span");
    nbLikes.textContent = this.likes;
    like.appendChild(nbLikes);

    const heart = document.createElement("i");
    heart.setAttribute("class", "heart-media fa-regular fa-heart");
    like.appendChild(heart);

    heart.addEventListener("click", () => {
      if (this.likes === this.originalLikes) {
        // Increase the likes count
        this.likes += 1;
        nbLikes.textContent = this.likes;
        heart.setAttribute("class", "heart-media fa-solid fa-heart");
      } else {
        // Reset the likes count
        this.likes = this.originalLikes;
        nbLikes.textContent = this.likes;
        heart.setAttribute("class", "heart-media fa-regular fa-heart");
      }

    });

    mediaCaption.appendChild(like);
    mediaContent.appendChild(mediaCaption);

    return mediaContent;
  }
}
