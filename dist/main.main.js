(()=>{"use strict";class e{constructor(e){this.name=e}}document.getElementById("table").addEventListener("click",(function(t){let n=new e(t.target.id);var o=JSON.stringify(n);localStorage.setItem("category",o)})),async function(e){const t=await fetch(e);return await t.json()}("https://api.chucknorris.io/jokes/categories").then((e=>{!function(e){const t=document.getElementById("table"),n=document.getElementById("categorias");for(let t=0;t<e.length;t++){const o=document.createElement("tr"),r=document.createElement("td");let a=document.createElement("a");a.href="formulario.html",a.id=e[t],a.textContent=e[t],r.appendChild(a),o.appendChild(r),n.appendChild(o)}t.appendChild(n),t.setAttribute("border","2")}(e)}));let t=document.getElementById("search-phrase");t.addEventListener("keydown",(function(n){if("Enter"==n.key){let n=new e(t.value);n.type="query";var o=JSON.stringify(n);localStorage.setItem("category",o),window.location.href="formulario.html"}})),document.getElementById("random").addEventListener("click",(()=>{let t=new e("random");t.type="random";var n=JSON.stringify(t);localStorage.setItem("category",n),window.location.href="formulario.html"}))})();