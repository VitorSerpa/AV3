import Aeronaves from "@/components/pages/Aeronaves";
import LateralBar from "@/components/LateralBar/LateralBar";
import style from "./App.module.css";
import Pecas from "@/components/pages/Pecas";
import Etapas from "@/components/pages/Etapas";


export default function Page() {

  return (
    <div className={style.mainContainer}>
      <LateralBar itensPermitidos={["Aeronaves Atribuidas", "Peças", "Funcionarios", "Etapas", "Realizar Teste"]} role="engenheiro" />
      <div className={style.content}>
        <Etapas role="engenheiro" />
      </div>
    </div>
  );
}