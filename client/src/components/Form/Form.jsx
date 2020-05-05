import React, { useState, useEffect, useContext } from "react"
import Styles from "./Form.module.css"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useHttp } from '../../hooks/http.hook'
import { useError } from '../../hooks/error.hook'
import { useSuccess } from '../../hooks/success.hook'
import { AuthContext } from '../../context/AuthContext'
import { useHistory } from "react-router-dom"

const Form = ({openForm}) => {
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
        surname: "",
        middlename: "",
        age: "",
        height: "",
        weight: "",
        bloodType: ""
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
        if (form.name !== "" || form.surname !== "" || form.middlename !== "" || form.age !== "" || form.height !== "" || form.weight !== "" || form.bloodType !== "") {
            try {
                const data = await request("/api/admin/add", "POST", { 
                    name: form.name,
                    surname: form.surname,
                    middlename: form.middlename,
                    age: form.age,
                    height: form.height,
                    weight: form.weight,
                    bloodType: form.bloodType }, {
                    Authorization: `Bearer ${ token }`
                })
                successMessage(data.message)
                history.push("/panel/plan")
                history.push("/panel/account")
            } catch (e) {}
        } else {
            errorMessage("Поля не должны быть пустыми!")
        }
    }

    const items = [
        {id: 1, name: "Имя", text: "name", type: "text"},
        {id: 2, name: "Фамилия", text: "surname", type: "text"},
        {id: 3, name: "Отчество", text: "middlename", type: "text"},
        {id: 4, name: "Возраст", text: "age", type: "number"},
        {id: 5, name: "Рост(в метрах)", text: "height", type: "number"},
        {id: 6, name: "Вес", text: "weight", type: "number"},
        {id: 7, name: "Группа крови", text: "bloodType", type: "text", warn: <b className={Styles.warn}>Ex: 1(-)</b>}
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

export default Form