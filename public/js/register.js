document.addEventListener("submit", () => {
    const register = {
        email: email.value,
        password: password.value
    }
   // console.log(register);
    fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(register),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            console.log(data)
            if (data.status == "error"){
                success.style.display = "none"
                error.style.display = "block"
                error.innerText = data.error
            } else {
                error.style.display = "none"
                success.style.display = "block"
                success.innerText = data.success
            }
        })
})