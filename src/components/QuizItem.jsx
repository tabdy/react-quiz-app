import React from "react";
// Module for converting special characters into normal
import {decode} from 'html-entities'

function QuizItem(props) {
  const [randomIndexArr, setRandomIndexArr] = React.useState(() => randomAnswer())
  const answers = [...props.incorrectAnswers, props.correctAnswer]
  console.log(randomIndexArr)

  function randomAnswer() {

    const indexNum = []

    while (indexNum.length < 4) {
      let randomNum = Math.floor(Math.random()*5)
      if (indexNum.every(num => randomNum !== num)) {
        indexNum.push(randomNum)
      }   
    }

    return indexNum;

  }



    return (
        <div className='quize-container__item'>
        <h2>{decode(props.question)}</h2>
        <div className='quize-container__answers-block'>
          <div className='quize-container__answer'>{decode(answers[0])}</div>
          <div className='quize-container__answer'>{decode(answers[1])}</div>
          <div className='quize-container__answer'>{decode(answers[2])}</div>
          <div className='quize-container__answer'>{decode(answers[3])}</div>
        </div>
        <hr />
      </div>
    )
    
}

export default QuizItem