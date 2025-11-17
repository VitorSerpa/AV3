import LateralBar from "@/components/LateralBar/LateralBar"
import style from "./App.module.css"

export default function page() {
    return (
        <div className={style.mainContainer}>
            <LateralBar itensPermitidos={["Aeronaves Atribuidas", "Peças", "Funcionarios", "Etapas", "Realizar Teste"]} role="engenheiro"></LateralBar>
            <div className={style.title}>
                <h1>ENGENHERIO</h1>
            </div>
        </div>
    )
}