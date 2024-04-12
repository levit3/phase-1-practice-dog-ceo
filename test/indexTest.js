const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const container = document.getElementById("dog-image-container");
const breedList = document.getElementById("dog-breeds");

fetch(`${imgUrl}`)
  .then((res) => res.json())
  .then((data) => renderImage(data.message));

function renderImage(data) {
  data.forEach((image) => {
    const img = document.createElement("img");
    img.src = image;
    container.appendChild(img);
  });
}
const breedUrl = "https://dog.ceo/api/breeds/list/all";
fetch(breedUrl)
  .then((res) => res.json())
  .then((data) => {
    renderBreed(data.message);
    filter(data.message);
  });

function renderBreed(data) {
  const breeds = Object.keys(data);
  breeds.forEach((breed) => {
    const list = document.createElement("li");
    list.innerText = breed;
    breedList.appendChild(list);
    list.addEventListener("click", (e) => {
      e.target.style.color = "red";
    });
  });
}

const option = document.getElementById("breed-dropdown");
option.addEventListener("change", (event) => {
  breedList.innerHTML = "";
  fetch(breedUrl)
    .then((res) => res.json())
    .then((data) => filter(data.message, event));
});

function filter(data, event) {
  const selectedLetter = event.target.value;
  breedList.innerHTML = "";
  const breeds = Object.keys(data);
  breeds.forEach((breed) => {
    if (breed.startsWith(selectedLetter)) {
      const listItem = document.createElement("li");
      listItem.innerText = breed;
      breedList.appendChild(listItem);
    }
  });
}
