import React, { useState, useContext } from "react"
import Styles from "./Topline.module.css"
import { NavLink } from "react-router-dom"
import LogOut from "./../../assets/img/logout.svg"
import User from "./../../assets/img/account.svg"
import { useHistory } from "react-router-dom"
import { AuthContext } from "./../../context/AuthContext"

const Topline = () => {
    const [show, setShow] = useState(false)
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push("/")
    }

    const showModal = event => {
        event.preventDefault()
        setShow(true)
    }

    const logoutCancel = event => {
        event.preventDefault()
        setShow(false)
    }

    return(
        <div className={Styles.topline}>
            <NavLink to="/panel/account" className={Styles.nickname}>
                <img className={Styles.user} src={ User } alt="user"/>Профиль
            </NavLink>
            <li className={Styles.item}>
                <a href="/" className={`${Styles.link} ${Styles.colored}`} onClick={showModal}>
                    <img className={Styles.icon} src={LogOut} alt="logout"/>
                </a>
            </li>
            <div className={`${Styles.overlay} ${show ? Styles.active : !show}`} onClick={logoutCancel}></div>
            <div className={`${Styles.message} ${show ? Styles.active : !show}`}>
                <p className={Styles.text}>Вы уверены, что хотите выйти?</p>
                <a href="/" className={`${Styles.submit} ${Styles.left}`} onClick={logoutHandler}>Да</a>
                <a href="/" className={`${Styles.submit} ${Styles.right}`} onClick={logoutCancel}>Нет</a>
            </div>
        </div>
    )
}

export default Topline