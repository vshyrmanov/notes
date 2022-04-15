import React, {useEffect, useState} from 'react';
import MainInfo from "../../Components/Layout/MainInfo";
import axios from "axios";
import QuestionCard from "./QuestionCard";
import SVG from 'react-inlinesvg'

import classes from './Quiz.module.scss';

const Quiz = () => {
    const [data, setData] = useState()
    const [start, setStart] = useState(false)
    const [mainMenu, setMainMenu] = useState(true)
    const [score, setScore] = useState(0)
    const [limitScore, setLimitScore] = useState(0)
    const [highlight, setHighlight] = useState("white")
    const [textResult, setTextResult] = useState('Good job!')
    const [results, setResults] = useState(false)
    const [quantityQuestions, setQuantityQuestions] = useState(10)
    const [time, setTime] = useState(0)
    const [progress, setProgress] = useState(0)
    const [done, setDone] = useState(false)
    const [type, setType] = useState(null)
    const [difficulty, setDifficulty] = useState('easy')
    const [error, setError] = useState(false)

    const startGame = () => {
        setStart(true)
        setMainMenu(false)
        axios.get(`https://opentdb.com/api.php?amount=${quantityQuestions}&type=${type}&difficulty=${difficulty}`)
            .then(res => (setData(res.data)))
    }

    useEffect(() => {
        for (let x = 0; x < quantityQuestions; x ++) {
            setTime(time + 180/quantityQuestions)
            setProgress(progress + 1)
            if (progress === quantityQuestions) {
                setDone(true)
                setTime(180)
            }
        }
    }, [limitScore])

    useEffect(() => {
        if (score < (quantityQuestions*30/100)) {
            setHighlight('red')
            setTextResult('Try again, pls! You can be better!')
        }
        if (score > (quantityQuestions*30/100) && score < (quantityQuestions*60/100)) {
            setHighlight('orange')
            setTextResult('Not bad!')
        }
        if (score > (quantityQuestions*60/100)) {
            setHighlight('green')
            setTextResult('Good job!')
        }
        if (score === quantityQuestions) {
            setHighlight('green')
            setTextResult('Excellent!!!')
        }
        if (limitScore == quantityQuestions) {
            setResults(true)
        }
    }, [score, limitScore, quantityQuestions])


    const changeScores = (operation) => {
        setLimitScore(limitScore + 1)
        if (operation === 'addition') {
            setScore(score + 1)
        }
    }

    const restart = () => {
        setData(null)
            startGame()
            setScore(0)
            setResults(false)
            setLimitScore(0)
            setProgress(0)
            setDone(false)
            setTime(0)

    }
    const getMainMenu = () => {
            setData(null)
            setScore(0)
            setResults(false)
            setLimitScore(0)
            setStart(false)
            setMainMenu(true)
            setQuantityQuestions(10)
            setDone(false)
            setProgress(0)
            setTime(0)
            setType(null)
    }

    return (
        <MainInfo>
            <div className={classes.quiz_main}>
                {start && <div className={classes.circle_out}>
                    {!done && <span>{`${progress} from ${quantityQuestions}`}</span>}
                    {done && <span>DONE!</span>}
                    <div className={classes.progress} style={{transform: `rotate(${time}deg)`}}/>
                    <div className={classes.circle_in}/>
                </div>}
                {start && <label className={classes.quiz_mainMenu} onClick={() => getMainMenu()}>Main menu
                </label>}
                {start && <label
                    className={classes.quiz_score}
                    style={{border: `2px solid ${highlight}`}}>
                    <label>{score}</label>
                </label>}
                {start && <label className={classes.quiz_restart} onClick={() => restart()}>Restart
                    <SVG src={'image/svg/quiz/restart.svg'} width={20} height={20} />
                </label>}
                {mainMenu && <div className={classes.mainMenu_page}>
                    <select onChange={(e) => setQuantityQuestions(e.target.value)}>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={25}>25</option>
                        <option value={30}>30</option>
                    </select>
                    <select
                        onChange={(e) => (setType(e.target.value), setError(false))}
                        style={error ? {border: '2px solid red'} : {}}>
                        <option defaultValue={null}>Type of questions:</option>
                        <option value={'boolean'}>True/False</option>
                        <option value={'multiple'}>Multiple choice</option>
                    </select>
                    <select
                        onChange={(e) => (setDifficulty(e.target.value), setError(false))}>
                        <option value={'easy'}>Easy</option>
                        <option value={'medium'}>Medium</option>
                        <option value={'hard'}>Hard</option>
                    </select>
                    <p onClick={() => type && type !== 'Type of questions:' ? startGame() : setError(true) }>{!start ? "Let's start!" : "Loading ..."}</p>
                </div>}
                    {data && data.results && data.results.map((item, i) => (
                    <QuestionCard
                            key={`${i}_1`}
                            question={item.question}
                            correct={item.correct_answer}
                            changeScores={changeScores}
                            incorrect={item.incorrect_answers}
                            type={type}
                        />)
                    )}
                {results && <div className={classes.results}>
                    <span>{textResult} Your scores are: </span>
                    <mark style={{backgroundColor: `${highlight}`}}>{score}</mark>
                    <button onClick={() => restart()}>Play again!</button>
                </div>}
            </div>
        </MainInfo>
    )
}

export default Quiz;