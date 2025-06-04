
const loadOrders=()=>{
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
            if(data){
                
                const parent = document.getElementById('ordersTableBody')
                const FiveItems = data.slice(0,10)
                FiveItems.forEach(ele => {

                    const created = new Date(ele.created_at).toLocaleString('en-GB',{
                    day : '2-digit',month : 'short', year : 'numeric',
                    hour : '2-digit', minute : '2-digit',
                    hour12 : true
                    })

                    const statusClass = ele.status == 'delivered'
                        ? 'bg-green-200 text-green-600'
                        : 'bg-red-200 text-red-600'

                    const tr = document.createElement('tr')
                    tr.innerHTML = `
                    <td class="py-3 px-6 text-left whitespace-nowrap">${ele.id}</td>
                                <td class="py-3 px-6 text-left">${ele.username}</td>
                                <td class="py-3 px-6 text-left">$${ele.total_price}</td>
                                <td class="py-3 px-6 text-left">${created}</td>
                                <td class="py-3 px-6 text-left">
                                    <span class=" ${statusClass} py-2 px-3 rounded-md text-xs">${ele.status}</span>
                                </td>
                    `
                    parent.appendChild(tr)
                });
            }

        })
    }
}

loadOrders()