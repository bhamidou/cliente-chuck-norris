(()=>{"use strict";async function e(e){const n=await fetch(e);return await n.json()}function n(e){document.getElementById("jokes").innerHTML=e}let t="https://api.chucknorris.io/jokes/random?category=";!function(){let e=localStorage.getItem("category"),n=JSON.parse(e);console.log(n);let o=document.getElementById("h2-cat");"random"==n.type?(t="https://api.chucknorris.io/jokes/random",o.innerHTML="Random"):null==n.type?(o.innerHTML=o.innerHTML+" "+n.name,t+=n.name):(o.innerHTML=n.type+': "'+n.name+'"',t="https://api.chucknorris.io/jokes/random?query="+n.name)}(),e(t).then((e=>{console.log(t),n(e.value)})),document.addEventListener("keydown",(function(o){"r"==o.key&&e(t).then((e=>{n(e.value)})).catch((e=>{console.log(e)}))}))})();