import React, {useState, useContext, useEffect} from 'react'
import {useHttp} from '../../Hooks/http.hooks';
import {AuthContext} from '../../Context/AuthContext';
import Notification from '../../Components/Notification/Notification';
import SVG from 'react-inlinesvg'
import classes from './AuthPage.module.scss';

const AuthPage = () => {
    const [msg, setMsg] = useState({show: false, text: "", type: ""})
    const [form, setForm] = useState({username: "", password: ""})
    const [isClearInput, setClearInput] = useState({username: false, password: false})
    const [showPass, setShowPass] = useState(false)
    const [preloader, setPreloader] = useState({})
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    const registerHandler = async () => {
        setPreloader({register: true})
        try {
            await request('https://arcane-falls-56249.herokuapp.com/register', 'POST', form)
           setMsg({show: true, text: `User ${form.username} was created successfully`, type: 'success'})
            setForm({username: "", password: ""})
            setPreloader({})
        } catch (e) {
            setMsg({show: true, text: e.message, type: 'error'})
            console.log(e.description)
            setPreloader({})
        }
    }
    const loginHandler = async () => {
        setPreloader({login: true})
        try {
            const data = await request('https://arcane-falls-56249.herokuapp.com/login', 'POST', form)
            auth.login(data.token, data.userId)
            setForm({username: "", password: ""})
            setPreloader({})
            localStorage.setItem('path', 'home')
        } catch (e) {
            setMsg({show: true, text: e.message, type: 'error'})
            setPreloader({})
        }
    }

    useEffect(() => {
        form.password ? setClearInput({...isClearInput, password: true}) : setClearInput({...isClearInput, password: false})
    }, [form.password])
    useEffect(() => {
      form.username ? setClearInput({...isClearInput, username: true}) : setClearInput({...isClearInput, username: false})
    }, [form.username])

    const showPassHandler = () => {
        setShowPass(!showPass)
    }

    useEffect(() => {
    const listener = event => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();
            loginHandler()
        }
    };
    document.addEventListener("keydown", listener);
    return () => {
        document.removeEventListener("keydown", listener);
    };
    }, [form])


    return (
        <div className={classes.auth_main}>
            <div className={classes.form}>
                <h2>Hello master</h2>
                <div className={classes.form_input}>
                    <input
                        type="text"
                        value={form.username}
                        placeholder="username"
                        onChange={(e) =>setForm({...form, username: e.target.value}) }/>
                    {isClearInput.username &&
                    <SVG className={classes.input_clear}
                         onClick={() => setForm({...form, username: ""})}
                         src={'image/svg/authpage/close.svg'}
                         width={20} height={20} />}
                </div>
                <div className={classes.form_input}>
                    <input
                        type={showPass ? 'text' : 'password'}
                        value={form.password}
                        placeholder="password"
                        onChange={(e) =>setForm({...form, password: e.target.value}) }/>
                    {isClearInput.password &&
                    <SVG className={classes.eye}
                         onClick={() => showPassHandler()}
                         src={'image/svg/authpage/eye.svg'}
                         width={20} height={20} />}
                    {isClearInput.password &&
                    <SVG className={classes.input_clear}
                         onClick={() => setForm({...form, password: ""})}
                         src={'image/svg/authpage/close.svg'}
                         width={20} height={20} />}
                </div>
                {!preloader.login ? <button onClick={loginHandler}>Sign in</button> :
                    <SVG src={'image/svg/authpage/preloader.svg'} className={classes.preloader} width={20} height={20}/>}
                {!preloader.register ? <button onClick={registerHandler}>Register</button> :
                    <SVG src={'image/svg/authpage/preloader.svg'} className={classes.preloader} width={20} height={20}/>}
            </div>
            <Notification
                msg={msg}
                handleNotification={() => setMsg({...msg, show: false})}/>
        </div>
    )
}

export default AuthPage;