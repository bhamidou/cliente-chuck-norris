async function asincFuncs(api) {
  const res = await fetch(api, {
    method: "GET",
    body: JSON.stringify(),
  });

  let response = await res.json();

  addElement(response.value);
}
const jokes = "https://api.chucknorris.io/jokes/random";
const categories = "https://api.chucknorris.io/jokes/categories";

document.addEventListener("keydown", function (keyBoardEvent) {
  if (keyBoardEvent.key == "r") {
    asincFuncs(jokes);
  }
});

function addElement(value) {
    let div = document.getElementById("jokes")
    div.innerHTML = value
}
