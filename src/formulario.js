import { asyncFunc } from "./funcs.js";
import { Category } from "./ClassCategory.js";
import { translate } from "./funcs.js";
import { getLangsAvaible } from "./funcs.js";
import { addJokes } from "./funcs.js";
import { getRandNum } from "./funcs.js";
import { setHeaderPage } from "./funcs.js";
import { getHeaderPage } from "./funcs.js";
import { getLocalValue } from "./funcs.js";
import { setLocalLang } from "./funcs.js";

const jokes = "https://api.chucknorris.io/jokes/random";
let queryType = "https://api.chucknorris.io/jokes/search?query=";
let queryFinal = "https://api.chucknorris.io/jokes/random?category=";

function setCategory() {
  if (getLocalValue("category") != null) {
    let parseGetCat = getLocalValue("category");

    if (parseGetCat.type == "random") {
      queryFinal = jokes;
      setHeaderPage("Random");
    } else if (parseGetCat.type == undefined) {
      setHeaderPage(getHeaderPage() + " " + parseGetCat.name);

      queryFinal = queryFinal + parseGetCat.name;
    } else {
      setHeaderPage(parseGetCat.type + ': "' + parseGetCat.name + '"');

      queryFinal = queryType + parseGetCat.name;
    }
  } else {
    setHeaderPage(
      "Don't have choose option for joke, you will redirect in 6s to index"
    );

    setTimeout(() => {
      window.location.href = "index.html";
    }, 6000);
  }

  if (getLocalValue("lang") == null) {
    setLocalLang("en");
  }
}

setCategory();

asyncFunc(queryFinal).then((res) => {
  if (res.total) {
    let rnd = getRandNum(0, res.total);

    addJokes(res.result[rnd].value);

    if (res.result[rnd].categories >= 1) {
      setHeaderPage(res.result[rnd].categories[0]);
    }
  } else {
    addJokes(res.value);
  }

  setTranslate(getLocalValue("lang"));
});

document.addEventListener("keydown", function (keyBoardEvent) {
  if (keyBoardEvent.key == "r") {
    asyncFunc(queryFinal)
      .then((data) => {
        if (data.total) {
          let rnd = getRandNum(0, data.total);
          addJokes(data.result[rnd].value);

          let parseGetCat = getLocalValue("category");

          if (data.result[rnd].categories.length >= 1) {
            setHeaderPage(
              parseGetCat.type +
                ': "' +
                parseGetCat.name +
                '"' +
                " category: " +
                data.result[rnd].categories[0]
            );
          } else {
            setHeaderPage(parseGetCat.type + ': "' + parseGetCat.name + '"');
          }
        } else {
          addJokes(data.value);
        }
        setTranslate(getLocalValue("lang"));
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
    jokes.textContent = res.translatedText;
  });
}
