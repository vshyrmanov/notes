import React, { useState, useContext, useEffect} from 'react';
import SVG from 'react-inlinesvg'
import {Link, useNavigate} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext';
import SidebarLink from './SidebarLink';
import {useGetQuery} from '../Utils/useGetQuery';
import cn from 'classnames';
import classes from './Sidebar.module.scss'

const Sidebar = ({showSidebar, toggleSidebar}) => {

    const [links] = useState({
        home: 'Home',
        // calculator: 'Calculator',
        quiz: 'Quiz',
        // notes: 'Notes',
        // resume: 'Easy Resume'
    })

    const history = useNavigate()
    const auth = useContext(AuthContext)
    const {getWidth, widthQuery} = useGetQuery()

    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
        history('/')
        localStorage.setItem('path', 'home')
    }
    useEffect(() => {
        getWidth('(max-device-width: 768px)')
    }, [])

    const handleLink = (link) => {
        widthQuery && toggleSidebar()
            localStorage.setItem('path', link)
    }

    return (
        <div className={showSidebar ? classes.sidebar_main : cn(classes.sidebar_main, classes.sidebar_pullOf)}>
            <div className={classes.sidebar_elements}>
                <span className={classes.sidebar_navbar} onClick={toggleSidebar}>
                    <SVG src={"image/svg/sidebar/close.svg"} width={15} height={15} />
                </span>
                <span className={classes.sidebar_btn_toggle} onClick={toggleSidebar}>
                    <SVG src={"image/svg/sidebar/arrow.svg"} width={15} height={15} />
                </span>
                <div className={classes.sidebar_logo}>
                    <img src={'image/svg/logo.png'} width={65}  />
                </div>
                <div className={classes.sidebar_links}>
                    <SidebarLink link={'home'} todo={() => handleLink('home')} linksList={links}/>
                    <SidebarLink link={'quiz'} todo={() => handleLink('quiz')} linksList={links}/>
                    {/*<SidebarLink link={'notes'} todo={() => handleLink('notes')} linksList={links}/>*/}
                    {/*<SidebarLink link={'resume'} todo={() => handleLink('resume')} linksList={links}/>*/}
                    <div className={classes.logout} onClick={logoutHandler}>
                        <SVG src={`image/svg/sidebar/logout.svg`} width={20} height={20} />
                        <span>Log out</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;