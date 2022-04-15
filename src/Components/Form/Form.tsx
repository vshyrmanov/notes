import React, {FC, useState} from 'react';
import Button from '../Buttons/Button';
import {Input} from '../Input/Input';

interface FormProps {
    value: string
    onChange: (val: string) => void,
    sendForm: () => void
}


export const Form:FC<FormProps> = (props: FormProps) => {
    const getName = (e) => {
        props.onChange(e.target.value)
    }

    const clearInput = () => {
        props.onChange("")
    }

    const sendForm = (e) => {
        e.preventDefault()
        props.sendForm()
        clearInput()
    }

    return (
        <form>
            <Input value={props.value} onChange={getName} clearInput={clearInput}  />
            <Button onClick={sendForm}>Add</Button>
        </form>
    )
}