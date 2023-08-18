import { displayModal, closeModal } from "../components/contactForm.js";

export default class PhotographerTemplate {
  constructor(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    this.name = name;
    this.portrait = portrait;
    this.city = city;
    this.country = country;
    this.tagline = tagline;
    this.price = price;
    this.id = id;
    this.picture = `assets/photographers/${this.portrait}`;
  }

  getUserCardDOM() {
    const article = document.createElement("article");
    const figure = document.createElement("figure");
    const figcaption = document.createElement("figcaption");
    const a = document.createElement("a");
    a.setAttribute("tabindex", "0");
    a.setAttribute('href', `./photographer.html?id=${this.id}`);

    const img = document.createElement("img");
    img.setAttribute("src", this.picture);

    const h2 = document.createElement("h2");
    h2.textContent = this.name;
    h2.setAttribute("aria-label", this.name)

    const h3 = document.createElement("h3");
    h3.textContent = this.city + ", " + this.country;

    const p = document.createElement("p");
    p.textContent = this.tagline;

    const span = document.createElement("span");
    span.textContent = this.price + "€/jour";

    a.appendChild(img);
    a.appendChild(h2);
    figure.appendChild(a);
    figcaption.appendChild(h3);
    figcaption.appendChild(p);
    figcaption.appendChild(span);
    article.appendChild(figure);
    article.appendChild(figcaption);

    return article;
  }


  createInfoHeader() {
    const infoArticle = document.createElement("article");

    const nameElement = document.createElement("h1");
    nameElement.textContent = this.name;
    infoArticle.appendChild(nameElement);

    const locationElement = document.createElement("h2");
    locationElement.textContent = `${this.city}, ${this.country}`;
    infoArticle.appendChild(locationElement);

    const taglineElement = document.createElement("p");
    taglineElement.textContent = this.tagline;
    infoArticle.appendChild(taglineElement);

    return infoArticle;
  }

  createButtonArticle() {
    const buttonArticle = document.createElement("article");

    const contactButton = document.createElement('button');
    contactButton.classList.add('contact-button');
    contactButton.textContent = 'Contactez-moi';
    contactButton.setAttribute("aria-label", "Contact Me")
    contactButton.addEventListener('click', displayModal);

    const closeModalButton = document.getElementById("close-btn");
    closeModalButton.setAttribute("tabindex", "0");
    closeModalButton.setAttribute("aria-label", "Close Contact Form");
    closeModalButton.addEventListener('click', closeModal);
    closeModalButton.addEventListener('keydown', (event) => {
      if (event.key === "Enter") {
        closeModal();
      }
    });
    buttonArticle.appendChild(contactButton);

    return buttonArticle;
  }

  createPortraitArticle() {
    const portraitArticle = document.createElement("article");

    const portraitImg = document.createElement("img");
    portraitImg.setAttribute("src", this.picture);
    portraitImg.setAttribute("alt", this.name);
    portraitArticle.appendChild(portraitImg);

    return portraitArticle;
  }

  createPriceRecap() {
    const price = document.createElement("span");
    price.textContent = this.price + "€ / jour";

    return price;
  }

  createLikesRecap(photographerMedia) {
    let totalLikes = photographerMedia.reduce((sum, item) => sum + item.likes, 0);
    const heartMediaList = document.getElementsByClassName("heart-media");

    const totalLikesDisplay = document.createElement("span");
    totalLikesDisplay.textContent = totalLikes + " ";

    const heartBox = document.createElement("i");
    heartBox.classList.add("fa-solid", "fa-heart");
    totalLikesDisplay.appendChild(heartBox);

    for (let i = 0; i < heartMediaList.length; i++) {
      const heartMedia = heartMediaList[i];
      heartMedia.addEventListener("click", (event) => {
        event.target.classList.contains("fa-solid") ? totalLikes += 1 : totalLikes -= 1;
        totalLikesDisplay.textContent = totalLikes + " ";
        totalLikesDisplay.appendChild(heartBox);
      });
      heartMedia.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.target.classList.contains("fa-solid") ? totalLikes += 1 : totalLikes -= 1;
          totalLikesDisplay.textContent = totalLikes + " ";
          totalLikesDisplay.appendChild(heartBox);
        }
      });
    }

    return totalLikesDisplay;
  }
}