const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function LogIn(email, password) {
    const data = await fetch(`${VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })


    if (!data.ok) {
        throw new Error("Invalid credentials")
    }

    return data.json()
}

export async function AccountRegistration(userName, email, password) {
    const data = await fetch(`${VITE_API_URL}/auth/register`, {
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

    return data.json()
}