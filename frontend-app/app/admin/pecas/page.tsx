"use client";

import { useEffect, useState } from "react";
import LateralBar from "@/components/LateralBar/LateralBar";
import Pecas from "@/components/pages/Pecas";
import style from "./App.module.css";

interface Usuario {
  nome: string;
  nivel_permissao: string;
}

export default function Page() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      setUsuario({
        nome: user.nome,
        nivel_permissao: user.nivel_permissao,
      });
    }
    setLoading(false);
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (!usuario) return <p>Usuário não encontrado. Faça login.</p>;

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
        role={usuario.nivel_permissao}
        usuario={usuario}
      />
      <div className={style.content}>
        <Pecas role={usuario.nivel_permissao} />
      </div>
    </div>
  );
}
