import style from "./Etapas.module.css";
import LateralBarButton from "../HTMLComponents/LateralBarButton";
import Button from "../HTMLComponents/Button";
export default function Etapas({ role }: { role: string }) {
    let etapas =
        [
            {
                "id": 1,
                "nome": "Configuração dos controles de Bordo",
                "prazo": "2 Semanas",
                "status": "PENDENTE"
            },
            {
                "id": 2,
                "nome": "Instalação do sistema de navegação",
                "prazo": "3 Semanas",
                "status": "EM ANDAMENTO"
            },
            {
                "id": 3,
                "nome": "Teste de pressurização da cabine",
                "prazo": "1 Semana",
                "status": "CONCLUIDA"
            },
            {
                "id": 4,
                "nome": "Ajuste dos sistemas elétricos",
                "prazo": "4 Semanas",
                "status": "EM ANDAMENTO"
            },
        ];

    if (role == "operador") {

    }

    const renderStatus = (statusPeca: string) => {
        if (statusPeca == "CONCLUIDA") {
            return (
                <p className={style.statusVerde}>Status: {statusPeca}</p>
            )
        }
        if (statusPeca == "PENDENTE") {
            return (
                <p className={style.statusVermelho}>Status: {statusPeca}</p>
            )
        }
        if (statusPeca == "EM ANDAMENTO") {
            return (
                <p className={style.statusAzul}>Status: {statusPeca}</p>
            )
        }
    }

    const renderOptions = (role: string) => {
        if (role == "engenheiro" || role == "operador") {
            return (
                <>
                    <LateralBarButton
                        title="Atualizar Status"
                        link=""
                    ></LateralBarButton>
                    <LateralBarButton
                        title="Aeronave Associada"
                        link=""
                    ></LateralBarButton>
                </>
            );
        }
        if (role == "admin") {
            return (
                <>
                    <LateralBarButton
                        title="Atribuir Funcionarios"
                        link=""
                    ></LateralBarButton>
                    <LateralBarButton
                        title="Atualizar Status"
                        link=""
                    ></LateralBarButton>
                    <LateralBarButton
                        title="Aeronave Associada"
                        link=""
                    ></LateralBarButton>
                </>
            );
        }
    };

    const renderButton = (role: string) => {
        if (role == "admin" || role == "engenheiro") {
            return (
                <>
                    <Button title="Criar Etapa" link=""></Button>
                </>
            );
        }
    };

    return (
        <div className={style.mainContainer}>
            <div className={style.titleDiv}>
                <h1 className={style.title}>Etapas</h1>
                <div className={style.titleButton}>{renderButton(role)}</div>
            </div>
            <div className={style.sectionContainer}>
                {etapas.map((etapa) => {
                    return (
                        <div
                            className={style.aeronaveContainer}
                            key={etapa.id}
                        >
                            <div className={style.description}>
                                <div className={style.titleContainer}>
                                    <h3>{etapa.nome}</h3>
                                    <p>ID: {etapa.id}</p>
                                    <p>Fornecedor: {etapa.nome}</p>

                                    {renderStatus(etapa.status)}
                                </div>
                            </div>
                            <div className={style.options}>
                                {renderOptions(role)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
