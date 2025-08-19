import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  currentAnswerState,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let CssClass = "";

        // So, if the question was answered and this specific answer was chosen
        if (currentAnswerState === "answered" && isSelected) {
          CssClass = "selected";
        }

        if (
          (currentAnswerState === "correct" ||
            currentAnswerState === "wrong") &&
          isSelected
        ) {
          CssClass = currentAnswerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={CssClass}
              disabled={currentAnswerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
