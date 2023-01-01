import React from "react";
// Module for converting special characters into normal
import {decode} from 'html-entities'

function QuizItem(props) {
  const [randomIndexArr, setRandomIndexArr] = React.useState(() => randomAnswer())
  const answers = [...props.incorrectAnswers, props.correctAnswer]
  const [chosenAnswer, setChosenAnswer] = React.useState("")
  console.log(chosenAnswer)

  function randomAnswer() {

    const indexNum = []
    while (indexNum.length < 4) {
      let randomNum = Math.floor(Math.random() * 5)
      if (indexNum.every(num => randomNum !== num)) {
        indexNum.push(randomNum)
      }
    }
    return indexNum;

  }

  function buttonPressed(i) {
    // console.log("pressed", i)
    setChosenAnswer(answers[i])
    // console.log(props.id, answers[i])
    props.setChosen(props.id, answers[i])
  }

  const AnswersОptions = answers.map((answer, i) => (
    <button
    key={i}
    className={'quize-container__answer' + 
      (chosenAnswer === answer ? ' quize-container__answer_selected' : '')
      +
      (props.isFinished && chosenAnswer === answer ? ' quize-container__answer_selected-wrong' : '')
      +
      (props.isFinished && props.correctAnswer === answer ? ' quize-container__correct-answer' : '')
    }
    onClick={(e) => buttonPressed(i)}>{decode(answer)}
    </button>
  ))
  
  

    return (
        <div className='quize-container__item'>
        <h2>{decode(props.question)}</h2>
        <div className='quize-container__answers-block'>
        {AnswersОptions}
          {/* <div className='quize-container__answer'>{decode(answers[0])}</div>
          <div className='quize-container__answer'>{decode(answers[1])}</div>
          <div className='quize-container__answer'>{decode(answers[2])}</div>
          <div className='quize-container__answer'>{decode(answers[3])}</div> */}
        </div>
        <hr />
      </div>
    )
    
}

export default QuizItem