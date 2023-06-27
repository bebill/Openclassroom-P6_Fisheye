//mediaTemplate.js

class MediaTemplate {
  constructor(data) {
    const { photographerId, id, title, likes, date, price, image, video, heart } = data;
    this.id = id;
    this.photographerId = photographerId;
    this.title = title;
    this.likes = likes;
    this.date = date;
    this.price = price;
    this.image = image ? `./assets/media/${data.photographerId}/${image}` : null;
    this.video = video ? `./assets/media/${data.photographerId}/${video}` : null;
    this.heart = `./assets/icons/heart.svg`;

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

    const heart = document.createElement("img");
    heart.classList.add("like-icon");
    heart.setAttribute("src", this.heart);
    like.appendChild(heart);

    mediaCaption.appendChild(like);

    mediaContent.appendChild(mediaCaption);

    return mediaContent;
  }

  createSumBox() {
    const box = document.createElement("div");

    const price = document.createElement("span");
    price.textContent = this.price + "€ / jour";
    box.append(price);

    return box;
  }
}
