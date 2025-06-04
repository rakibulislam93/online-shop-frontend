
const loadProduct =()=>{
    fetch('http://127.0.0.1:8000/products/list/')
    .then(res=>res.json())
    .then(data=>{
        document.getElementById('product_loader').style.display="none"
        console.log(data)
        displayProduct(data)
    })
}

const displayProduct=(products)=>{
    const parent = document.getElementById('product_container')
    products.forEach(product => {
        const productCard = document.createElement("div")
        productCard.className = "w-60 border transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer bg-white"

        productCard.innerHTML = `
        <div class="p-3 space-y-2">
            <h2 class="font-poppins font-semibold text-gray-700">${product.name}</h2>
            <img src="${product.image}" alt="" class="w-full h-40">
            <h4 class="text-xl text-orange-400">$ ${product.price}</h4>
        </div>

        `
        productCard.addEventListener("click",()=>{
            window.location.href = `./src/pages/productDetails.html?product_id=${product.id}`
        })
        parent.appendChild(productCard)

    });

}

const showExtraInfo =()=>{
    const productExtraInfo = document.getElementById('product_extra_info');
    productExtraInfo.style.display = productExtraInfo.style.display === 'none' ? 'block' : 'none';
}

const loadProductDetails=()=>{
    const product_id = new URLSearchParams(window.location.search).get('product_id')
    fetch(`http://127.0.0.1:8000/products/list/${product_id}`)
    .then(res=>res.json())
    .then(data=>{

        // format time and date 
        const created = new Date(data.created_at).toLocaleString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
            hour12: true
        });
        // format time and date 
        const updated = new Date(data.updated_at).toLocaleString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
            hour12: true
        });

        const productExtraInfo = document.getElementById('product_extra_info')
        productExtraInfo.innerHTML = `
          <h1 class="font-poppins text-xl text-gray-500 underline">Product Extra Information : </h1> 
          <h3><span class="text-xl font-bold">Name :</span> ${data.name} </h3>
          <h3><span class="text-xl font-bold">Title :</span> ${data.title} </h3>
          <h3><span class="text-xl font-bold">Descriptions : </span>${data.description} </h3>
          <h3><span class="text-xl font-bold">Quantity :</span> ${data.quantity} pis </h3>
          <h3><span class="text-xl font-bold">Created Date : </span> ${created} </h3>
          <h3><span class="text-xl font-bold">Updated Date : </span>${updated} </h3>
          <h3><span class="text-xl font-bold">Added By :</span> ${data.created_by} </h3>
        `
        console.log(data)
        // show for large image....
        const parent = document.getElementById('product_image')
        parent.innerHTML = `
        <img class="w-[448px] sm:w-[800px] rounded-lg" src="${data.image}" alt="Product Image">
        `

        // again show same product image 
        const productImageDiv = document.getElementById('prdouct_img')
        productImageDiv.innerHTML = `
        <img class="max-w-sm" src="${data.image}" alt="Product Image">
        `

        // product information here..
        const productInfoDiv = document.getElementById('product_info')
        productInfoDiv.innerHTML = `
            
            <h3 class="text-2xl">${data.title}</h3>
            <small class="text-xs " >⭐⭐⭐⭐<span class="text-sm text-blue-600">Ratings 1107</span></small>
            
            <p class="text-xl text-gray-600">
            ${data.quantity <= 0 ? 'Out of Stock' : 'In Stock'}
            </p>

            <div class="border p-6 bg-green-800 rounded-md">
                <h3 class="text-orange-500 text-center text-xl">Checkout and</h3>
                <h2 class="text-2xl text-center italic text-white">Shop Now.!</h2>
            </div>

            <h2 class="text-2xl text-orange-600">$ ${data.price}</h2>

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
            <button onclick="handleAddToCart(${data.id})" class="w-1/2 border p-3 rounded-md bg-orange-500 text-white" >Add to cart</button>
            </div>

            

        `;

        // handle product review 
        const productReviewDiv = document.getElementById('product_reviews')

        // count product reviews 
        const ReviewCount = document.getElementById('count_reviews')
        ReviewCount.innerText = `Total Reviews ${data.reviews.length}`

        
        data.reviews.forEach(review => {
            const div = document.createElement("div")
            div.className = "space-y-2"
            div.innerHTML = `
            <h3 class="mt-5">Reviewer : ${review.reviewer_name}</h3>
            <p>Comment : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium quibusdam placeat unde facilis officiis voluptatem. In eaque alias cum libero.</p>
            <h3>Rating : ${review.rating_display} </h3>
            <hr>
            `
            productReviewDiv.appendChild(div)
            
        });
        


        // handle quantity button..... 
        const decreaseBtn = document.getElementById('decrease');
        const increaseBtn = document.getElementById('increase');
        const quantitySpan = document.getElementById('quantity');

        decreaseBtn.addEventListener('click', () => {
            let currentQuantity = parseInt(quantitySpan.innerText);
            if (currentQuantity > 1) {
                quantitySpan.innerText = currentQuantity - 1;
            }
        });

        increaseBtn.addEventListener('click', () => {
            let currentQuantity = parseInt(quantitySpan.innerText);
            quantitySpan.innerText = currentQuantity + 1;
        });
        
        

    })
}

const handleAddToCart=(product_id)=>{
    const accessToken = localStorage.getItem('access')
    const quantity = parseInt(document.getElementById('quantity').innerText)
    

    if(accessToken){
        fetch('http://127.0.0.1:8000/products/cart/add/',{
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            },
            body : JSON.stringify({
                product_id : product_id,
                quantity : quantity
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.message){
                alert('Product added your card')
                const cart_item_value = document.getElementById('cart_item_value')
                let current = parseInt(cart_item_value.innerText) || 0;
                cart_item_value.innerText = current + 1
            }
        })
        .catch(error=>{
            alert('Something went wrong....')
        })
    }else{
        alert('Please login first')
    }

}

loadProduct()
loadProductDetails()