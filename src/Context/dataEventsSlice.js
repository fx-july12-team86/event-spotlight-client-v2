import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    generalEvents: [{
        id: 1,
        category: "Майстер-класи",
        title: "Майстер-клас з миловаріння",
        date: "24 липня 2024",
        time: "19:30",
        location: "Art studio 'Lila', Київ",
        price: "350",
        image: "./images/soapWorkshop.webp",
    },
    {
        id: 2,
        category: "Майстер-класи",
        title: "Курс живопису аквареллю",
        date: "28 липня 2024",
        time: "16:00",
        location: "Creative Hub, Львів",
        price: "500",
        image: "./images/watercolorWorkshop.webp",
    },
    {
        id: 3,
        category: "Кулінарні події",
        title: "Майстер-клас з приготування суші",
        date: "30 липня 2024",
        time: "18:00",
        location: "Gastro Studio, Харків",
        price: "600",
        image: "./images/sushiWorkshop.webp",
    },
    {
        id: 4,
        category: "Йога та релакс",
        title: "Йога на заході сонця",
        date: "1 серпня 2024",
        time: "19:00",
        location: "Парк ім. Шевченка, Київ",
        price: "Вхід вільний",
        image: "./images/yogaSunset.webp",
    },
    {
        id: 5,
        category: "Освітні курси",
        title: "Основи фотографії для початківців",
        date: "5 серпня 2024",
        time: "15:00",
        location: "Photo School, Дніпро",
        price: "700",
        image: "./images/photoCourse.webp",
    },
    {
        id: 6,
        category: "Майстер-класи",
        title: "Кераміка: створення чашок",
        date: "10 серпня 2024",
        time: "14:00",
        location: "Art Clay Studio, Одеса",
        price: "550",
        image: "./images/ceramicWorkshop.webp",
    },],
    topEventsCity: [{
        id: 7,
        category: "Інше",
        title: "Літературний вечір",
        date: "15 серпня 2024",
        time: "19:30",
        location: "Art studio “Lila”, Київ",
        price: 350,
        image: "https://your-cloud-storage.com/literature-evening.jpg"
    },
    {
        id: 8,
        category: "Майстер-класи",
        title: "Майстер-клас з приготування страв різних кухонь",
        date: "17 серпня 2024",
        time: "19:30",
        location: "Art studio “Lila”, Київ",
        price: 350,
        image: "https://your-cloud-storage.com/cooking-masterclass.jpg"
    },
    {
        id: 9,
        category: "Концерт",
        title: "Акустичний концерт відомого гурту",
        date: "22 серпня 2024",
        time: "20:00",
        location: "Green Theatre, Київ",
        price: 500,
        image: "https://your-cloud-storage.com/acoustic-concert.jpg"
    },
    {
        id: 10,
        category: "Виставка",
        title: "Виставка сучасного мистецтва",
        date: "10 вересня 2024",
        time: "18:00",
        location: "Мистецький Арсенал, Київ",
        price: 200,
        image: "https://your-cloud-storage.com/art-exhibition.jpg"
    }],
    onlineEvents: [{
        id: 11,
        category: "Онлайн",
        title: "Літературний вечір",
        date: "15 серпня 2024",
        time: "19:30",
        location: "Art studio “Lila”, Київ",
        price: 350,
        image: "https://your-cloud-storage.com/literature-evening.jpg"
    },
    {
        id: 12,
        category: "Онлайн",
        title: "Майстер-клас з приготування страв різних кухонь",
        date: "17 серпня 2024",
        time: "19:30",
        location: "Art studio “Lila”, Київ",
        price: 350,
        image: "https://your-cloud-storage.com/cooking-masterclass.jpg"
    },
    {
        id: 13,
        category: "Онлайн",
        title: "Акустичний концерт відомого гурту",
        date: "22 серпня 2024",
        time: "20:00",
        location: "Green Theatre, Київ",
        price: 500,
        image: "https://your-cloud-storage.com/acoustic-concert.jpg"
    },
    {
        id: 14,
        category: "Онлайн",
        title: "Виставка сучасного мистецтва",
        date: "10 вересня 2024",
        time: "18:00",
        location: "Мистецький Арсенал, Київ",
        price: 200,
        image: "https://your-cloud-storage.com/art-exhibition.jpg"
    }],
    closestEvents: [{
        id: 15,
        category: "Онлайн",
        title: "Літературний вечір",
        date: "15 серпня 2024",
        time: "19:30",
        location: "Art studio “Lila”, Київ",
        price: 350,
        image: "https://your-cloud-storage.com/literature-evening.jpg"
    },
    {
        id: 16,
        category: "Онлайн",
        title: "Майстер-клас з приготування страв різних кухонь",
        date: "17 серпня 2024",
        time: "19:30",
        location: "Art studio “Lila”, Київ",
        price: 350,
        image: "https://your-cloud-storage.com/cooking-masterclass.jpg"
    },
    {
        id: 17,
        category: "Онлайн",
        title: "Акустичний концерт відомого гурту",
        date: "22 серпня 2024",
        time: "20:00",
        location: "Green Theatre, Київ",
        price: 500,
        image: "https://your-cloud-storage.com/acoustic-concert.jpg"
    },
    {
        id: 18,
        category: "Онлайн",
        title: "Виставка сучасного мистецтва",
        date: "10 вересня 2024",
        time: "18:00",
        location: "Мистецький Арсенал, Київ",
        price: 200,
        image: "https://your-cloud-storage.com/art-exhibition.jpg"
    }],
}

const dataEventsSlice = createSlice({
    name: 'dataEvents',
    initialState,
    reducers: {
        updateGeneralEvents(state, action) { },
        updateTopEventsCity(state, action) { }
    }
})

export const { generalEvents, topEventsCity, onlineEvents, closestEvents } = dataEventsSlice.actions
export default dataEventsSlice.reducer