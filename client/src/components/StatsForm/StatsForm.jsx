import React, { useState, useEffect, useContext } from "react"
import Styles from "./StatsForm.module.css"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useHttp } from '../../hooks/http.hook'
import { useError } from '../../hooks/error.hook'
import { useSuccess } from '../../hooks/success.hook'
import { AuthContext } from '../../context/AuthContext'
import { useHistory } from "react-router-dom"

const StatsForm = ({openForm}) => {
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
        pulse: "",
        temp: "",
        pressure: "",
        sugar: ""
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
        if (form.pulse !== "" || form.temp !== "" || form.pressure !== "" || form.sugar !== "") {
            try {
                const data = await request("/api/stats/add", "POST", { 
                    pulse: form.pulse,
                    temp: form.temp,
                    pressure: form.pressure,
                    sugar: form.sugar }, {
                    Authorization: `Bearer ${ token }`
                })
                successMessage(data.message)
                history.push("/panel/account")
                history.push("/panel/stats")
            } catch (e) {}
        } else {
            errorMessage("Поля не должны быть пустыми!")
        }
    }

    const items = [
        {id: 1, name: "Пульс", text: "pulse", type: "number", warn: <b className={Styles.warn}>Ex: 78</b>},
        {id: 2, name: "Температура", text: "temp", type: "number", warn: <b className={Styles.warn}>Ex: 36.6</b>},
        {id: 3, name: "Давление", text: "pressure", type: "number", warn: <b className={Styles.warn}>Ex: 120,80</b>},
        {id: 4, name: "Сахар", text: "sugar", type: "number", warn: <b className={Styles.warn}>Ex: 4.5</b>}
    ]

    const elems = items.map(({id, name, text, type, warn}) => {
        return(
            <div key={ id } className={Styles.inputBlock}>
                <b className={Styles.label}>{ name }</b>
                <input 
                    type={ type }
                    className={Styles.input}
                    name={ text }
                    placeholder={ name }
                    autoComplete="off"
                    onChange={changeHandler} />
                { warn }
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
                        <a href="/" className={loading ? Styles.dn : Styles.save} onClick={changeCard}>Сохранить</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StatsForm