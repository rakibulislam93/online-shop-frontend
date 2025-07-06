
const handleOrderCart = ()=>{
    const accessToken = localStorage.getItem('access')
    if(accessToken){
        fetch('http://127.0.0.1:8000/products/cart/',{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            const parent = document.getElementById('cardBody')
            const total_amount = document.getElementById('total_amount')
            let total = 0

            data.items.forEach(ele => {
                total += ele.quantity * ele.product.price
              const tr = document.createElement('tr')
              tr.innerHTML = `
              <td class="px-4 py-2">${data.id}</td>
                            <td class="px-4 py-2">${ele.product.name}</td>
                            <td class="px-4 py-2">${ele.quantity}</td>
                            <td class="px-4 py-2">${ele.product.price}</td>
                            <td class="px-4 py-2">${ele.quantity * ele.product.price}</td>

                            <td class="px-4 py-2">
                                <button onclick="removeItemFromCart(${ele.id})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Remove</button>
                            </td>
              `
              parent.appendChild(tr)
              total_amount.textContent = `Total : ${total}`
            });
        })
    }
}

const removeItemFromCart = (product_id)=>{
    const accessToken = localStorage.getItem('access')
    if(accessToken){
        fetch(`http://127.0.0.1:8000/products/cart/remove/${product_id}/`,{
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data && data.message){
                alert('Item remove successful.')
                location.reload()
            }
        })
        .catch(error=>{
            alert('Something went wrong..')
        })
    }
}

const ClearCart = ()=>{
    const accessToken = localStorage.getItem('access')
    if(accessToken){
        fetch('http://127.0.0.1:8000/products/cart/clear/',{
            method : 'DELETE',
            headers : {
                'Content-Type':'application/json',
                'Authorization':`Bearer ${accessToken}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data && data.message){
                alert(`${data.message}`)
                location.reload()
            }
        })
    }
}

const handleCheckOut=()=>{
    const accessToken = localStorage.getItem('access')
    if(accessToken){
        fetch('http://127.0.0.1:8000/products/checkout/',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data && data.message){
                alert(`${data.message}`)
                location.reload()
            }
        })
    }
    else{
        alert('You are not logged in.!')
    }
}


handleOrderCart()