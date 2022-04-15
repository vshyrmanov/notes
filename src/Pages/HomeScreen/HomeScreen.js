import React, {useEffect} from 'react'
import MainInfo from "../../Components/Layout/MainInfo";
import {useNavigate} from "react-router-dom";

import cn from 'classnames'
import classes from './HomeScreen.module.scss'



const HomeScreen = () => {
    const history = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('path')) {
            history(localStorage.getItem('path'))
        }
    }, [])

    return (
        <MainInfo>
            <div className={classes.main}>
                Home page
            </div>
         </MainInfo>
    )
}

export default HomeScreen;