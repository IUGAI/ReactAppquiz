import { useEffect, useReducer } from "react";
import Datacounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "../Progress";
import finishedScreen from "./FInishScreen";

const initialstate = {
  questions: [],
  // 'Loading, 'error, 'ready', 'active', 'finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
      case "finish":
        return {
          ...state, status: "finished"
        }
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialstate
  );

  const numQestions = questions.length;
  const maxpossiblepoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQestions={numQestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress index={index + 1} numQuestion={numQestions} points={points} maxpossiblepoints={maxpossiblepoints} />
            <Questions
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} index={index} numQestions={numQestions} />
          </>
        )}

        {status === "finished" && (
          <>
            <finishedScreen points={points} maxpossiblepoints={maxpossiblepoints}/>
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
