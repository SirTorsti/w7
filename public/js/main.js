const blääh = async () => {

    const token = localStorage.getItem("token")

    if(!token) {
        window.location.href = "http://localhost:3000/login.html"
    } else {
        document.getElementById("logout").classList.remove('hidden');

        const response = await fetch ("/api/private", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (!response.ok) {
            document.getElementById("error").textContent = "Error while fetching users."
        } else {
            const data = await response.json()
            if (data.message) {
                document.getElementById("message").textContent = data.message
            }

        }
    }
}

blääh()

const logout = () => {
    localStorage.removeItem("token")
    window.location.href = "http://localhost:3000/login.html"
}

const logoutButton = document.getElementById("logout")
if (logoutButton) {
    logoutButton.addEventListener("click", logout)
}