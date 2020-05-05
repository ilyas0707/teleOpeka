import React, { useState, useContext, useEffect } from "react"
import Styles from "./Auth.module.css"
import Container from "./../../../App.module.css"
import { useMediaQuery } from 'react-responsive'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useHttp } from "./../../../hooks/http.hook"
import { useError } from "../../../hooks/error.hook"
import { AuthContext } from '../../../context/AuthContext'
import { useSuccess } from '../../../hooks/success.hook'

const Auth = () => {
    toast.configure({
        autoClose: 3000,
        draggable: true
    })

    const auth = useContext(AuthContext)
    const errorMessage = useError()
    const successMessage = useSuccess()
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        errorMessage(error)
        clearError()
    }, [error, errorMessage, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async (e) => {
        e.preventDefault()
        try {
            const data = await request("/api/auth/register", "POST", { ...form })
            successMessage(data.message)
        } catch (e) {}
    }
    
    const loginHandler = async (e) => {
        e.preventDefault()
        try {
            const data = await request("/api/auth/login", "POST", { ...form })
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    const small = useMediaQuery(
        { minDeviceWidth: 550 }
    )

    return(
        <div className={Container.container}>
            <h2 className={Styles.title}>Авторизация</h2>
            <div className={small ? Styles.block : `${Styles.block} ${Styles.blockMedia}`}>
                <h2 className={Styles.heading}>Вход/Регистрация</h2>
                <form action="#" className={Styles.form}>
                    <div className={Styles.inputBlock}>
                        <input 
                            type="text"
                            className={Styles.input}
                            name="email"
                            placeholder="Email"
                            autoComplete="off"
                            onChange={changeHandler} />
                        <label htmlFor="email" className={Styles.label}>Email</label>
                        <b className={Styles.warn}>Ex: *****@happy.com</b>
                    </div>
                    <div className={Styles.inputBlock}>
                        <input 
                            type="password"
                            className={Styles.input}
                            name="password"
                            placeholder="Пароль"
                            autoComplete="off"
                            onChange={changeHandler} />
                        <label htmlFor="password" className={Styles.label}>Пароль</label>
                        <b className={Styles.warn}>Минимум 6 символов</b>
                    </div>
                    <div className={loading ? Styles.loading : Styles.buttons}>
                        <a 
                            href="/" 
                            className={loading ? 
                                Styles.dn : 
                                small ? Styles.submit : `${Styles.submit} ${Styles.submitMedia}`}
                            onClick={loginHandler}>Войти</a>
                        <a 
                            href="/" 
                            className={loading ? 
                                Styles.dn : 
                                small ? Styles.submit : `${Styles.submit} ${Styles.submitMedia}`}
                            onClick={registerHandler}>Зарегистрироваться</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth