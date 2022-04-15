import React, {FC, useRef, useState} from 'react';
import SVG from 'react-inlinesvg'

import classes from './Input.module.scss';

interface InputProps {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    clearInput: (e: React.MouseEvent<SVGElement>) => void
}


export const Input:FC<InputProps> = (props: InputProps) => {
    return (
        <div className={classes.myInput}>
            <input value={props.value} onChange={props.onChange}  />
            {props.value.length > 0 && <SVG src={'/image/svg/input/close.svg'} onClick={props.clearInput} />}
        </div>

    )
}