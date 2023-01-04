import React from "react";
// Module for converting special characters into normal html entities
import {decode} from 'html-entities'

function QuizItem(props) {
  const CombinedAnswers = [...props.incorrectAnswers, props.correctAnswer]
  const [answers, setAnswers] = React.useState(() => shuffle(CombinedAnswers))
  const [chosenAnswer, setChosenAnswer] = React.useState("")
  // console.log(chosenAnswer)

  function shuffle(array) {
    let lastUnshuffledIndex = array.length;
    let randomIndex;
    let valueHolder;

    while (lastUnshuffledIndex) {
      randomIndex = Math.floor(Math.random() * lastUnshuffledIndex--)
      valueHolder = array[lastUnshuffledIndex]
      array[lastUnshuffledIndex] = array[randomIndex]
      array[randomIndex] = valueHolder
    }
  
    return array;
  }

  function onAnswerChoice(i) {
    setChosenAnswer(answers[i])
    // console.log(props.id, answers[i])
    props.setChosen(props.id, answers[i])
  }

  const AnswersОptions = answers.map((answer, i) => (
    <button
    key={i}
    disabled={props.isFinished ? "true" : ""}
    className={'quize-container__answer' + 
      (chosenAnswer === answer ? ' quize-container__answer_selected' : '')
      +
      (props.isFinished && chosenAnswer === answer ? ' quize-container__answer_selected-wrong' : '')
      +
      (props.isFinished && props.correctAnswer === answer ? ' quize-container__correct-answer' : '')
    }
    onClick={(e) => onAnswerChoice(i)}>{decode(answer)}
    </button>
  ))
  
  
    return (
        <div className='quize-container__item'>
        <h2>{decode(props.question)}</h2>
        <div className='quize-container__answers-block'>
        {AnswersОptions}
        </div>
        <hr />
      </div>
    )
    
}

export default QuizItem