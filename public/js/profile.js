document.addEventListener('submit', () => {
    const profile = {
        email: email.value,
        password: password.value
    }
    fetch('/api/profile', {
        method: 'POST',
        body: JSON.stringify(profile),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(res => {console.log(res)})
    
        .then(data =>{
            console.log(data)
            if (data.status == 'error'){
                success.style.display = 'none'
                error.style.display = 'block'
                error.innerText = data.error
            } else {
                error.style.display = 'none'
                success.style.display = 'block'
                success.innerText = data.success
            }
        })
})