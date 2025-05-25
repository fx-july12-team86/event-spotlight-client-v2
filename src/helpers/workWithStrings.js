export function truncateByWords(text, maxLength = 25) {
    if (text.length <= maxLength) return text;

    const words = text.split(" ");
    let result = "";

    for (let word of words) {
        // Додаємо пробіл лише якщо не перше слово
        const next = result.length ? result + " " + word : word;

        if (next.length + 3 > maxLength) break; // +3 для "..."
        result = next;
    }

    return result + "...";
}