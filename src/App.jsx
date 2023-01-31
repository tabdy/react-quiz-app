import React, {useState, useEffect} from 'react'
import './App.css'
import QuizItem from './components/QuizItem'

function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    () => localStorage.getItem("difficulty") || "any-difficulty")
  const [isStarted, setIsStarted] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [quizResult, setQuizResult] = useState("")
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    if (isStarted) {
      let additionalQueryString = ""
      if (selectedDifficulty === "easy") {
        additionalQueryString = "&difficulty=easy"
      } else if (selectedDifficulty === "medium") {
        additionalQueryString = "&difficulty=medium"
      } else if(selectedDifficulty === "hard") {
        additionalQueryString = "&difficulty=hard"
      }

      const url = "https://opentdb.com/api.php?amount=5" + additionalQueryString
      fetch(url)
        .then(resp => resp.json())
        .then((data) => {
          setQuizData(data.results)
        })

        localStorage.setItem("difficulty", selectedDifficulty)
    }
  }, [isStarted])

  function handleChange(event) {
    const {value} = event.target;
    setSelectedDifficulty(value)
  }

  function startQuiz() {
    setIsStarted(true)
  }

   const quizBlocks = quizData.map((dataObj, i) => {
    return (
      <QuizItem
      key={i}
      id={i}
      question={dataObj.question}
      incorrectAnswers={dataObj.incorrect_answers}
      correctAnswer={dataObj.correct_answer}
      answerSelection={answerSelection}
      isFinished={isFinished}
       />
    )
  })

  function answerSelection(id, choice) {
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
    let score = quizData.filter((dataObj) => dataObj.choozen === dataObj.correct_answer).length
    setQuizResult(`You scored ${score}/5 correct answers`)
    setIsFinished(true)
   }
  }

  function toStartScreen() {
    setIsStarted(false)
    setQuizData([])
    setQuizResult("")
    setIsFinished(false)
  }

  return (
    <main>
      {quizData.length === 0 ?
        <div className="start-screen">
        <div className='blob-one'></div>
        <div className='blob-two'></div>
          <h1>Quizzical</h1>
          <div className='start-screen__description'>Here you can test your erudition.</div>
          <form action="#">
            <label htmlFor="difficulty">Difficulty level</label>
            <select 
            id="quizDifficulty"
            name="quizDifficulty"
            value={selectedDifficulty}
            onChange={handleChange}
            >
              <option value="any-difficulty">Any difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </form>
          {isStarted ?
          <p>Loading...</p>
             :
            <button
              className='start-screen__button'
              onClick={startQuiz}
            >Start quiz</button>
          }
        </div>

        :
   
        <div className='quize-container'>
        <div className='blob-one blob-one_translate'></div>
        <div className='blob-two blob-two_translate'></div>
          {quizBlocks}
          <div className='quize-container__check-results'>
            {quizResult !== "" && <h3>{quizResult}</h3>}
            <button className='quize-container__button' onClick={!isFinished ? checkAnswers : toStartScreen}>
              {isFinished ? 'Play again' : 'Check answers'}
            </button>
          </div>
        </div>
      }
    </main>
  )
}

export default App