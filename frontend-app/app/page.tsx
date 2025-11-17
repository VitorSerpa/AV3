"use client"
import { useState } from "react";
import style from "./App.module.css"
import Button from "@/components/HTMLComponents/Button"

export default function LoginPage() {
    const [cargo, setCargo] = useState("");
    return (

        <div className={style.mainSection}>
            <aside className={style.asideTitle}>
                <h2>AEROCODE</h2>
            </aside>
            <section className={style.loginSection}>
                <div className={style.loginDiv}>
                    <h4>Login</h4>
                    <div className={style.inputDiv}>


                        <label htmlFor="cargo">Cargo</label>
                        <select id="cargo" name="cargo" onChange={(e) => {setCargo(e.target.value)}}>
                            <option value="">Selecione...</option>
                            <option value="engenheiro">Engenheiro</option>
                            <option value="operador">Operador</option>
                            <option value="admin">Admin</option>
                        </select>
                        <label htmlFor="">Username</label>
                        <input type="text" name="" id="" />
                        <label htmlFor="">Senha</label>
                        <input type="text" name="" id="" />
                        <Button title="Entrar" link={"/" + cargo}></Button>
                    </div>
                </div>
            </section>
        </div>
    )
}