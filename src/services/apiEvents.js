const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function getEvents(page = 0, size = 8) {
    const response = await fetch(`${VITE_API_URL}/events?page=${page}&size=${size}`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
        }
    });
    const data = await response.json();
    return data;
}

export async function getEventsByFilter(filterObj) {
    const response = await fetch(`${VITE_API_URL}/events/search?page=0&size=4`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
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

export async function getEventsByCity(city) {
    const response = await fetch(`${VITE_API_URL}/events/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
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

export async function getEventsCatalog(filterObj, page = 0, sort = ["startTime", "asc"]) {
    const response = await fetch(`${VITE_API_URL}/events/search/grouped-by-month?page=${page}&innerSortBy=${sort.at(0)}&innerSortDir=${sort.at(1)}`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: JSON.stringify(filterObj)
    })
    const data = await response.json()

    return data
}

export async function addFavorite(id) {
    const response = await fetch(`${VITE_API_URL}/favorites/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
        },
    })
    const data = await response.json()

    return data
}

export async function removeFavorite(id) {
    const response = await fetch(`${VITE_API_URL}/favorites/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
        },
    })
    const data = await response.json()
    console.log(data)
    return data
}

export async function getFavorites() {
    const response = await fetch(`${VITE_API_URL}/favorites`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
        }

    })

    const data = await response.json()
    return data
}

export async function deleteEvent(id) {
    const response = await fetch(`${VITE_API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
        }
    })
    if (response.ok) {
        return true
    }
    else {
        console.error("Помилка при видаленні івента")
    }
}