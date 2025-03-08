import { createContext, useContext, useEffect, useReducer } from "react";

const DataContext = createContext();

const initialState = {
  city: "Оберіть місто",
  selectCity: false,
  // "loading", "error", "ready", "active", "finished"
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "city/new":
      if (action.payload.length <= 3) return state;
      return { ...state, city: action.payload };
    case "city/select":
      return { ...state, selectCity: !state.selectCity };
    default:
      throw new Error("Action unknown");
  }
}

function MainContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { city, status, selectCity } = state;

  // useEffect(function () {
  //   fetch("http://localhost:8000/questions")
  //     .then((res) => res.json())
  //     .then((data) => dispatch({ type: "dataRecieved", payload: data }))
  //     .catch((err) => dispatch({ type: "dataFailed" }));
  // }, []);

  return (
    <DataContext.Provider
      value={{
        dispatch,
        city,
        status,
        selectCity,
      }}>
      {children}
    </DataContext.Provider>
  );
}

function useDataContext() {
  const context = useContext(DataContext);

  if (context === undefined)
    throw new Error("Context was used outside of Quiz Provider");

  return context;
}

export { MainContextProvider, useDataContext };
