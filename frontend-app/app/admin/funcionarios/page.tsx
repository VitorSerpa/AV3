import Funcionarios from "@/components/pages/Funcionarios";
import LateralBar from "@/components/LateralBar/LateralBar";
import style from "./App.module.css";

export default function Page() {

  return (
    <div className={style.mainContainer}>
      <LateralBar itensPermitidos={["Aeronaves", "Peças", "Funcionarios", "Etapas", "Realizar Teste"]} role="admin"  />
      <div className={style.content}>
        <Funcionarios role="admin" />
      </div>
    </div>
  );
}