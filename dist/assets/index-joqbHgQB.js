(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const f=()=>{fetch("/src/components/navbar.html").then(t=>t.text()).then(t=>{document.getElementById("navbar-placeholder").innerHTML=t,y()})},y=()=>{const t=localStorage.getItem("access"),e=document.querySelector(".login-register-section"),s=document.querySelector(".profile-dropdown");document.getElementById("dashboardLink"),t&&(e.style.display="none",s.classList.remove("hidden"))},x=()=>{document.getElementById("dropdown").classList.toggle("hidden")},g=()=>{const t=localStorage.getItem("access");t&&fetch("http://127.0.0.1:8000/products/cart/",{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}}).then(e=>e.json()).then(e=>{var o;const s=((o=e.items)==null?void 0:o.length)||0,r=document.getElementById("cart_item_value");r.innerText=s})};g();window.addEventListener("pageshow",g);f();window.toggleDropdown=x;const w=()=>{fetch("http://127.0.0.1:8000/products/list/").then(t=>t.json()).then(t=>{document.getElementById("product_loader").style.display="none",console.log(t),b(t)})},b=t=>{const e=document.getElementById("product_container");t.forEach(s=>{const r=document.createElement("div");r.className="w-60 border transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer bg-white",r.innerHTML=`
        <div class="p-3 space-y-2">
            <h2 class="font-poppins font-semibold text-gray-700">${s.name}</h2>
            <img src="${s.image}" alt="" class="w-full h-40">
            <h4 class="text-xl text-orange-400">$ ${s.price}</h4>
        </div>

        `,r.addEventListener("click",()=>{window.location.href=`./src/pages/productDetails.html?product_id=${s.id}`}),e.appendChild(r)})},v=()=>{const t=new URLSearchParams(window.location.search).get("product_id");fetch(`http://127.0.0.1:8000/products/list/${t}`).then(e=>e.json()).then(e=>{const s=new Date(e.created_at).toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}),r=new Date(e.updated_at).toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:!0}),o=document.getElementById("product_extra_info");o.innerHTML=`
          <h1 class="font-poppins text-xl text-gray-500 underline">Product Extra Information : </h1> 
          <h3><span class="text-xl font-bold">Name :</span> ${e.name} </h3>
          <h3><span class="text-xl font-bold">Title :</span> ${e.title} </h3>
          <h3><span class="text-xl font-bold">Descriptions : </span>${e.description} </h3>
          <h3><span class="text-xl font-bold">Quantity :</span> ${e.quantity} pis </h3>
          <h3><span class="text-xl font-bold">Created Date : </span> ${s} </h3>
          <h3><span class="text-xl font-bold">Updated Date : </span>${r} </h3>
          <h3><span class="text-xl font-bold">Added By :</span> ${e.created_by} </h3>
        `,console.log(e);const n=document.getElementById("product_image");n.innerHTML=`
        <img class="w-[448px] sm:w-[800px] rounded-lg" src="${e.image}" alt="Product Image">
        `;const a=document.getElementById("prdouct_img");a.innerHTML=`
        <img class="max-w-sm" src="${e.image}" alt="Product Image">
        `;const l=document.getElementById("product_info");l.innerHTML=`
            
            <h3 class="text-2xl">${e.title}</h3>
            <small class="text-xs " >⭐⭐⭐⭐<span class="text-sm text-blue-600">Ratings 1107</span></small>
            
            <p class="text-xl text-gray-600">
            ${e.quantity<=0?"Out of Stock":"In Stock"}
            </p>

            <div class="border p-6 bg-green-800 rounded-md">
                <h3 class="text-orange-500 text-center text-xl">Checkout and</h3>
                <h2 class="text-2xl text-center italic text-white">Shop Now.!</h2>
            </div>

            <h2 class="text-2xl text-orange-600">$ ${e.price}</h2>

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
            <button onclick="handleAddToCart(${e.id})" class="w-1/2 border p-3 rounded-md bg-orange-500 text-white" >Add to cart</button>
            </div>

            

        `;const u=document.getElementById("product_reviews"),m=document.getElementById("count_reviews");m.innerText=`Total Reviews ${e.reviews.length}`,e.reviews.forEach(h=>{const p=document.createElement("div");p.className="space-y-2",p.innerHTML=`
            <h3 class="mt-5">Reviewer : ${h.reviewer_name}</h3>
            <p>Comment : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quibusdam placeat unde facilis officiis voluptatem. In eaque alias cum libero.</p>
            <h3>Rating : ${h.rating_display} </h3>
            <hr>
            `,u.appendChild(p)});const i=document.getElementById("decrease"),d=document.getElementById("increase"),c=document.getElementById("quantity");i.addEventListener("click",()=>{let h=parseInt(c.innerText);h>1&&(c.innerText=h-1)}),d.addEventListener("click",()=>{let h=parseInt(c.innerText);c.innerText=h+1})})};w();v();const E=()=>{fetch("http://127.0.0.1:8000/products/category/").then(t=>t.json()).then(t=>{document.getElementById("cat_loader").style.display="none";const e=document.getElementById("all_category");t.forEach(s=>{const r=document.createElement("div");r.className="border w-40 p-2 h-36 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer",r.innerHTML=`
                <img class="w-full h-24" src="${s.icon}" alt="">
                <h3 class="font-semibold">${s.name}</h3>
            `,e.appendChild(r),r.addEventListener("click",()=>{window.location.href=`./src/pages/categoryDetails.html?product_category=${s.name}`})})})},L=()=>{const t=new URLSearchParams(window.location.search).get("search"),e=new URLSearchParams(window.location.search).get("product_category"),s=new URLSearchParams(window.location.search).get("min_price"),r=new URLSearchParams(window.location.search).get("max_price");let o="http://127.0.0.1:8000/products/list/?";e&&t?o+=`category=${e}&search=${t}`:t?o+=`search=${t}`:o+=`category=${e}`,s&r&&(o+=`&min_price=${s}&max_price=${r}`),fetch(o).then(n=>n.json()).then(n=>{console.log(n);const a=document.getElementById("category_wise_product");n.length==0&&(a.innerHTML='<p class="text-2xl sm:text-center italic flex justify-center"> No Product Found</p>'),n.forEach(l=>{const u=document.createElement("div");u.className="w-60 border transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer bg-white",u.innerHTML=`
            <div class="p-3 space-y-2">
            <h2 class="font-poppins font-semibold text-gray-700">${l.name}</h2>
            <img src="${l.image}" alt="" class="w-full h-40">
            <h4 class="text-xl text-orange-400">$ ${l.price}</h4>
            </div>
            `,a.appendChild(u),u.addEventListener("click",()=>{window.location.href=`/src/pages/productDetails.html?product_id=${l.id}`})})})};E();L();const $=()=>{fetch("/src/components/footer.html").then(t=>t.text()).then(t=>{document.getElementById("footer").innerHTML=t})};$();const I=()=>{fetch("/src/components/chat.html").then(t=>t.text()).then(t=>{document.getElementById("chatbot_container").innerHTML=t;const e=document.getElementById("chatbot-toggle"),s=document.getElementById("chatbox"),r=document.getElementById("chatbot-close"),o=document.getElementById("chat-form"),n=document.getElementById("chat-input"),a=document.getElementById("chat-messages");let l=!1;e.addEventListener("click",()=>s.classList.toggle("hidden")),r.addEventListener("click",()=>s.classList.add("hidden")),n.addEventListener("input",()=>{n.style.height="auto",n.style.height=n.scrollHeight+"px"}),n.addEventListener("keydown",function(i){i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),l||o.dispatchEvent(new Event("submit",{cancelable:!0})))}),o.addEventListener("submit",async i=>{if(i.preventDefault(),l)return;const d=n.value.trim();if(!d)return;l=!0,n.disabled=!0,n.classList.add("opacity-60","cursor-not-allowed"),m("user",d);const c=m("bot","🤖Bot typing...");n.value="",n.style.height="auto",a.scrollTop=a.scrollHeight;try{const p=await(await fetch("http://127.0.0.1:8000/api/chat/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:d})})).json();c.innerHTML=u("bot",`🤖 ${p.response||"No response found or server error"}`)}catch(h){c.innerHTML=u("error",`❌ ${h.message}`)}a.scrollTop=a.scrollHeight,l=!1,n.disabled=!1,n.classList.remove("opacity-60","cursor-not-allowed"),n.focus()});function u(i,d){const c="p-2 rounded-xl max-w-[80%] inline-block whitespace-pre-wrap break-words transition-all duration-200";return i==="user"?`<div class="bg-green-100 text-green-800 ${c}">🧑 ${d}</div>`:i==="bot"?`<div class="bg-blue-100 text-blue-800 ${c}"> ${d}</div>`:`<div class="bg-red-100 text-red-700 ${c}">❌ ${d}</div>`}function m(i,d){const c=document.createElement("div");return c.className=i==="user"?"text-right":"text-left",c.innerHTML=u(i,d),a.appendChild(c),c}})};I();
