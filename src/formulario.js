import { asyncFunc } from "./funcs.js";
import { Category } from "./ClassCategory.js";
import { Phrase } from "./ClassFrase.js";
import { addElement } from "./funcs.js";
import { pressKey } from "./funcs.js";
import { addJokes } from "./funcs.js";

const jokes = "https://api.chucknorris.io/jokes/random";
let category = "https://api.chucknorris.io/jokes/random?category=";
let queryType = "https://api.chucknorris.io/jokes/random?query=";

function setCategory() {

  let query = localStorage.getItem("category");

  let parseCat = JSON.parse(query);
    console.log(parseCat)
    let cate = document.getElementById("h2-cat");

    if(parseCat.type == "random"){
        category = jokes
        cate.innerHTML = "Random"

    }else if (parseCat.type == undefined){
      cate.innerHTML = cate.innerHTML + " " + parseCat.name;
      category = category + parseCat.name;

    }else{
      cate.innerHTML = parseCat.type  + ': "' +parseCat.name+ '"';
      category = queryType + parseCat.name
    }
    
    
}
setCategory();

asyncFunc(category).then((res) => {
    console.log(category)
    addJokes(res.value);
});

document.addEventListener("keydown", function (keyBoardEvent) {
    if (keyBoardEvent.key == "r") {
    //   console.log(category)
    asyncFunc(category)
      .then((data) => {
        // console.log(data);
        addJokes(data.value);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

// pressKey(category)
