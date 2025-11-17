import LateralBar from "@/components/LateralBar/LateralBar"
import style from "./App.module.css"

export default function page() {
    return (
        <div className={style.mainContainer}>
            <LateralBar itensPermitidos={["Aeronaves", "Peças", "Funcionarios", "Etapas", "Realizar Teste"]} role="admin"></LateralBar>

            <div className={style.title}>
                <h1>ADMINISTRADOR</h1>
            </div>

        </div>
    )
}