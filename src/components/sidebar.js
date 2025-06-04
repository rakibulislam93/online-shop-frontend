

const handleDashboardElement=()=>{
    user_role = localStorage.getItem('user_role')
    username = localStorage.getItem('username')
    if (user_role){
        document.getElementById('login_username').innerText = `Log in : ${username}`
        document.getElementById('user_element').innerText = `${user_role} elements`
        if(user_role==="seller"){
            const admin_element = document.querySelectorAll('.admin_element')
            admin_element.forEach(el => {
                el.style.display = 'none'
            });
            const customer_element = document.querySelectorAll('.customer_element')
            customer_element.forEach(el => {
                el.style.display = 'none'
            });
        }
        else if (user_role==='admin'){
            const customer_element = document.querySelectorAll('.customer_element')
            customer_element.forEach(el => {
                el.style.display = 'none'
            });

            const seller_element = document.querySelectorAll('.seller_element')
            seller_element.forEach(el => {
                el.style.display = 'none'
            });
        }
        else{
            const seller_element = document.querySelectorAll('.seller_element')
            seller_element.forEach(el => {
                el.style.display = 'none'
            });
            const admin_element = document.querySelectorAll('.admin_element')
            admin_element.forEach(el => {
                el.style.display = 'none'
            });
        }
    }
    else{
        window.location.href = '/src/pages/login.html'
    }
}


const handleSidebar=()=>{
    fetch('/src/components/sidebar.html')
    .then(res=>res.text())
    .then(data=>{
        
        document.getElementById('sidebar_container').innerHTML = data

        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebarToggle');
        const overlay = document.getElementById('overlay');

        sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
        });

        overlay.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
        });

        handleDashboardElement()
    })
}
handleSidebar()