
const handleAllOrder=()=>{
    const accessToken = localStorage.getItem('access')
    
    if(accessToken){
        fetch('http://127.0.0.1:8000/products/orders/',{
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${accessToken}`
        }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            const parent = document.getElementById('ordersTableBody')
            data.forEach(ele => {
                const tr = document.createElement("tr")
                const productNames = ele.order_items.map(item => item.product.name).join(", ");
                const productQuantity = ele.order_items.map(item => item.quantity).join(", ");
                const productPrice = ele.order_items.map(item => item.price).join(", ");

                tr.innerHTML = `
                <td class="py-3 px-6 text-left whitespace-nowrap">${ele.id}</td>
                <td class="py-3 px-6 text-left">${ele.username}</td>
                <td class="py-3 px-6 text-left">${ele.total_price}</td>
                <td class="py-3 px-6 text-left">${ele.created_at}</td>
                <td class="py-3 px-6 text-left">${ele.status}</td>
                <td class="py-3 px-6 text-left">${ele.is_paid}</td>
                <td class="py-3 px-6 text-left">${productNames}</td>
                <td class="py-3 px-6 text-left">${productQuantity}</td>
                <td class="py-3 px-6 text-left">${productPrice}</td>
                <td class="py-3 px-6 text-left">
                        
                    <a href="/src/pages/update_orders.html?order_id=${ele.id}">
                    <button class="bg-blue-500 px-3 py-2 rounded-md text-white hover:bg-blue-800">Edit</button>
                    </a>
                           
                </td>
                `
                parent.appendChild(tr)
                
            });
        })
    }
}

const UpdateOrder=(event)=>{
    event.preventDefault()
    const accessToken = localStorage.getItem('access')
    const ored_id = new URLSearchParams(window.location.search).get('order_id')
    const is_paid = document.getElementById('is_paid_field').checked
    const status = document.getElementById('status_filed').value

    if (accessToken){
        fetch(`http://127.0.0.1:8000/products/orders/${ored_id}/`,{
            method : 'PATCH',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            },
            body : JSON.stringify({
                is_paid:is_paid,
                status:status
            })
        })
        .then(res => {
            if (res.ok) {
                document.getElementById("update_orders_error").style.display = "block"
                document.getElementById("update_orders_error").innerText = "Order Update successful."
                setTimeout(()=>{
                    window.location.href = "/src/pages/all_users_orders.html"
                },3000)
            } else {
                return res.json().then(data => {
                    alert("Error: " + JSON.stringify(data));
                });
            }
        })
        .catch(err => {
            alert("Network error: " + err.message);
        });
        
    }
}

handleAllOrder()