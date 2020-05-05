import React from "react"
import Styles from "./Whyus.module.css"
import Container from "./../../../App.module.css"
import { useMediaQuery } from 'react-responsive'

const Whyus = () => {
    const small = useMediaQuery(
        { minDeviceWidth: 700 }
    )

    const items = [
        { id: 1, name: "Показатели", text: "Показатели состояние пациента полученные от опекуна, представленные в виде читабельных графиков." },
        { id: 2, name: "Дневник наблюдений", text: "Дневник наблюдения за больным составленный специалистом и опекуном" },
        { id: 3, name: "Календарь", text: "Интерактивный календарь приёма лекарств и визитов врача с уведомлениями для родственников, сиделок, а также самого больного." },
        { id: 4, name: "Рекомендации по уходу", text: "Рекомендации по уходу в текстовом, доступный для врача/мед персонала/сиделки/родственников." },
        { id: 5, name: "Чат", text: "Чат - возможность быстрой связи с лечащим врачом." }
    ]

    const elems = items.map(({id, name, text}) => {
        return(
            <div key={ id } className={small ? 
                Styles.item : 
                `${Styles.item} ${Styles.itemMedia}`}>
                <span className={Styles.dot}></span>
                <div className={Styles.description}>
                    <h3 className={Styles.heading}>{ name }</h3>
                    <p className={Styles.text}>{ text }</p>
                </div>
            </div>
        )
    })

    return(
        <div className={Container.container}>
            <h2 className={Styles.title}>Почему мы?</h2>
            <div className={small ? Styles.block : `${Styles.block} ${Styles.blockMedia}`}>
                { elems }
            </div>
        </div>
    )
}

export default Whyus