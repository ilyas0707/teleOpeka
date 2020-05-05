import React, { useState } from "react"
import Styles from "./Dashboard.module.css"
import { NavLink } from "react-router-dom"
import Plan from "./../../assets/img/notebook.png"
import Notes from "./../../assets/img/calendar.png"
import Stats from "./../../assets/img/indicator.png"
import Info from "./../../assets/img/materials.png"
import Chat from "./../../assets/img/chat.png"

const Dashboard = () => { 
    const [open, setOpen] = useState(false)


    const menuOpen = event => {
        event.preventDefault()

        if (open === false){
            setOpen(true)
        } else {
            setOpen(false)
        }
    }

    const items = [
        {url: "/panel/plan", id: 1, text: "Дневник наблюдений", img: Plan},
        {url: "/panel/notes", id: 2, text: "Календарь", img: Notes},
        {url: "/panel/stats", id: 3, text: "Показатели", img: Stats},
        {url: "/panel/info", id: 4, text: "Рекомендации по уходу", img: Info},
        {url: "/panel/chat", id: 5, text: "Чат", img: Chat},
    ]

    const elems = items.map(({url, id, text, img}) => {
        return(
            <li key={ id } className={Styles.item}>
                <NavLink to={ url } className={`${Styles.link} ${open ? Styles.open : ""}`}>
                    <img className={Styles.icon} src={ img } alt={ text } />
                    <span className={`${Styles.span} ${open ? Styles.open : ""}`}>{ text }</span>
                </NavLink>
            </li>
        )
    })

    return(
        <nav className={`${Styles.navbar} ${open ? Styles.open : ""}`}>
            <div className={Styles.flexBlock}>
                <div className={Styles.title}>
                <NavLink to="/plan" className={`${Styles.logo} ${open ? Styles.open : ""}`}>teleOpeka</NavLink>
                    <a href="/" className={Styles.ham} onClick={menuOpen}>
                        <span className={`${Styles.line} ${open ? Styles.open : ""}`}></span>
                        <span className={Styles.line}></span>
                        <span className={`${Styles.line} ${open ? Styles.open : ""}`}></span>
                    </a>
                </div>
                <ul className={Styles.menu}>
                    { elems }
                </ul>
            </div>
        </nav>
    )
}

export default Dashboard