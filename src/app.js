import { asyncFunc } from "./funcs.js";
import { getLangsAvaible } from "./funcs.js";
import { generateTable } from "./funcs.js";
import { translate } from "./funcs.js";
import { Category } from "./ClassCategory.js";
import { Phrase } from "./ClassFrase.js";

const categories = "https://api.chucknorris.io/jokes/categories";

let tableCategories = document.getElementById("table");

tableCategories.addEventListener("click", function (event) {
  let category = new Category(event.target.id);
  var categoryString = JSON.stringify(category);
  localStorage.setItem("category", categoryString);
});

asyncFunc(categories).then((data) => {
  generateTable(data);
});



let search = document.getElementById("search-phrase");

search.addEventListener("keydown", function (keyBoardEvent) {
  if (keyBoardEvent.key == "Enter") {
    let category = new Category(search.value);
    category.type = "query";

    var categoryString = JSON.stringify(category);

    localStorage.setItem("category", categoryString);
    window.location.href = "formulario.html";
  }
});

let randBtn = document.getElementById("random");

randBtn.addEventListener("click", () => {
  let category = new Category("random");
  category.type = "random";

  var categoryString = JSON.stringify(category);
  localStorage.setItem("category", categoryString);
  window.location.href = "formulario.html";
});
