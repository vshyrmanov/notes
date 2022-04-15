import classes from "./Notes.module.scss";
import React, { useEffect, useState} from "react";
import {useClickInside} from './useClickInside';
import SettingsButton from './SettingsButton';

const NoteCard = ({i, remove,  scale }) => {
    const [preloader, setPreloader] = useState({})
    const [textEdit, setTextEdit] = useState({text: i.text, edit: false})
    const [colorPicker, setColorPicker] = useState({})
    const [typePicker, setTypePicker] = useState()
    const {isClickedInside} = useClickInside()

    useEffect(() => {
        setPreloader({})
    }, [i])

    const cardStyle = {
       card: {
            background: i.bgColor,
            color: i.textColor,
            width: `${i.widthSize}px`,
            height: `${i.heightSize}px`
       },
        textArea: {
            background: i.bgColor,
            color: i.textColor
        },
        mainText: {
           height: `${i.heightSize === 250 ? '12rem' : '23.5rem'}`
        }
    }

    const isClickedOutSide = (typePicker) => {
        setColorPicker({})
        setTypePicker('')
        setPreloader({...preloader, [`${typePicker}`]: false})
    }

    const clickDetect = () => {
        isClickedInside(i._id, typePicker, isClickedOutSide)
    }

    const cardDelete = () => {
            remove(i._id)
            setPreloader({...preloader, remove: true})
    }
    const handleSize = (type) => {
            if (type === 'widthSize') {
                scale(i, 'widthSize', i.widthSize === 600 ? 400 : 600)
            } else {
                scale(i,  'heightSize', i.heightSize === 450 ? 250 : 450)
            }
        setPreloader({...preloader, [`${type}`]: true})
    }

    const handleColor = (type) => {
        setPreloader({...preloader, [`${type}`]: true})
        setColorPicker({...colorPicker, [`${type}`]: true})
        setTypePicker(type)
    }

    const handlePicker = (type, value) => {
        scale(i, type, value)
    }

    const editText = (e) => {
        setTextEdit({...textEdit, text: e.target.value})
    }
    const handleEdit = (saveChanges = false) => {
            if (saveChanges) {
                scale(i, 'text', textEdit.text)
                setTextEdit({...textEdit, edit: false})
                setPreloader({...preloader, edit: true})
            } else {
                setTextEdit({...textEdit, edit: !textEdit.edit})
            }
    }

    return (
        <>
            {i  && <div key={i._id} className={classes.notes_card} style={cardStyle.card} onClick={clickDetect}>
            {!textEdit.edit && <SettingsButton todo={() => handleEdit()} type={'edit'} preloader={preloader.edit}  />}
            <SettingsButton todo={cardDelete} type={'remove'} preloader={preloader.remove} />
            <SettingsButton todo={() => handleSize('widthSize')} type={'widthSize'} preloader={preloader.widthSize} />
            <SettingsButton todo={() => handleSize('heightSize')} type={'heightSize'} preloader={preloader.heightSize} />
            <SettingsButton
                todo={() => handleColor('bgColor')}
                type={'bgColor'}
                preloader={preloader.bgColor}
                id={`${i._id}`}
                colorPicker={colorPicker.bgColor}
                valueColor={i.bgColor}
                change={handlePicker}
            />
            <SettingsButton
                todo={() => handleColor('textColor')}
                type={'textColor'}
                preloader={preloader.textColor}
                id={`${i._id}`}
                colorPicker={colorPicker.textColor}
                valueColor={i.textColor}
                change={handlePicker}
            />
            {!textEdit.edit && <p style={cardStyle.mainText}>{i.text}</p>}
            {textEdit.edit &&
            <>
                <textarea style={cardStyle.textArea} value={textEdit.text} onChange={editText}/>
                <SettingsButton todo={handleEdit} type={'cancel'} preloader={preloader.cancel} />
                <SettingsButton todo={() => handleEdit(true)} type={'success'} preloader={preloader.success} />
            </>}
            </div>}
        </>
    )
}

export default NoteCard;