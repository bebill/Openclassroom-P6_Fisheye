export function displayUpdatedBox(photographerMedia) {
  let totalLikes = photographerMedia.reduce((sum, item) => sum + item.likes, 0);
  const heartMediaList = document.getElementsByClassName("heart-media");

  const totalLikesDisplay = document.getElementById("total-likes");
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
}
