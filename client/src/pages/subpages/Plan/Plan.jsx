import React, { useState, useContext, useCallback, useEffect } from "react"
import Styles from "./Plan.module.css"
import PlanForm from "./../../../components/PlanForm/PlanForm"
import { useHttp } from "../../../hooks/http.hook"
import { AuthContext } from "../../../context/AuthContext"

const Plan = (userId) => {
    const [opened, setOpened] = useState(false)
    const { token } = useContext(AuthContext)
    const { loading, request } = useHttp()
    const [plan, setPlan] = useState("---")
    const id = userId.id

    const getData = useCallback(async () => {
        try {
            const fetched = await request(`/api/plan/${id}`, "GET", null, {
                Authorization: `Bearer ${ token }`
            })
            setPlan(fetched)
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

    const array = plan.length !== 0 ? 
        plan.slice(-1)[0] : {date: 0, problem: "---", solution: "---", actions: "---"}

    const items = [
        {id: 1, name: "Дата", text: new Date(array.date).toLocaleDateString()},
        {id: 2, name: "Проблема", text: array.problem},
        {id: 3, name: "Решение", text: array.solution},
        {id: 4, name: "Вмешательства", text: array.actions}
    ]

    const elems = items.map(({id, name, text}) => {
        return(
            <div key={ id } className={Styles.item}>
                <b className={Styles.label}>{ name }</b>
                <p className={Styles.text}>{ text }</p>
            </div>
        )
    })

    if (loading) {
        return <div className={Styles.loading}></div>
    } else {
        return(
            <div className={Styles.block}>
                <h2 className={Styles.heading}>Дневник наблюдений</h2>
                <div className={Styles.info}>
                    { elems }
                </div>
                <div className={Styles.button}>
                    <a href="/" className={Styles.edit} onClick={e => {e.preventDefault(); openForm()}}>Изменить</a>
                </div>
                { opened ? <PlanForm openForm={openForm} /> : <div></div> }
            </div>
        )
    }
}

export default Plan