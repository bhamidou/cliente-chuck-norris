export async function asyncFunc(api) {
  const res = await fetch(api);

  let data = await res.json();

  return data;
}

export function getLangsAvaible(langs) {
  asyncFunc(langs)
    .then((data) => {
      data.forEach((element) => {
        let list = document.getElementById("list_lang");
        let opt = document.createElement("option");
        opt.text = element.name;
        opt.id = element.code;
        let getLangLocal = localStorage.getItem("lang");
        let parseGetLang = JSON.parse(getLangLocal);

        if(parseGetLang == null){
            parseGetLang = "en"
        }

        if (element.code == parseGetLang) {
                opt.selected = "selected";
            }
        list.options.add(opt);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export function generateTable(arr) {
  const tbl = document.getElementById("table");
  const tblBody = document.getElementById("categorias");

  for (let i = 0; i < arr.length; i++) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    let a = document.createElement("a");
    a.href = "formulario.html";
    a.id = arr[i];
    a.textContent = arr[i];

    cell.appendChild(a);
    row.appendChild(cell);

    tblBody.appendChild(row);
  }

  tbl.appendChild(tblBody);

  tbl.setAttribute("border", "2");
}

export function addJokes(value) {
  let div = document.getElementById("jokes");
  div.innerHTML = value;
}

export async function translate(query, lang) {
//   const localTrans = ;
  const res = await fetch("https://translate.badrweb.es/translate", {
    method: "POST",
    body: JSON.stringify({
      q: query,
      source: "en",
      target: "es",
      format: "text",
      api_key: "3cf2a2c6-e2bc-4f57-94cb-1ce6b131e981",
    }),
    headers: { "Content-Type": "application/json" },
  });
  let response = await res.json();
  return response;
}

export function addElement(element) {
  const newDiv = document.createElement("div");
  const newContent = document.createTextNode(element);
  newDiv.appendChild(newContent);

  const currentDiv = document.getElementById("rtn-search");
  const hrElement = document.createElement("hr");
  currentDiv.appendChild(hrElement);
  document.body.insertBefore(newDiv, currentDiv);
}
