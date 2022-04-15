import {useEffect, useState} from "react";
import cn from 'classnames';

import classes from './Quiz.module.scss';

function QuestionCard ({question, correct, incorrect, changeScores, type}) {
    const [hide, setHide] = useState("nothing")
    const [answers, setAnswers] = useState()
    const [showRight, setShowRight] = useState(false)
    const [clicked, setClicked] = useState(false)
    const answer = (boolean) => {
        setClicked(true)
        if (correct === boolean) {
            changeScores('addition')
            setShowRight(true)
            setTimeout(() => {setHide('right')}, 1000)
        } else {
            changeScores('subtraction')
            setShowRight(true)
            setTimeout(() => {setHide('left')}, 1000)
        }
    }

    useEffect(() => {
        let res = incorrect
            let index = Math.floor(Math.random() * 3)
            let temp = res[index]
            res[index] = correct
            res.unshift(temp)
        setAnswers(res)
    }, [incorrect, correct])

    return (
        <>
        <div className={hide === 'right' ?
            cn(classes.questionCard, classes.hide_right) : hide === 'left' ?
                cn(classes.questionCard, classes.hide_left) : classes.questionCard}>
            <span>{question}</span>
            {type === 'boolean' && <>
                <button
                    style={correct === 'True' && showRight ? {backgroundColor: 'rgba(114,241,114,0.5)'} : {}}
                    onClick={() => !clicked && (answer("True"),
                        setTimeout(() => {setHide('right')}, 1000)
                    )}>True</button>
                <button
                    style={correct === 'False' && showRight ? {backgroundColor: 'rgba(241,114,125,0.5)'} : {}}
                    onClick={() => !clicked && (answer("False"),
                            setTimeout(() => {setHide('left')}, 1000)
                    )}>False</button>
            </>}
            {type === 'multiple' && <div className={classes.answers}>
                {answers && answers.map((item, i) =>
                        <label
                            style={item === correct && showRight ? {backgroundColor: 'rgba(114,241,114,0.5)'}: {}}
                            key={`${i}_1${item}`}
                            htmlFor={`${item}`}>
                            {item}
                        <input
                            id={`${item}`}
                            type="checkbox"
                            value={item}
                            onChange={(e) => !clicked && answer(e.target.value)}/>
                        </label>
                    )}
            </div>}
        </div>
        </>
    )
}

export default QuestionCard;