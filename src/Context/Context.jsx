import { createContext, useContext, useEffect, useReducer } from "react";

const DataContext = createContext();

const initialState = {
  questions: [],
  // "loading", "error", "ready", "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  seconsdRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    seconsdRemaining,
  } = state;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <DataContext.Provider
      value={{
        dispatch,
        status,
        questions,
        index,
        answer,
        points,
        highscore,
        seconsdRemaining,
        numQuestions,
        maxPossiblePoints,
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

export { QuizProvider, useDataContext };
