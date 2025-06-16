const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function LogIn(email, password) {
    const response = await fetch(`${VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })


    if (!response.ok) {
        throw new Error("Invalid credentials")
    }

    return response.json()
}

export async function AccountRegistration(userName, email, password) {
    const response = await fetch(`${VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userName: userName,
            email: email,
            password: password,
            repeatPassword: password
        }),
    })

    return response.json()
}

export async function getUserData() {
    const response = await fetch(`${VITE_API_URL}/auth`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })

    return response.json()
}

export async function updateUserData(obj) {
    const response = await fetch(`${VITE_API_URL}/auth/username`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(obj),
    })

    if (response.ok) {
        return true
    }
    else {
        throw new Error("error in updating username")
    }
}

export async function updateUserPassword(obj) {
    fetch(`${VITE_API_URL}/auth/password`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(obj),
    })
}

export async function getUserEvents() {
    const response = await fetch(`${VITE_API_URL}/my_events`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })

    return response.json()
}

export async function checkUserToken() {
    const response = await fetch(`${VITE_API_URL}/auth/ping`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    })
    const data = await response.json()
    return data
}