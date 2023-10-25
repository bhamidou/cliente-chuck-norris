const { forEach } = require("lodash");

let data = localStorage.getItem("lang");
let lang = "es";

if (data != null) {
    console.log(data)
    let parseObjLang = JSON.parse(data);
    lang = parseObjLang;
    
} else {
    console.log("aqui")
    let parseJSON = JSON.stringify(lang);
  localStorage.setItem("lang", parseJSON);
}


async function asincFuncs(api) {
  const res = await fetch(api);

  let data = await res.json();

  return data;
}

const jokes = "https://api.chucknorris.io/jokes/random";
const categories = "https://api.chucknorris.io/jokes/categories";

let aux = 0;

if (aux <= 1) {
  asincFuncs(categories).then((data) => {
    // addElement(data);
    generateTable(data);
  });
}

// document.addEventListener("keydown", function (keyBoardEvent) {
//   if (keyBoardEvent.key == "r") {
//     asincFuncs(categories)
//       .then((data) => {
//         generateTable(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     aux++;
//   }
// });

// function addElement(value) {
//   let div = document.getElementById("jokes");
//   div.innerHTML = value;
// }

const langs = "http://172.42.61.58:5050/languages";



function getLangsAvaible(langs) {
  asincFuncs(langs)
    .then((data) => {
      data.forEach((element) => {
        let list = document.getElementById("list_lang");
        let opt = document.createElement("option");
        opt.text = element.name;
        opt.id = element.code;
        if (element.name == "Spanish") {
          opt.selected = "selected";
          let parseJSON = JSON.stringify(element.code);
          localStorage.setItem("lang", parseJSON);
        }
        list.options.add(opt);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function generateTable(arr) {
  const tbl = document.getElementById("table");
  const tblBody = document.getElementById("categorias");

  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    let a = document.createElement("a");
    a.href = "formulario.html";

    a.textContent = arr[i]

    cell.appendChild(a);
    row.appendChild(cell);

    tblBody.appendChild(row);
  }

  tbl.appendChild(tblBody);

  tbl.setAttribute("border", "2");
}

let localTrans = "http://172.42.61.58:5050/translate";

async function translate(query, lang) {
  const res = await fetch(localTrans, {
    method: "POST",
    body: JSON.stringify({
      q: query,
      source: "auto",
      target: lang,
      format: "text",
      api_key: "",
    }),
    headers: { "Content-Type": "application/json" },
  });
  let response = await res.json();
  return response;
}
getLangsAvaible(langs);


let listlang = document.getElementById("list_lang");


listlang.addEventListener("change", function () {
        let i = 0;
            while (i < listlang.length) {
                if (listlang[i].selected) {
                    let parseJSON = JSON.stringify(listlang[i].id);
                    localStorage.setItem("lang",parseJSON)
                }
                i++;
            }
    generateTable(data)
});

function translatePage(){
    let body = document.body.getElementsByTagName('*');
    
    let i = 0
    while(i<body.length){
        if(body[i].textContent != null){
            translate( body[i].textContent, "fr")
            .then((res)=>{
                console.log("prueba texto")
                body[i].textContent = res
            }).catch((error)=>{
                console.log(error)
            })
        }
        i++
    }
    // body.forEach( elements => {
    //     console.log(translate(elements.innterHTML, "fr"))
    // })
    
};

let search = document.getElementById("search-phrase")

search.addEventListener('keydown', function(keyBoardEvent) {
    console.log(search.value)
    if(keyBoardEvent.key == "Enter"){
        const searchLink = "https://api.chucknorris.io/jokes/search?query="+search.value
        asincFuncs(searchLink)
        .then((data) =>{
            data.result.forEach(element => {
                console.log(element.value)
                addElement(element.value)
            });
        } )
        .catch((error) => {
            console.log(error)
        })
    }
})

function addElement(element) {

    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(element);
    newDiv.appendChild(newContent);

    const currentDiv = document.getElementById("rtn-search");
    const hrElement = document.createElement("hr");
    currentDiv.appendChild(hrElement)
    document.body.insertBefore(newDiv, currentDiv);
  }