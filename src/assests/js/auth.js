const handleRegister = (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;
    const user_role = document.getElementById('user_role').value;

    const errorDiv = document.getElementById('register_error');
    const loadingDiv = document.getElementById('register_loading')
    loadingDiv.classList.remove('hidden')
    errorDiv.style.display = 'block'
    errorDiv.innerHTML = "";

    //  Password regex validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    if (password !== confirm_password) {
        loadingDiv.classList.add('hidden')
        errorDiv.innerHTML = "<p>Passwords do not match</p>";
        return;
    }

    if (!passwordRegex.test(password)) {
        loadingDiv.classList.add('hidden')
        errorDiv.innerHTML = "<p>Password must be at least 8 characters and include uppercase, lowercase, number, and special character.</p>";
        return;
    }

    const info = {
        username: username,
        password: password,
        email: email,
        confirm_password: confirm_password,
        user_role: user_role,
    };

    fetch('http://127.0.0.1:8000/api/auth/account/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info)
    })
    .then(res => res.json())
    .then(data => {
        
        let errorHtml = '';

        if (data.username || data.email) {
            if (data.username) {
                loadingDiv.classList.add('hidden')
                errorHtml += `<p>${data.username[0]}</p>`;
            }
            if (data.email) {
                loadingDiv.classList.add('hidden')
                errorHtml += `<p>${data.email[0]}</p>`;
            }
            
            errorDiv.innerHTML = errorHtml;
        } else {
            
            errorDiv.innerHTML = `${data.message}`
            document.getElementById('registerForm').reset();
        }
    })
    .catch(error => {
        loadingDiv.classList.add('hidden')
        console.error('Error:', error);
        errorDiv.innerHTML = "<p>Something went wrong. Please try again.</p>";
    });
};

const handleLogin=(event)=>{
    event.preventDefault()
    username = document.getElementById('loginUsername').value
    password = document.getElementById('loginPassword').value
    const loaderDiv = document.getElementById('login_loading')
    loaderDiv.style.display = 'block'
    const errorDiv = document.getElementById('login_error')
    errorDiv.innerText = ""

    fetch('http://127.0.0.1:8000/api/auth/account/login/',{
        method : 'POST',
        headers : {
            'Content-Type':'application/json',
        },
        body : JSON.stringify({
            username:username,
            password:password
        })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.error){
            errorDiv.classList.add('bg-red-100','text-red-600')
            errorDiv.classList.remove('bg-green-100','text-green-600')
            errorDiv.style.display = 'block'
            loaderDiv.style.display = 'none'
            errorDiv.innerText = `${data.error}`
        }
        else{

            errorDiv.classList.remove('bg-red-100','text-red-600')
            errorDiv.classList.add('bg-green-100','text-green-600')
            errorDiv.style.display = 'block'
            loaderDiv.style.display = 'none'
            errorDiv.innerText = `${data.message}`
            document.getElementById('loginForm').reset()

            // local storage a access and refress token save korlam 
            localStorage.setItem('access', data.access)
            localStorage.setItem('refresh',data.refresh)
            localStorage.setItem('user_role',data.user_role)
            localStorage.setItem('username',data.username)

            setTimeout(()=>{

                window.location.href = '/index.html'
            },2000)

        }
        
    })
    .catch(error=>{
        console.log(error)
        errorDiv.style.display = 'block'
        loaderDiv.style.display = 'none'
        errorDiv.innerText = 'Something went wrong. Please try again.'
    })

    
}

const handleLogout=()=> {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    localStorage.removeItem('user_role')
    localStorage.removeItem('username')
    alert('Logout successfull')
    window.location.href = '/index.html'
}