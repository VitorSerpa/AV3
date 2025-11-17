import LateralBar from "@/components/LateralBar/LateralBar";
import style from "./App.module.css";
import Funcionarios from "@/components/pages/Funcionarios";

export default function Page() {

  return (
    <div className={style.mainContainer}>
      <LateralBar itensPermitidos={["Aeronaves Atribuidas", "Peças", "Funcionarios", "Etapas", "Realizar Teste"]} role="operador" />
      <div className={style.content}>
        <Funcionarios role="operador" />
      </div>
    </div>
  );
}