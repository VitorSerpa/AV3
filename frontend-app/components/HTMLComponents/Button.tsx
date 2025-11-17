import React from "react";
import style from "./Button.module.css"

export default function Button({title, link}:{title: string, link: string}){
    return(
        <a className={style.a} href={link}><button className={style.button}>{title}</button></a>
    )
}