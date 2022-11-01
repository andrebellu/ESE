import "./style.css";

const API = "https://api.github.com/emojis";

var data = localStorage.getItem("emoji");
const cards = document.getElementById("cards");
const input = document.getElementById("search");
const btn = document.getElementById("btn");

const callApi = () => {
  fetch(API)
    .then((res) => res.json())
    .then((body) => {
      localStorage.setItem("emoji", JSON.stringify(body));
    });
  updateEmoji(body);
};

const updateEmoji = (body) => {
  cards.innerHTML = "";

  console.log(body);
  const emojis = Object.keys(body);
  for (const emoji of emojis) {
    const img = document.createElement("div");
    // display name and emoji image
    img.innerHTML = ` <img src="${body[emoji]}" /> <p>${emoji}</p>`;
    img.className = "emojicard";
    cards.appendChild(img);
  }
};

if (data == null) {
  console.log("No data found, fetching from API");
  callApi();
} else {
  data = JSON.parse(data);
  updateEmoji(data);
}

btn.onclick = () => {
  const value = input.value 
  const filtered = {}

  for (let k in data){
    if (k.includes(value)){
      filtered[k] = data[k]
    }
  }

  updateEmoji(filtered)

  console.log(filtered)
}
