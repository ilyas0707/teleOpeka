import React, { useState, useEffect, useContext } from "react"
import Styles from "./PlanForm.module.css"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useHttp } from '../../hooks/http.hook'
import { useError } from '../../hooks/error.hook'
import { useSuccess } from '../../hooks/success.hook'
import { AuthContext } from '../../context/AuthContext'
import { useHistory } from "react-router-dom"

const PlanForm = ({openForm}) => {
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
        problem: "",
        solution: "",
        actions: ""
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
        if (form.problem !== "" || form.solution !== "" || form.actions !== "") {
            try {
                const data = await request("/api/plan/add", "POST", { 
                    problem: form.problem,
                    solution: form.solution,
                    actions: form.actions }, {
                    Authorization: `Bearer ${ token }`
                })
                successMessage(data.message)
                history.push("/panel/account")
                history.push("/panel/plan")
            } catch (e) {}
        } else {
            errorMessage("Поля не должны быть пустыми!")
        }
    }

    const items = [
        {id: 1, name: "Проблема", text: "problem", type: "text"},
        {id: 2, name: "Решение", text: "solution", type: "text"},
        {id: 3, name: "Вмешательсво", text: "actions", type: "text"}
    ]

    const elems = items.map(({id, name, text, type}) => {
        return(
            <div key={ id } className={Styles.inputBlock}>
                <b className={Styles.label}>{ name }</b>
                <textarea 
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
                        <a href="/" className={loading ? Styles.dn : Styles.save} onClick={changeCard}>Сохранить</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanForm