import React from "react";
import style from "./LateralBarButton.module.css"

export default function LateralBarButton({title, link}:{title: string, link: string}){
    return(
        <a className={style.a} href={link}><button className={style.button}>{title}</button></a>
    )
}