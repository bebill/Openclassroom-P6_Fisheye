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

}
