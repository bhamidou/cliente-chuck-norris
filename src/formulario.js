import { asyncFunc } from "./funcs.js";
import { Category } from "./ClassCategory.js";
import { translate } from "./funcs.js";
import { getLangsAvaible } from "./funcs.js";
import { addJokes } from "./funcs.js";

const jokes = "https://api.chucknorris.io/jokes/random";
let queryType = "https://api.chucknorris.io/jokes/random?query=";
let queryFinal = "https://api.chucknorris.io/jokes/random?category=";

function setCategory() {
  let getCategoryLocal = localStorage.getItem("category");

  if (getCategoryLocal != null) {
    let parseGetCat = JSON.parse(getCategoryLocal);

    let cate = document.getElementById("h2-cat");

    if (parseGetCat.type == "random") {
      queryFinal = jokes;
      cate.innerHTML = "Random";
    } else if (parseGetCat.type == undefined) {
      cate.innerHTML = cate.innerHTML + " " + parseGetCat.name;
      queryFinal = queryFinal + parseGetCat.name;
    } else {
      cate.innerHTML = parseGetCat.type + ': "' + parseGetCat.name + '"';
      queryFinal = queryType + parseGetCat.name;
    }
  } else {
    document.getElementById("h2-cat").innerHTML =
      "Don't have choose option for joke, you will redirect in 6s to index";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 6000);
  }
  let getLangLocal = localStorage.getItem("lang");
  if(getLangLocal == null){
    let langString = JSON.stringify("en");
    localStorage.setItem("lang", langString);
  }
}

setCategory();

asyncFunc(queryFinal).then((res) => {
  let getLangLocal = localStorage.getItem("lang");

  let parseGetLang = JSON.parse(getLangLocal);

  addJokes(res.value);

  setTranslate(parseGetLang);
});

document.addEventListener("keydown", function (keyBoardEvent) {
  if (keyBoardEvent.key == "r") {
    asyncFunc(queryFinal)
      .then((data) => {
        let getLangLocal = localStorage.getItem("lang");
        let parseGetLang = JSON.parse(getLangLocal);

        addJokes(data.value);

        setTranslate(parseGetLang);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

const langs = "https://translate.badrweb.es/languages";

getLangsAvaible(langs);

let list = document.getElementById("list_lang");

list.addEventListener("change", function (event) {
  let lang = event.currentTarget.selectedOptions[0].id;

  var langString = JSON.stringify(lang);
  localStorage.setItem("lang", langString);

  setTranslate(lang);
});

function setTranslate(languaje) {
  let jokes = document.getElementById("jokes");

  translate(jokes.innerText, languaje).then((res) => {
    jokes.innerHTML = res.translatedText;
  });
}
