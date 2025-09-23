(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const e of o)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const e={};return o.integrity&&(e.integrity=o.integrity),o.referrerPolicy&&(e.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?e.credentials="include":o.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function s(o){if(o.ep)return;o.ep=!0;const e=r(o);fetch(o.href,e)}})();const g=()=>{fetch("http://127.0.0.1:8000/products/list/").then(n=>n.json()).then(n=>{document.getElementById("product_loader").style.display="none",console.log(n),f(n)})},f=n=>{const t=document.getElementById("product_container");n.forEach(r=>{const s=document.createElement("div");s.className="w-60 border transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer bg-white",s.innerHTML=`
        <div class="p-3 space-y-2">
            <h2 class="font-poppins font-semibold text-gray-700">${r.name}</h2>
            <img src="${r.image}" alt="" class="w-full h-40">
            <h4 class="text-xl text-orange-400">$ ${r.price}</h4>
        </div>

        `,s.addEventListener("click",()=>{window.location.href=`./src/pages/productDetails.html?product_id=${r.id}`}),t.appendChild(s)})},y=()=>{const n=new URLSearchParams(window.location.search).get("product_id");fetch(`http://127.0.0.1:8000/products/list/${n}`).then(t=>t.json()).then(t=>{const r=new Date(t.created_at).toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}),s=new Date(t.updated_at).toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}),o=document.getElementById("product_extra_info");o.innerHTML=`
          <h1 class="font-poppins text-xl text-gray-500 underline">Product Extra Information : </h1> 
          <h3><span class="text-xl font-bold">Name :</span> ${t.name} </h3>
          <h3><span class="text-xl font-bold">Title :</span> ${t.title} </h3>
          <h3><span class="text-xl font-bold">Descriptions : </span>${t.description} </h3>
          <h3><span class="text-xl font-bold">Quantity :</span> ${t.quantity} pis </h3>
          <h3><span class="text-xl font-bold">Created Date : </span> ${r} </h3>
          <h3><span class="text-xl font-bold">Updated Date : </span>${s} </h3>
          <h3><span class="text-xl font-bold">Added By :</span> ${t.created_by} </h3>
        `,console.log(t);const e=document.getElementById("product_image");e.innerHTML=`
        <img class="w-[448px] sm:w-[800px] rounded-lg" src="${t.image}" alt="Product Image">
        `;const a=document.getElementById("prdouct_img");a.innerHTML=`
        <img class="max-w-sm" src="${t.image}" alt="Product Image">
        `;const l=document.getElementById("product_info");l.innerHTML=`
            
            <h3 class="text-2xl">${t.title}</h3>
            <small class="text-xs " >⭐⭐⭐⭐<span class="text-sm text-blue-600">Ratings 1107</span></small>
            
            <p class="text-xl text-gray-600">
            ${t.quantity<=0?"Out of Stock":"In Stock"}
            </p>

            <div class="border p-6 bg-green-800 rounded-md">
                <h3 class="text-orange-500 text-center text-xl">Checkout and</h3>
                <h2 class="text-2xl text-center italic text-white">Shop Now.!</h2>
            </div>

            <h2 class="text-2xl text-orange-600">$ ${t.price}</h2>

            <div class="py-3">
                <h3 class="text-gray-500">Quantity : 
                    <button id="decrease" class="px-2 border">-</button> 
                    <span id="quantity">1</span>
                    <button id="increase" class="px-2 border">+</button>
                </h3>
            </div>

            <button class="text-orange-500" onclick="showExtraInfo()">View more information</button>

            <div class ="flex gap-2">
            <button class="w-1/2 border p-3 rounded-md bg-cyan-500 text-white">Buy now</button>
            <button onclick="handleAddToCart(${t.id})" class="w-1/2 border p-3 rounded-md bg-orange-500 text-white" >Add to cart</button>
            </div>

            

        `;const u=document.getElementById("product_reviews"),m=document.getElementById("count_reviews");m.innerText=`Total Reviews ${t.reviews.length}`,t.reviews.forEach(h=>{const p=document.createElement("div");p.className="space-y-2",p.innerHTML=`
            <h3 class="mt-5">Reviewer : ${h.reviewer_name}</h3>
            <p>Comment : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quibusdam placeat unde facilis officiis voluptatem. In eaque alias cum libero.</p>
            <h3>Rating : ${h.rating_display} </h3>
            <hr>
            `,u.appendChild(p)});const i=document.getElementById("decrease"),d=document.getElementById("increase"),c=document.getElementById("quantity");i.addEventListener("click",()=>{let h=parseInt(c.innerText);h>1&&(c.innerText=h-1)}),d.addEventListener("click",()=>{let h=parseInt(c.innerText);c.innerText=h+1})})};g();y();const x=()=>{fetch("http://127.0.0.1:8000/products/category/").then(n=>n.json()).then(n=>{document.getElementById("cat_loader").style.display="none";const t=document.getElementById("all_category");n.forEach(r=>{const s=document.createElement("div");s.className="border w-40 p-2 h-36 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer",s.innerHTML=`
                <img class="w-full h-24" src="${r.icon}" alt="">
                <h3 class="font-semibold">${r.name}</h3>
            `,t.appendChild(s),s.addEventListener("click",()=>{window.location.href=`./src/pages/categoryDetails.html?product_category=${r.name}`})})})},w=()=>{const n=new URLSearchParams(window.location.search).get("search"),t=new URLSearchParams(window.location.search).get("product_category"),r=new URLSearchParams(window.location.search).get("min_price"),s=new URLSearchParams(window.location.search).get("max_price");let o="http://127.0.0.1:8000/products/list/?";t&&n?o+=`category=${t}&search=${n}`:n?o+=`search=${n}`:o+=`category=${t}`,r&s&&(o+=`&min_price=${r}&max_price=${s}`),fetch(o).then(e=>e.json()).then(e=>{console.log(e);const a=document.getElementById("category_wise_product");e.length==0&&(a.innerHTML='<p class="text-2xl sm:text-center italic flex justify-center"> No Product Found</p>'),e.forEach(l=>{const u=document.createElement("div");u.className="w-60 border transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer bg-white",u.innerHTML=`
            <div class="p-3 space-y-2">
            <h2 class="font-poppins font-semibold text-gray-700">${l.name}</h2>
            <img src="${l.image}" alt="" class="w-full h-40">
            <h4 class="text-xl text-orange-400">$ ${l.price}</h4>
            </div>
            `,a.appendChild(u),u.addEventListener("click",()=>{window.location.href=`/src/pages/productDetails.html?product_id=${l.id}`})})})};x();w();const b=()=>{fetch("/src/components/footer.html").then(n=>n.text()).then(n=>{document.getElementById("footer").innerHTML=n})};b();const v=()=>{fetch("/src/components/chat.html").then(n=>n.text()).then(n=>{document.getElementById("chatbot_container").innerHTML=n;const t=document.getElementById("chatbot-toggle"),r=document.getElementById("chatbox"),s=document.getElementById("chatbot-close"),o=document.getElementById("chat-form"),e=document.getElementById("chat-input"),a=document.getElementById("chat-messages");let l=!1;t.addEventListener("click",()=>r.classList.toggle("hidden")),s.addEventListener("click",()=>r.classList.add("hidden")),e.addEventListener("input",()=>{e.style.height="auto",e.style.height=e.scrollHeight+"px"}),e.addEventListener("keydown",function(i){i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),l||o.dispatchEvent(new Event("submit",{cancelable:!0})))}),o.addEventListener("submit",async i=>{if(i.preventDefault(),l)return;const d=e.value.trim();if(!d)return;l=!0,e.disabled=!0,e.classList.add("opacity-60","cursor-not-allowed"),m("user",d);const c=m("bot","🤖Bot typing...");e.value="",e.style.height="auto",a.scrollTop=a.scrollHeight;try{const p=await(await fetch("http://127.0.0.1:8000/api/chat/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:d})})).json();c.innerHTML=u("bot",`🤖 ${p.response||"No response found or server error"}`)}catch(h){c.innerHTML=u("error",`❌ ${h.message}`)}a.scrollTop=a.scrollHeight,l=!1,e.disabled=!1,e.classList.remove("opacity-60","cursor-not-allowed"),e.focus()});function u(i,d){const c="p-2 rounded-xl max-w-[80%] inline-block whitespace-pre-wrap break-words transition-all duration-200";return i==="user"?`<div class="bg-green-100 text-green-800 ${c}">🧑 ${d}</div>`:i==="bot"?`<div class="bg-blue-100 text-blue-800 ${c}"> ${d}</div>`:`<div class="bg-red-100 text-red-700 ${c}">❌ ${d}</div>`}function m(i,d){const c=document.createElement("div");return c.className=i==="user"?"text-right":"text-left",c.innerHTML=u(i,d),a.appendChild(c),c}})};v();
