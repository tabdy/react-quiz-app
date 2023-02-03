import React, { useState } from "react";
// Module for converting special characters into normal html entities
import { decode } from "html-entities"
import shuffleArray from "../utils/shuffleArray";

function QuizItem(props) {
  const { id, question, incorrectAnswers, correctAnswer, answerSelection, isQuizFinished } = props
  const combinedAnswers = [...incorrectAnswers, correctAnswer]
  const [answers, setAnswers] = useState(() => shuffleArray(combinedAnswers))
  const [chosenAnswer, setChosenAnswer] = useState("")

  function onAnswerChoice(i) {
    setChosenAnswer(answers[i])
    answerSelection(id, answers[i])
  }

  const AnswersОptions = answers.map((answer, i) => (
    <button
      key={i}
      disabled={isQuizFinished}
      onClick={(e) => onAnswerChoice(i)}
      className={"quiz-container__answer" +
        (chosenAnswer === answer ? " quiz-container__answer_selected" : "")
        +
        (isQuizFinished && chosenAnswer === answer ? " quiz-container__answer_selected-wrong" : "")
        +
        (isQuizFinished && correctAnswer === answer ? " quiz-container__correct-answer" : "")
      }>
      {decode(answer)}
    </button>
  ))

  return (
    <div className="quiz-container__item">
      <h2>{decode(question)}</h2>
      <div className="quiz-container__answers-block">
        {AnswersОptions}
      </div>
      <hr />
    </div>
  )
}

export default QuizItem