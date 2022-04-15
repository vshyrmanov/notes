import React, {useEffect, useReducer} from 'react';
import MainInfo from "../../Components/Layout/MainInfo";
import {ButtonDigit} from "./ButtonDigit";
import {ButtonOperation} from "./ButtonOperation";
import classes from './Calculator.module.scss'

export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    DELETE_DIGIT: 'delete-digit',
    EVALUATE: 'evaluate'
}
function reducer (state, {type, payload}){
    switch(type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    current_operand: payload.digit,
                    overwrite: false
                }
            }
            if (payload.digit === "0" && state.current_operand === "0") {
                return state
            }
            if (payload.digit === "." && state.current_operand && state.current_operand.includes(".")) {
                return state
            }

            return {
                ...state,
                current_operand: `${state.current_operand || ""}${payload.digit}`,
            }
        case ACTIONS.CHOOSE_OPERATION:
            if (state.current_operand == null && state.previous_operand == null) {
                return state
            }
            if (state.previous_operand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previous_operand: state.current_operand,
                    current_operand: null
                }
            }
            if (state.current_operand == null) {
                return {
                    ...state,
                    operation: payload.operation
                }
            }
            return {
                ...state,
                previous_operand: evaluate(state),
                operation: payload.operation,
                current_operand: null
            }

        case ACTIONS.CLEAR:
            return {}
        case ACTIONS.EVALUATE:
            if (state.current_operand == null && state.previous_operand && state.operation == null) {
                return state;
            }
            return {
                ...state,
                overwrite: true,
                previous_operand: null,
                operation: null,
                current_operand: evaluate(state)
            }
        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    current_operand: null
                }
            }
            if (state.current_operand == null) return state
            if (state.current_operand.length === 1) {
                return {
                    ...state, current_operand: null
                }
            }
            return {
                ...state,
                current_operand: state.current_operand.slice(0, -1)
            }
    }
}

const evaluate = ({current_operand, previous_operand, operation}) => {
    const prev = parseFloat(previous_operand)
    const current = parseFloat(current_operand)
    if (isNaN(prev) || isNaN(current)) {
        return ""
    }
    let computation = ""
    switch (operation) {
        case "+":
            computation = prev + current;
            break;
        case "-":
            computation = prev - current;
            break;
        case "*":
            computation = prev * current;
            break;
        case "÷":
            computation = prev / current;
            break;
    }
    return computation.toString()
}

function Calculator() {
    const [{current_operand, previous_operand, operation}, dispatch] = useReducer(
        reducer,
        {})

    return (
        <MainInfo>
            <div className={classes.calculator_container}>
                <div className={classes.calculator_main}>
                    <div className={classes.calculator_outputs}>
                        <div className={classes.previous_operand}>{previous_operand} {operation}</div>
                        <div className={classes.currents_operand}>{current_operand}</div>
                    </div>
                    <button className={classes.span_two} onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
                    <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
                    <ButtonOperation operation="÷" dispatch={dispatch}/>
                    <ButtonDigit digit="1" dispatch={dispatch}/>
                    <ButtonDigit digit="2" dispatch={dispatch}/>
                    <ButtonDigit digit="3" dispatch={dispatch}/>
                    <ButtonOperation operation="*" dispatch={dispatch}/>
                    <ButtonDigit digit="4" dispatch={dispatch}/>
                    <ButtonDigit digit="5" dispatch={dispatch}/>
                    <ButtonDigit digit="6" dispatch={dispatch}/>
                    <ButtonOperation operation="+" dispatch={dispatch}/>
                    <ButtonDigit digit="7" dispatch={dispatch}/>
                    <ButtonDigit digit="8" dispatch={dispatch}/>
                    <ButtonDigit digit="9" dispatch={dispatch}/>
                    <ButtonOperation operation="-" dispatch={dispatch}/>
                    <ButtonDigit digit="." dispatch={dispatch}/>
                    <ButtonDigit digit="0" dispatch={dispatch}/>
                    <button className={classes.span_two} onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
                </div>
            </div>
        </MainInfo>

    )
}

export default Calculator;