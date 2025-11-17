"use client"

import UserContainer from "../UserContainer/UserContainer"
import LateralBarButton from "../HTMLComponents/LateralBarButton"
import style from "./LateralBar.module.css"
import { usePathname } from "next/navigation"

interface LateralBarProps {
  itensPermitidos: Array<string>
  role: string
}

export default function LateralBar({ itensPermitidos, role }: LateralBarProps) {

  const botoes = [
    { title: "Aeronaves", link: "/" + role + "/aeronaves" },
    { title: "Aeronaves Atribuidas", link: "/" + role + "/aeronaves" },
    { title: "Funcionarios", link: "/" +role + "/funcionarios" },
    { title: "Peças", link: "/" + role + "/pecas" },
    { title: "Etapas", link: "/" + role + "/etapas" },
  ]

  const botoesVisiveis = botoes.filter((botao) =>
    itensPermitidos.includes(botao.title)
  )

  return (
    <div className={style.lateralBar}>
      <UserContainer username="Vitor Serpa" />
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