const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function getEvents(page = 0, size = 8) {
    const response = await fetch(`${VITE_API_URL}/events?page=${page}&size=${size}`);
    const data = await response.json();
    return data;
}

export async function getEventsByFilter(filterObj) {
    const response = await fetch(`${VITE_API_URL}/events/search?page=0&size=4`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(filterObj)
    })
    const data = await response.json()

    return data

}

export async function getEventById(id) {
    const response = await fetch(`${VITE_API_URL}/events/${id}`);
    const data = await response.json();
    return data;
}

export async function getEventsCity(city = "Київ") {
    const response = await fetch(`${VITE_API_URL}/events/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "cities": [
                city
            ]
        }),
    });
    const data = await response.json();
    return data;
}

export async function getEventsOnline() {
    const response = await fetch(`${VITE_API_URL}/events/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "onlineStatus": [
                true
            ]
        }),
    });
    const data = await response.json();
    return data;
}

// export async function getCategoryById(id) {
//     const response = await fetch(`${VITE_API_URL}/categories/${id}`)
//     const data = await response.json()

//     return data
// }