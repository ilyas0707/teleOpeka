import React, { useState } from "react"
import Styles from "./Navbar.module.css"
import Container from "./../../App.module.css"
import { useMediaQuery } from 'react-responsive'
import { NavLink } from "react-router-dom"

const Navbar = () => {
    const [opened, setOpened] = useState(false)

    const menuOpen = e => {
        e.preventDefault()
        if (opened === false) {
            setOpened(true)
        } else {
            setOpened(false)
        }
    }

    const hideMenu = () => {
        if (opened === true) {
            setOpened(false)
        }
    }

    const items = [
        { id: 1, name: "О нас", url: "/" },
        { id: 2, name: "Почему мы?", url: "/whyus" },
        { id: 3, name: "Авторизация", url: "/auth" },
    ]

    const elems = items.map(({id, name, url}) => {
        return(
            <li key={ id } className={Styles.item}>
                <NavLink to={ url } className={Styles.link} onClick={hideMenu}>{ name }</NavLink>
            </li>
        )
    })

    const small = useMediaQuery(
        { minDeviceWidth: 700 }
    )

    return(
        <div className={Styles.navbar}>
            <div className={`${Container.container} ${Styles.block}`}>
                <div className={Styles.logo}>
                    <NavLink to="/" className={Styles.logoLink} onClick={hideMenu}>teleOpeka</NavLink>
                </div>
                <ul className={small ? 
                        Styles.menu : 
                        `${Styles.menu} ${Styles.menuMedia} ${opened ? Styles.opened : ""}`}>
                    { elems }
                </ul>
                <div className={small ? 
                        Styles.hamMenu : 
                        `${Styles.hamMenu} ${Styles.hamMenuMedia}`}>
                    <a href="/" className={Styles.ham} onClick={menuOpen}>
                        <span className={`${Styles.line} ${opened ? Styles.opened : ""}`}></span>
                        <span className={`${Styles.line} ${opened ? Styles.opened : ""}`}></span>
                        <span className={`${Styles.line} ${opened ? Styles.opened : ""}`}></span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Navbar