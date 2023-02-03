import React, { useState, useEffect } from "react"
import "./assets/global.css"
import QuizItem from "./components/QuizItem"
import StartScren from "./components/StartScreen"
import Button from "./components/Button"

function App() {
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    () => localStorage.getItem("difficulty") || "any-difficulty")
  const [isQuizStarted, setIsQuizStarted] = useState(false)
  const [quizData, setQuizData] = useState([])
  const [quizResult, setQuizResult] = useState("")
  const [isQuizFinished, setQuizIsFinished] = useState(false)

  useEffect(() => {
    if (isQuizStarted) {
      let additionalQueryString = ""
      if (selectedDifficulty === "easy") {
        additionalQueryString = "&difficulty=easy"
      } else if (selectedDifficulty === "medium") {
        additionalQueryString = "&difficulty=medium"
      } else if (selectedDifficulty === "hard") {
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
  }, [isQuizStarted])

  function handleChange(event) {
    const { value } = event.target;
    setSelectedDifficulty(value)
  }

  function startQuiz() {
    setIsQuizStarted(true)
  }

  function answerSelection(id, choice) {
    setQuizData(prevState => {
      return prevState.map((quiz, i) => {
        return i === id ? { ...quiz, choozen: choice } : quiz
      })
    })
  }

  function checkAnswers() {
    if (quizData.filter((quiz) => quiz.choozen).length < 5) {
      setQuizResult("Please answer all the questions!")
    } else {
      const score = quizData.filter((quiz) => quiz.choozen === quiz.correct_answer).length
      setQuizResult(`You scored ${score}/5 correct answers`)
      setQuizIsFinished(true)
    }
  }

  function toStartScreen() {
    setIsQuizStarted(false)
    setQuizData([])
    setQuizResult("")
    setQuizIsFinished(false)
  }

  const quizBlocks = quizData.map((quiz, i) => {
    return (
      <QuizItem
        key={i}
        id={i}
        question={quiz.question}
        incorrectAnswers={quiz.incorrect_answers}
        correctAnswer={quiz.correct_answer}
        answerSelection={answerSelection}
        isQuizFinished={isQuizFinished}
      />
    )
  })

  return (
    <main>
      <div className={`blob-one ${isQuizStarted ? "blob-one_translate" : ""}`}></div>
      <div className={`blob-two ${isQuizStarted ? "blob-two_translate" : ""}`}></div>
      {quizData.length === 0 ?
        <StartScren
          isQuizStarted={isQuizStarted}
          selectedDifficulty={selectedDifficulty}
          startQuiz={startQuiz}
          handleChange={handleChange}
        />

        :

        <div className="quiz-container">
          {quizBlocks}
          <div className="quiz-container__check-results">
            {quizResult !== "" && <h3>{quizResult}</h3>}
            <Button
              name={isQuizFinished ? "Play again" : "Check answers"}
              className="quiz-container__button"
              handleClick={!isQuizFinished ? checkAnswers : toStartScreen}
            />
          </div>
        </div>
      }
    </main>
  )
}

export default App