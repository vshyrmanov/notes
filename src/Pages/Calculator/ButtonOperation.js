import {ACTIONS} from './Calculator';

export const ButtonOperation = ({dispatch, operation}) => {
    return (
        <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}>
            {operation}
        </button>
    )
}