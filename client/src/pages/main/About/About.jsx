import React from "react"
import Styles from "./About.module.css"
import Container from "./../../../App.module.css"
import { useMediaQuery } from 'react-responsive'
import Github from "./../../../assets/img/github.svg"

const About = () => {
    const small = useMediaQuery(
        { minDeviceWidth: 700 }
    )

    const xsmall = useMediaQuery(
        { minDeviceWidth: 500 }
    )

    return(
        <div className={Container.container}>
            <h2 className={Styles.title}>О нас</h2>
            <div className={small ? Styles.block : `${Styles.block} ${Styles.blockMedia}`}>
                <h2 className={Styles.heading}>teleOpeka</h2>
                <p className={Styles.text}>
                    Платформа <span className={Styles.colored}>teleOpeka</span> — это система, помогающая в уходе за больным. 
                    Благодаря платформе <span className={Styles.colored}>teleOpeka</span>, семья больного может выполнять ежедневные обязанности: 
                    работать, учиться, находиться в другом месте и одновременно ухаживать за близким человеком. 
                    Если возникнет чрезвычайная ситуация опекун или родственник будет проинформирован об этом.
                    Врач, используя систему <span className={Styles.colored}>teleOpeka</span>, сможет провести вступительную диагностику и принять решение о посещении больного.
                </p>
//                 <p className={xsmall ? Styles.remark : `${Styles.remark} ${Styles.remarkMedia}`}>
//                     Created by<span className={`${Styles.colored} ${Styles.ml}`}>Ilyas Yangurazov</span>
//                     <a className={Styles.link } href="https://github.com/ilyas0707/teleOpeka" target="_blank" rel="noopener noreferrer">
//                         <img className={Styles.img} src={ Github } alt="github"/>
//                     </a>
//                 </p>
            </div>
        </div>
    )
}

export default About
