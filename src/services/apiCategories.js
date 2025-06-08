const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function getAllCategories() {
    const response = await fetch(`${VITE_API_URL}/categories`);
    const data = await response.json();
    return data;
}