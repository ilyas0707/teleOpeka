import React, { useState, useEffect, useContext } from "react"
import Styles from "./NotesForm.module.css"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useHttp } from '../../hooks/http.hook'
import { useError } from '../../hooks/error.hook'
import { useSuccess } from '../../hooks/success.hook'
import { AuthContext } from '../../context/AuthContext'
import { useHistory } from "react-router-dom"

const NotesForm = ({openForm}) => {
    toast.configure({
        autoClose: 3000,
        draggable: true
    })

    const history = useHistory()
    const { token } = useContext(AuthContext)
    const { loading, request, error, clearError } = useHttp()
    const errorMessage = useError()
    const successMessage = useSuccess()
    const [form, setForm] = useState({
        name: "",
        dateFrom: "",
        dateTo: "",
        timeFrom: "",
        timeTo: ""
    })

    useEffect(() => {
        errorMessage(error)
        clearError()
    }, [error, errorMessage, clearError])

    const changeHandler = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const changeCard = async (e) => {
        e.preventDefault()
        if (form.name !== "" || form.dateFrom !== "" || form.dateTo !== "" || form.timeFrom !== "" || form.timeTo !== "") {
            try {
                const data = await request("/api/notes/add", "POST", { 
                    name: form.name,
                    dateFrom: form.dateFrom,
                    dateTo: form.dateTo,
                    timeFrom: form.timeFrom,
                    timeTo: form.timeTo }, {
                    Authorization: `Bearer ${ token }`
                })
                successMessage(data.message)
                history.push("/panel/account")
                history.push("/panel/notes")
            } catch (e) {}
        } else {
            errorMessage("Поля не должны быть пустыми!")
        }
    }

    const items = [
        {id: 1, name: "Название", text: "name", type: "text"},
        {id: 2, name: "Дата(с)", text: "dateFrom", type: "date", css: Styles.datetime},
        {id: 3, name: "Дата(до)", text: "dateTo", type: "date" , css: Styles.datetime},
        {id: 4, name: "Время(с)", text: "timeFrom", type: "time", css: Styles.datetime},
        {id: 5, name: "Время(до)", text: "timeTo", type: "time", css: Styles.datetime}
    ]

    const elems = items.map(({id, name, text, type, css}) => {
        return(
            <div key={ id } className={`${Styles.inputBlock} ${ css }`}>
                <b className={Styles.label}>{ name }</b>
                <input 
                    type={ type }
                    className={Styles.input}
                    name={ text }
                    placeholder={ name }
                    autoComplete="off"
                    onChange={changeHandler} />
            </div>
        )
    })

    return(
        <div className={Styles.block}>
            <div className={Styles.overlay} onClick={() => openForm()}></div>
            <div className={Styles.form}>
                { elems }
                <div className={Styles.center}>
                    <div className={loading ? Styles.loading : Styles.buttons}>
                        <a href="/" className={loading ? Styles.dn : Styles.cancel} onClick={e => {e.preventDefault(); openForm()}}>Отменить</a>
                        <a href="/" className={loading ? Styles.dn : Styles.save} onClick={changeCard}>Добавить</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotesForm