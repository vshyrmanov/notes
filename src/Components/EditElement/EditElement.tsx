import React, {useState} from 'react';
import {Input} from "../Input/Input";
import SVG from "react-inlinesvg";

import classes from './EditElement.module.scss';



const EditElement = ({title, value, onChange, clearInput}) => {
    const [isEdit, setIsEdit] = useState(false)

    return (
        <div className={classes.element}>
            <div className={classes.text}>
                {!isEdit && <label>{title}</label>}
                {isEdit && <Input
                    value={value}
                    onChange={onChange}
                    clearInput={clearInput}
                />}
            </div>
            {isEdit && <SVG
                src={'/image/svg/editElement/done.svg'}
                width={20}
                height={20}
                onClick={() => setIsEdit(!isEdit)}
            />}
            <SVG src={`/image/svg/editElement/${isEdit ? 'cancel' : 'edit'}.svg`}
                 width={20}
                 height={20}
                 onClick={() => setIsEdit(!isEdit)} />

        </div>
    )
}

export default EditElement;