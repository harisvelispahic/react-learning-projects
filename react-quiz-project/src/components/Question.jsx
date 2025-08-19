import { useState } from "react";

import QUESTIONS from "../questions.js";

import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        // we can use the key prop to force react to destroy and recreate a component
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : () => {}}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>

      <Answers
        // key={activeQuestionIndex}
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        currentAnswerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}

// since we cannot pass key prop with two sibling elements, we create a component (Question.jsx), that will be passed a key prop and omit that problem by accepting just one key prop, which will then force it to rerender when it is changed
