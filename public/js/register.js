const initializeRegister = () => {
    document.getElementById("registerForm").addEventListener("submit", (event) => {
        fetchData(event)
    })
}

const fetchData = async (event) => {
    event.preventDefault()

    const formData = {
        username: event.target.username.value,
        password: event.target.password.value
    }

    try {
        const response = await fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
    } catch (error) {
        console.log(`Error while trying to register: ${error.message}`)
    }
}