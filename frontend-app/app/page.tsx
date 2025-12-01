"use client";
import { useState } from "react";
import style from "./App.module.css";
import Button from "@/components/HTMLComponents/Button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post(apiUrl + "/login", {
                usuario,
                senha
            });

            const user = response.data.user;
            console.log(user)
            console.log("user from API:", user);
            localStorage.setItem("user", JSON.stringify(user));

            router.push("/admin");

        } catch (err: any) {
            setErrorMsg("Usuário ou senha incorretos.");
        }
    };

    return (
        <div className={style.mainSection}>
            <aside className={style.asideTitle}>
                <h2>AEROCODE</h2>
            </aside>

            <section className={style.loginSection}>
                <div className={style.loginDiv}>
                    <h4>Login</h4>
                    <div className={style.inputDiv}>

                        <label>Username</label>
                        <input
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />

                        <label>Senha</label>
                        <input
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        {errorMsg && <p className={style.error}>{errorMsg}</p>}

                        <div onClick={handleLogin}>
                            <Button title="Entrar" />
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
