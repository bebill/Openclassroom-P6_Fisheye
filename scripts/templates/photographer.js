function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM(data) {
    const article = document.createElement("article");

    const img = document.createElement("img"); //picture
    img.setAttribute("src", picture);

    const h2 = document.createElement("h2"); //name
    h2.textContent = name;

    const h3 = document.createElement("h3"); //location
    h3.textContent = city + ", " + country;

    const p = document.createElement("p"); //tagline
    p.textContent = tagline;

    const span = document.createElement("span"); //price
    span.textContent = price + "€/jour";

    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(span);

    //add a function to redirect to ID page

    return article;
  }


  
  return { getUserCardDOM };
}

                            