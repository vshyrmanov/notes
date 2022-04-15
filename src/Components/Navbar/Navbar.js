import React, {useState, useEffect, useContext} from "react"
import SVG from 'react-inlinesvg';
import {AuthContext} from "../../Context/AuthContext";
import {useHttp} from "../../Hooks/http.hooks";
import cn from 'classnames'
import classes from './Navbar.module.scss'

const Navbar = ({toggleSidebar}) => {
    const [username, setUsername] = useState(null)
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const getAll = async () => {
        try {
            const data = await request('https://arcane-falls-56249.herokuapp.com/notes/getAll', 'GET', null, {
                Authorization: `Bearer ${auth.token}`
            })
            setUsername(data.username)
        } catch (e) {
        }
    }
    useEffect(() => {
        getAll()
    }, [])

    return (
        <div className={classes.navbar_main}>
            <div className={classes.navbar_content}>
                {username ? <p>{username}</p> : <p>Loading ...</p>}
                <span className={classes.navbar_showmore}>
                    <SVG src={'image/svg/navbar/avatar.svg'} width={30} />
                </span>
                <span className={classes.navbar_burger} onClick={toggleSidebar}>
                    <SVG src={'image/svg/navbar/navbar_burgermenu.svg'} width={30} />
                </span>
            </div>
        </div>
    )
}

export default Navbar;
