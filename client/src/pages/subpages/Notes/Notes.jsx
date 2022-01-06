import React, { useState, useContext, useCallback, useEffect } from "react"
import Styles from "./Notes.module.css"
import Agenda from "./../../../components/Agenda/Agenda"
import { AuthContext } from "../../../context/AuthContext"
import { useHttp } from "../../../hooks/http.hook"
import NotesForm from "./../../../components/NotesForm/NotesForm"

const Notes = (userId) => {
    const [opened, setOpened] = useState(false)
    const { token } = useContext(AuthContext)
    const { loading, request } = useHttp()
    const [notes, setNotes] = useState([])
    const id = userId.id

    const getData = useCallback(async () => {
        try {
            const fetched = await request(`/api/notes/${id}`, "GET", null, {
                Authorization: `Bearer ${ token }`
            })
            setNotes(fetched)
        } catch (e) {}
    }, [token, id, request])

    useEffect(() => {
        getData()
    }, [getData])

    console.log(notes);

    const openForm = () => {
        if (opened === false) {
            setOpened(true)
        } else {
            setOpened(false)
        }
    }

    return(
        <div className={Styles.block}>
            <div className={Styles.button}>
                <a href="/" className={Styles.add} onClick={e => {e.preventDefault(); openForm()}}>Добавить</a>
            </div>
            { opened ? <NotesForm openForm={openForm} /> : <div></div> }
            { loading ? <div className={Styles.loading}></div> : notes && <Agenda notes={notes} />}
        </div>
    )
}

export default Notes