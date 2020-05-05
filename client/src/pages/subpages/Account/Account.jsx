import React, { useState, useContext, useCallback, useEffect } from "react"
import Styles from "./Account.module.css"
import Form from "./../../../components/Form/Form"
import { useHttp } from "../../../hooks/http.hook"
import { AuthContext } from "../../../context/AuthContext"

const Account = (userId) => {
    const [opened, setOpened] = useState(false)
    const { token } = useContext(AuthContext)
    const { loading, request } = useHttp()
    const [card, setCard] = useState("---")
    const id = userId.id

    const getData = useCallback(async () => {
        try {
            const fetched = await request(`/api/admin/${id}`, "GET", null, {
                Authorization: `Bearer ${ token }`
            })
            setCard(fetched)
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

    const array = card.length !== 0 ? 
        card.slice(-1)[0] : {
            name: "---", 
            surname: "---", 
            middlename: "---", 
            age: "---",
            height: "---",
            weight: "---",
            bloodType: "---",
        }

    const items = [
        {id: 1, name: "Имя", text: array.name},
        {id: 2, name: "Фамилия", text: array.surname},
        {id: 3, name: "Отчество", text: array.middlename},
        {id: 4, name: "Возраст", text: array.age},
        {id: 5, name: "Рост в метрах", text: array.height},
        {id: 6, name: "Вес", text: array.weight},
        {id: 7, name: "Группа крови", text: array.bloodType}
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
                <h2 className={Styles.heading}>Медкарта</h2>
                <div className={Styles.info}>
                    { elems }
                </div>
                <div className={Styles.button}>
                    <a href="/" className={Styles.edit} onClick={e => {e.preventDefault(); openForm()}}>Изменить</a>
                </div>
                { opened ? <Form openForm={openForm} /> : <div></div> }
            </div>
        )
    }
}

export default Account