

const loadNavbar=()=>{
  fetch('/src/components/navbar.html')
  .then(res=>res.text())
  .then(data=>{
    document.getElementById("navbar-placeholder").innerHTML = data;
    handleNavbar()
  })
}

const handleNavbar=()=>{
    const accessToken = localStorage.getItem('access')
    const loginRegisterDiv = document.querySelector('.login-register-section')
    const profileDropdown = document.querySelector('.profile-dropdown')
    const dashboardLink = document.getElementById('dashboardLink')

    

    if (accessToken) {
      loginRegisterDiv.style.display = 'none'
      profileDropdown.classList.remove('hidden')

      // if (userRole === 'admin' || userRole === 'seller') {
      //   dashboardLink.classList.remove('hidden')
      // }
    }
    
  }

const toggleDropdown=()=>{
  const Dropdown = document.getElementById('dropdown')
  Dropdown.classList.toggle('hidden')
}


const showCart=()=>{
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
            
            const totalItems = data.items?.length || 0;
            const cart_item_value = document.getElementById('cart_item_value')
            cart_item_value.innerText = totalItems
        })
        
    }
}
showCart()
window.addEventListener("pageshow",showCart)
loadNavbar()