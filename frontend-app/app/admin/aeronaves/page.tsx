import Aeronaves from "@/components/pages/Aeronaves";
import LateralBar from "@/components/LateralBar/LateralBar";
import style from "./App.module.css";

export default function Page() {

  return (
    <div className={style.mainContainer}>
      <LateralBar itensPermitidos={["Aeronaves Atribuidas", "Peças", "Funcionarios", "Etapas", "Realizar Teste"]} role="admin"/>
      <div className={style.content}>
        <Aeronaves role="admin" />
      </div>
    </div>
  );
}