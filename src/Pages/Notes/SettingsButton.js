import cn from "classnames";
import classes from "./Notes.module.scss";
import SVG from "react-inlinesvg";
import React, {useEffect, useState} from "react";
import {HexColorPicker} from "react-colorful";

let def = Math.random()

const SettingsButton = ({
                            todo,
                            type,
                            preloader,
                            id = def,
                            colorPicker = false,
                            valueColor = 0,
                            change = () => {},
}) => {

    return (
        <>
            <SVG onClick={(e) => (todo(e), e.stopPropagation())}
                 className={cn(classes.activities, classes[`${type}`])}
                 style={{background: `${preloader ? '#000' : ''}`}}
                 id={`${id}${type}`}
                 src={`image/svg/notes/${preloader ? 'preloader' : `${type}`}.svg`}
                 width={20} height={20}/>
            {colorPicker && <HexColorPicker
                id={`${id}${type}Picker`}
                value={valueColor}
                className={classes.colorPicker}
                onChange={(value) => change(type, value)}
                onClick={(e) => (e.stopPropagation())}
            />}
        </>
    )
}

export  default  SettingsButton;