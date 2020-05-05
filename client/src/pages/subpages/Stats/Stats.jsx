import React, { useState, useContext, useCallback, useEffect } from "react"
import Styles from "./Stats.module.css"
import StatsForm from "./../../../components/StatsForm/StatsForm"
import { useHttp } from "../../../hooks/http.hook"
import { AuthContext } from "../../../context/AuthContext"

const Stats = (userId) => {
    const [opened, setOpened] = useState(false)
    const { token } = useContext(AuthContext)
    const { loading, request } = useHttp()
    const [stats, setStats] = useState("---")
    const id = userId.id

    const getData = useCallback(async () => {
        try {
            const fetched = await request(`/api/stats/${id}`, "GET", null, {
                Authorization: `Bearer ${ token }`
            })
            setStats(fetched)
        } catch (e) {}
    }, [token, id, request])

    useEffect(() => {
        getData()
    }, [getData])

    const openForm = () => {
        if (opened === false) {
            setOpened(true)
        } else {
            setOpened(false)
        }
    }

    const array = stats.length !== 0 ? 
        stats.slice(-1)[0] : {date: 0, pulse: "---", temp: "---", pressure: "---", sugar: "---"}

    const items = [
        {id: 1, name: "Дата изменения", css: Styles.changes, text: new Date(array.date).toLocaleDateString()},
        {id: 2, name: "Пульс", css: Styles.item, text: array.pulse},
        {id: 3, name: "Температура", css: Styles.item, text: array.temp, extra: Styles.extra},
        {id: 4, name: "Давление", css: Styles.item, text: array.pressure, extra: Styles.extra},
        {id: 5, name: "Сахар", css: Styles.item, text: array.sugar, extra: Styles.extra},
    ]

    const elems = items.map(({id, name, css, text, extra}) => {
        return(
            <div key={ id } className={ css }>
                <div className={css === Styles.changes ? Styles.changesBlock : `${Styles.circle} ${ extra }`}>
                    <b className={Styles.label}>{ name }</b>
                    <p className={Styles.text}>{ text }</p>
                </div>
            </div>
        )
    })

    if (loading) {
        return <div className={Styles.loading}></div>
    } else {
        return(
            <div className={Styles.block}>
                <h2 className={Styles.heading}>Показатели больного</h2>
                <div className={Styles.info}>
                    { elems }
                </div>
                <div className={Styles.button}>
                    <a href="/" className={Styles.edit} onClick={e => {e.preventDefault(); openForm()}}>Изменить</a>
                </div>
                { opened ? <StatsForm openForm={openForm} /> : <div></div> }
            </div>
        )
    }
}

export default Stats