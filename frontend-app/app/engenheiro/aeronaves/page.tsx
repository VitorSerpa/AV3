"use client";

import { useEffect, useState } from "react";
import Aeronaves from "@/components/pages/Aeronaves";
import LateralBar from "@/components/LateralBar/LateralBar";
import style from "./App.module.css";

interface Usuario {
  nome: string;
  nivel_permissao: string;
}

export default function Page() {
  const [role, setRole] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (!userJson) {
      setLoading(false);
      return;
    }

    const user = JSON.parse(userJson);
    setRole(user.nivel_permissao);
    setUsuario(user);
    setLoading(false);
  }, []);
  
  if (loading) return <p>Carregando...</p>;
  if (!usuario || !role) return <p>Usuário não encontrado. Faça login.</p>;
  
  return (
    <div className={style.mainContainer}>
      <LateralBar
        itensPermitidos={[
          "Aeronaves Atribuidas",
          "Peças",
          "Funcionarios",
          "Etapas",
          "Realizar Teste",
        ]}
        role={role}
        usuario={usuario}
      />
      <div className={style.content}>
        <Aeronaves role={role} />
      </div>
    </div>
  );
}
