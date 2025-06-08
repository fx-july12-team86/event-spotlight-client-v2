export function formatUkrainianDate(dateStr) {
    // Разбиваем строку "2025-06-21" на [год, месяц, день]
    const [year, month, day] = dateStr.split('-').map(Number);

    // Создаём объект Date
    const date = new Date(year, month - 1, day);

    // Форматируем дату по-украински
    const formatted = new Intl.DateTimeFormat('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
        .format(date)
        .replace(' р.', '');

    // Розбиваємо на частини, щоб скоротити місяць
    const parts = formatted.split(' ');
    const dayStr = parts[0];
    const monthStr = parts[1].slice(0, 3) + '.';
    const yearStr = parts[2];

    return `${dayStr} ${monthStr} ${yearStr}`;
}
export function isValidDateRange(str) {
    if (typeof str !== 'string') return false;

    // Разделяем по дефису с возможными пробелами
    const parts = str.split(/\s*-\s*/);
    if (parts.length !== 2) return false;

    const isValidDate = (dateStr) => {
        const regex = /^\d{2}\.\d{2}\.\d{4}$/;
        if (!regex.test(dateStr)) return false;

        const [day, month, year] = dateStr.split('.').map(Number);
        const date = new Date(year, month - 1, day);

        return (
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day
        );
    };

    return isValidDate(parts[0]) && isValidDate(parts[1]);
}

export function formatTimeCreateEvent(dateStr, timeStr) {
    if (!dateStr || !timeStr) return null;

    const [day, month, year] = dateStr.split(".");
    const [hours, minutes] = timeStr.split(":");

    const date = new Date(
        Date.UTC(
            Number(year.length === 2 ? "20" + year : year),
            Number(month) - 1,
            Number(day),
            Number(hours),
            Number(minutes),
            0
        )
    );

    return date.toISOString();
}
