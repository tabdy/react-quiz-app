import React from 'react'
import './App.css'
import QuizItem from './components/QuizItem'

function App() {
  const [isStarted, setIsStarted] = React.useState(false)
  const [quizData, setQuizData] = React.useState([])
  console.log(quizData)

  React.useEffect(() => {
    console.log("effect happend")
    if (isStarted) {
      fetch('https://opentdb.com/api.php?amount=5')
        .then(resp => resp.json())
        .then((data) => {
          setQuizData(data.results)
          // console.log(data.results)
        })
    }
  }, [isStarted])

  function startQuiz() {
    setIsStarted(true)
    console.log("clicked")
  }

   const quizBlocks = quizData.map(dataObj => {
    // console.log(dataObj)
    return (
      <QuizItem 
      question={dataObj.question}
      incorrectAnswers={dataObj.incorrect_answers}
      correctAnswer={dataObj.correct_answer}
       />
    )
  })

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
          <button className='quize-container__button'>Check answers</button>
        </div>
      }

    </div>
  )
}

export default App
