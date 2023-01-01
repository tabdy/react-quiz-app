import React from 'react'
import './App.css'
import QuizItem from './components/QuizItem'

function App() {
  const [isStarted, setIsStarted] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])
  const [quizResult, setQuizResult] = React.useState("")
  const [isFinished, setIsFinished] = React.useState(false)
  console.log(quizData)

  React.useEffect(() => {
    console.log("effect happend")
    if (isStarted) {
      fetch('https://opentdb.com/api.php?amount=5')
        .then(resp => resp.json())
        .then((data) => {
          setQuizData(data.results)
        })
    }
  }, [isStarted])

  function startQuiz() {
    setIsStarted(true)
  }

   const quizBlocks = quizData.map((dataObj, i) => {
    // console.log("obj", dataObj)
    return (
      <QuizItem
      key={i}
      id={i}
      question={dataObj.question}
      incorrectAnswers={dataObj.incorrect_answers}
      correctAnswer={dataObj.correct_answer}
      setChosen={setChosen}
      isFinished={isFinished}
       />
    )
  })

  function setChosen(id, choice) {
   
    setQuizData(prevState => {
      return prevState.map((dataObj, i) => {
        return i === id ? {...dataObj, choozen: choice} : dataObj
      })
      
    })
  }


  function checkAnswers() { 
   if (quizData.filter((dataObj) => dataObj.choozen).length < 5) {
    setQuizResult("Please answer all the questions!")
   } else {
    let result = quizData.filter((dataObj) => dataObj.choozen === dataObj.correct_answer).length
    setQuizResult(`You scored ${result}/5 correct answers`)
    setIsFinished(true)
   }

  }


  return (
    <div className="App">
      <div className='bloop-one'></div>
      <div className='bloop-two'></div>

      {quizData.length === 0 ?

        <div className="start-screen">
          <h1>Quizzical</h1>
          <div className='start-screen__description'>Some Description</div>
          {isStarted ?
            'loading...' :
            <button
              className='start-screen__button'
              onClick={startQuiz}
            >Start quiz</button>
          }
        </div>

        :
        
        <div className='quize-container'>
          {quizBlocks}
          <div className='quize-container__check-results'>
            {quizResult !== "" && <h3>{quizResult}</h3>}
            <button className='quize-container__button' onClick={checkAnswers}>Check answers</button>
          </div>
        </div>
      }

    </div>
  )
}

export default App
