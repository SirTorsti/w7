const initializeLogin = () => {
    document.getElementById("loginForm").addEventListener("submit", (event) => {
        fetchData(event)
    })
}

const fetchData = async(event) => {
    event.preventDefault()

    const formData = {
        email: event.target.email.value,
        password: event.target.password.value,
    }

    try {
        const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    if (!response.ok) {
        document.getElementById("error").innerText = "Error while logging in"
    } else {
        const data = await response.json()

        if(data.token) {
            localStorage.setItem("token", data.token)
            window.location.href = "/"
        }
    }
    } catch (error) {
        console.log(`Error while trying to registe: ${error.message}`)
    }
}

initializeLogin()