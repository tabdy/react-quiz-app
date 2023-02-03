import React from "react"
import Button from "./Button"

function StartScren(props) {
const {isQuizStarted, selectedDifficulty, startQuiz, handleChange} = props
    return (
        <div className="start-screen">
            <h1>Quizzical</h1>
            <div className="start-screen__description">Here you can test your erudition.</div>
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
            {isQuizStarted ?
                <p>Loading...</p>
                :
                <Button 
                name="Start quiz"
                className="start-screen__button" 
                handleClick={startQuiz}
                />
            }
        </div>
    )
}

export default StartScren