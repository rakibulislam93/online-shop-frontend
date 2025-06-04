
const loadAllUser=()=>{
    const search_user_role = document.getElementById('seachr_user_role').value
    const accessToken = localStorage.getItem('access')
    const local_user_role = localStorage.getItem('user_role')
    
    if(accessToken && local_user_role == "admin"){

        let url = `http://127.0.0.1:8000/api/auth/account/all_user/`

        if (search_user_role){
            url += `?search=${search_user_role}`
        }
        fetch(url,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${accessToken}`
            }

        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            const parent = document.getElementById('allUserTableBody')
            parent.innerHTML = " " 
            data.forEach(user => {
                const tr = document.createElement("tr")
                tr.innerHTML = `
                <td class="py-3 px-6 text-left whitespace-nowrap">${user.id}</td>
                    <td class="py-3 px-6 text-left">${user.username}</td>
                    <td class="py-3 px-6 text-left">${user.email}</td>
                    <td class="py-3 px-6 text-left">${user.is_active}</td>
                    <td class="py-3 px-6 text-left">${user.user_role}</td>
                    <td class="py-3 px-6 text-left">${user.approval_status}</td>
                    <td class="py-3 px-6 text-left">${user.is_staff}</td>
                    <td class="py-3 px-6 text-left">
                        <a href="/src/pages/update_user.html?user_id=${user.id}">
                        <button class="bg-blue-500 px-3 py-2 rounded-md text-white hover:bg-blue-800">Edit</button>
                        </a>
                        <button onclick="handleDeleteUser(${user.id})" class="bg-red-500 px-3 py-2 rounded-md text-white hover:bg-red-800 mt-2 md:mt-0" >Delete</button>
                    </td>
                    
                `
                parent.appendChild(tr)
            });
        })

    }
    else{
        window.location.href = "/src/pages/index.html"
    }
    
}

const handleAddNewUser=(event)=>{
    event.preventDefault()
    const userErrorDiv = document.getElementById('new_user_error')
    userErrorDiv.innerHTML = " "

    username = document.getElementById('username').value
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    is_active = document.getElementById('is_active').value
    user_role = document.getElementById('user_role').value
    approval_status = document.getElementById('approval_status').value
    is_staff = document.getElementById('is_staff').value 
    const info = {
        username:username,
        password:password,
        email:email,
        is_active:is_active,
        user_role:user_role,
        approval_status:approval_status,
        is_staff : is_staff
    }

    const accessToken = localStorage.getItem('access')
    const local_user_role = localStorage.getItem('user_role')

    if (accessToken){
        fetch('http://127.0.0.1:8000/api/auth/account/all_user/',{
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${accessToken}`
        },
        body : JSON.stringify(info)
        })
        .then(res =>{
            if(!res.ok){
                return res.json().then(errData=>{
                    throw errData;
                });
            }
            return res.json()
        })
        .then(data=>{
            console.log(data)

            userErrorDiv.style.display = "block"
            userErrorDiv.innerHTML = `<p class="text-green-600">New User create successful</p>`

            setTimeout(()=>{
                    window.location.href = "/src/pages/show_all_user.html"
            },2000)
                
            
        })

        .catch(error => {
            console.log("Error:", error);
            userErrorDiv.style.display = "block";
            if (error.username) {
                userErrorDiv.innerHTML = `<p class="text-red-600">Username already exists</p>`;
            } else if (error.email) {
                userErrorDiv.innerHTML = `<p class="text-red-600">Email already exists</p>`;
            } else {
                userErrorDiv.innerHTML = `<p class="text-red-600">Something went wrong</p>`;
            }
        });

    }
}

const handleDeleteUser = (id) => {

    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) {
        return; // user cancel করল
    }

    const accessToken = localStorage.getItem("access");

    if (accessToken) {
        fetch(`http://127.0.0.1:8000/api/auth/account/all_user/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(res => {
            if (res.status === 204) {
                alert("User deleted successfully");
                location.reload();  // Optional: reload to update UI
            } else {
                alert("Failed to delete user");
            }
        })
        .catch(error => {
            console.error("Delete error:", error);
            alert("An error occurred while deleting user.");
        });
    }
};

const UpdateUser=(event)=>{
    event.preventDefault()

    const user_id = new URLSearchParams(window.location.search).get('user_id')

    is_active = document.getElementById('update_is_active').checked
    user_role = document.getElementById('update_user_role').value
    approval_status = document.getElementById('update_approval_status').value
    is_staff = document.getElementById('update_is_staff').checked

    const accessToken = localStorage.getItem("access");

    const info = {
        is_active : is_active,
        user_role : user_role,
        approval_status : approval_status,
        is_staff : is_staff
    }
    console.log(info)
    if (accessToken) {
        fetch(`http://127.0.0.1:8000/api/auth/account/all_user/${user_id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body : JSON.stringify(info)
        })
        .then(res=>{
            if(res.ok){
                setTimeout(() => {
                    window.location.href = "/src/pages/show_all_user.html"
                }, 1000);
            }
        })
        
    }

}

loadAllUser()