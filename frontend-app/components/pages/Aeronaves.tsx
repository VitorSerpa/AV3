import style from "./Aeronaves.module.css"
import LateralBarButton from "../HTMLComponents/LateralBarButton"
import Button from "../HTMLComponents/Button"
export default function Aeronaves({ role }: { role: string }) {
    const aeronaves = [
        { id: 1, modelo: "Super Tucano", tipo: "Militar", capacidadePessoas: 2, alcance: 4820, pathImg: "/aeronaves/SUPERTUCANO.png" },
        { id: 2, modelo: "KC-390", tipo: "Militar", capacidadePessoas: 80, alcance: 6019, pathImg: "/aeronaves/kc390.png" },
        { id: 3, modelo: "International AMX", tipo: "Militar", capacidadePessoas: 2, alcance: 3300, pathImg: "/aeronaves/internationalAMX.png" },
        { id: 4, modelo: "E-Jet E195", tipo: "Comercial", capacidadePessoas: 118, alcance: 4260, pathImg: "/aeronaves/E-Jet E195.png" },

    ]

    const renderOptions = (role: string) => {
        if (role == "admin" || role == "engenheiro") {
            return (
                <div className={style.options}>
                    <LateralBarButton title="Gerar Relatório" link=""></LateralBarButton>
                    <LateralBarButton title="Realizar Testes" link=""></LateralBarButton>
                </div>
            )
        }
    }

    const renderButton = (role: string) => {
        if (role == "admin") {
            return (
                <>
                    <Button title="Criar Aeronave" link=""></Button>
                </>
            )
        }

    }

    return (
        <div className={style.mainContainer}>
            <div className={style.titleDiv}>
                <h1 className={style.title}>Aeronaves</h1>
                <div className={style.titleButton}>
                    {renderButton(role)}
                </div>
            </div>
            <div className={style.sectionContainer}>
                {aeronaves.map((aeronave) => {
                    return (
                        <div className={style.aeronaveContainer} key={aeronave.id}>
                            <div className={style.description}>
                                <div className={style.titleContainer}>
                                    <h3>Modelo: {aeronave.modelo}</h3>
                                    <img className={style.imgAeronave} src={aeronave.pathImg} alt="" />
                                </div>
                                <p>Tipo: {aeronave.tipo}</p>
                                <p>Capacidade: {aeronave.capacidadePessoas} pessoas</p>
                                <p>Alcance: {aeronave.alcance} km</p>
                            </div>
                            {renderOptions(role)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}