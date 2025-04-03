const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function getEvents() {
    const response = await fetch(`${VITE_API_URL}/events`);
    const data = await response.json();
    return data;
}

export async function getEventsCity(city) {
    const response = await fetch(`${VITE_API_URL}/events/city`);
    const data = await response.json();
    return data;
}