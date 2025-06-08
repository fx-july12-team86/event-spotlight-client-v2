import { createSlice } from "@reduxjs/toolkit"

export function formatToLocalISODateTimeArray(isoArray) {
    return isoArray.map((isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    });
}

export function formatDate(date) {
    return date.split("T")[0].replaceAll("-", ".").split(".").reverse().join(".");;
}

const initialState = {
    filters: [],
    sortBy: ["startTime", "asc"],
    datesRange: [],
    datesRangeFormatted: "",
}

const filtersSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilters(state, action) {
            if (!state.filters.find(filter => filter === action.payload)) {
                state.filters.push(action.payload);
            }
        },
        toggleFilters(state, action) {
            const index = state.filters.indexOf(action.payload);
            if (index === -1) {
                // Если фильтра нет, добавляем
                state.filters.push(action.payload);
            } else {
                // Если есть — удаляем  
                state.filters.splice(index, 1);
            }
        },
        setDateRange(state, action) {
            const formattedToLocalISODateTimeArray = formatToLocalISODateTimeArray(action.payload)
            state.datesRange = formattedToLocalISODateTimeArray

            const formatted = formattedToLocalISODateTimeArray.map((date) => formatDate(date)).join(" - ");
            state.datesRangeFormatted = formatted;
        },
        setSortBy(state, action) {
            let optionFilter;

            switch (action.payload) {
                case "За датою":
                    optionFilter = ["startTime", "asc"];
                    break;
                case "За назвою (від А до Я)":
                    optionFilter = ["title", "asc"];
                    break;
                case "За популярністю":
                    optionFilter = ["popularity", "asc"];
                    break;
                case "За ціною (від найменшої)":
                    optionFilter = ["price", 'asc'];
                    break;
                case "За ціною (від найбільшої)":
                    optionFilter = ["price", 'desc'];
                    break;
                default:
                    optionFilter = ["startTime", "asc"];
            }
            state.sortBy = optionFilter;
        }
    }
})


export const { setFilters, toggleFilters, setDateRange, setSortBy } = filtersSlice.actions

export default filtersSlice.reducer;