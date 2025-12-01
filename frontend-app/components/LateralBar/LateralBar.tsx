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
    { title: "Aeronaves", link: "/" + "admin" + "/aeronaves" },
    { title: "Aeronaves Atribuidas", link: "/" + "admin" + "/aeronaves" },
    { title: "Funcionarios", link: "/" + "admin" + "/funcionarios" },
    { title: "Peças", link: "/" + "admin" + "/pecas" },
    { title: "Etapas", link: "/" + "admin" + "/etapas" },
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
