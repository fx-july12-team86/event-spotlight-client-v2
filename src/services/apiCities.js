const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function getAllCities() {
    const response = await fetch(`${VITE_API_URL}/cities`)
    const data = await response.json();
    return data;
}