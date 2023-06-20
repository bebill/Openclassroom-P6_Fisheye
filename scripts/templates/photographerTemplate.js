//photographerTemplate.js

class PhotographerTemplate {
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

    const img = document.createElement("img");
    img.setAttribute("src", this.picture);
    img.addEventListener('click', this.redirectToPhotographerPage.bind(this));

    const h2 = document.createElement("h2");
    h2.textContent = this.name;
    h2.addEventListener('click', this.redirectToPhotographerPage.bind(this));

    const h3 = document.createElement("h3");
    h3.textContent = this.city + ", " + this.country;

    const p = document.createElement("p");
    p.textContent = this.tagline;

    const span = document.createElement("span");
    span.textContent = this.price + "€/jour";

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(span);

    return article;
  }

  redirectToPhotographerPage() {
    const searchParams = new URLSearchParams();
    searchParams.append('id', this.id);
    const queryString = searchParams.toString();
    window.location.href = `/photographer.html?${queryString}`;
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
    contactButton.classList.add('contact_button');
    contactButton.textContent = 'Contactez-moi';
    contactButton.addEventListener('click', displayModal);
    buttonArticle.appendChild(contactButton);
  
    return buttonArticle;
  }
  
  createPortraitArticle() {
    const portraitArticle = document.createElement("article");
  
    const portraitImg = document.createElement("img");
    portraitImg.setAttribute("src", this.picture);
    portraitArticle.appendChild(portraitImg);
  
    return portraitArticle;
  }
}
