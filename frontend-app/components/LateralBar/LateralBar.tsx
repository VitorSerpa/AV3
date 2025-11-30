"use client"

import UserContainer from "../UserContainer/UserContainer"
import LateralBarButton from "../HTMLComponents/LateralBarButton"
import style from "./LateralBar.module.css"

interface Usuario {
  nome: string
  nivel_permissao: string
}

interface LateralBarProps {
  itensPermitidos: Array<string>
  role: string
  usuario: Usuario
}

export default function LateralBar({ itensPermitidos, role, usuario }: LateralBarProps) {

  const botoes = [
    { title: "Aeronaves", link: "/" + role + "/aeronaves" },
    { title: "Aeronaves Atribuidas", link: "/" + role + "/aeronaves" },
    { title: "Funcionarios", link: "/" + role + "/funcionarios" },
    { title: "Peças", link: "/" + role + "/pecas" },
    { title: "Etapas", link: "/" + role + "/etapas" },
  ]

  const botoesVisiveis = botoes.filter((botao) =>
    itensPermitidos.includes(botao.title)
  )

  return (
    <div className={style.lateralBar}>
      <UserContainer
        username={usuario?.nome ?? "Desconhecido"}
        cargo={usuario?.nivel_permissao ?? "Desconhecido"}
      />
      <section>
        {botoesVisiveis.map((botao) => (
          <LateralBarButton
            key={botao.title}
            title={botao.title}
            link={botao.link}
          />
        ))}
      </section>
    </div>
  )
}
