export function formatUkrainianDate(dateStr) {
    // Разбиваем строку "01.01.2025" на [день, месяц, год]
    const [day, month, year] = dateStr.split('-').map(Number);

    // Создаём объект Date
    const date = new Date(year, month - 1, day);

    // Форматируем дату
    return new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }).format(date).replace(" р.", "");;
}
