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

document.addEventListener("keydown", function (keyBoardEvent) {
  if (keyBoardEvent.key == "r") {
    asincFuncs(categories)
      .then((data) => {
        generateTable(data);
      })
      .catch((error) => {
        console.log(error);
      });
    aux++;
  }
});

// function addElement(value) {
//   let div = document.getElementById("jokes");
//   div.innerHTML = value;
// }

const langs = "http://172.42.61.58:5050/languages";

getLangsAvaible(langs);

function getLangsAvaible(langs) {
  asincFuncs(langs)
    .then((data) => {
      data.forEach((element) => {
        let list = document.getElementById("list_lang");
        let opt = document.createElement("option");
        opt.text = element.name;
        if(element.name == "Spanish"){
            opt.selected="selected"
        }
        list.options.add(opt);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function generateTable(arr) {
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    let a = document.createElement("a")
    a.href ="formulario.html"
    a.textContent = arr[i]  

    cell.appendChild(a);
    row.appendChild(cell);

    tblBody.appendChild(row);
  }

  tbl.appendChild(tblBody);

  document.body.appendChild(tbl);
  tbl.setAttribute("border", "2");
}
