import style from "./Pecas.module.css";
import LateralBarButton from "../HTMLComponents/LateralBarButton";
import Button from "../HTMLComponents/Button";
export default function Pecas({ role }: { role: string }) {
    let pecas =
        [
            {
                "id": 1,
                "nome": "Trem de Pouso",
                "tipo": "IMPORTADA",
                "fornecedor": "Boeing",
                "status": "EM TRANSPORTE"
            },
            {
                "id": 2,
                "nome": "Motor TurboFan",
                "tipo": "IMPORTADA",
                "fornecedor": "Rolls-Royce",
                "status": "EM PRODUÇÃO"
            },
            {
                "id": 3,
                "nome": "Asa Principal",
                "tipo": "NACIONAL",
                "fornecedor": "Embraer",
                "status": "PRONTA"
            },
            {
                "id": 4,
                "nome": "Painel de Controle",
                "tipo": "NACIONAL",
                "fornecedor": "AeroTech",
                "status": "EM PRODUÇÃO"
            },
        ];

    if (role == "operador") {

    }

    const renderStatus = (statusPeca: string) => {
        if (statusPeca == "PRONTA") {
            return (
                <p className={style.statusVerde}>Status: {statusPeca}</p>
            )
        }
        if (statusPeca == "EM PRODUÇÃO") {
            return (
                <p className={style.statusVermelho}>Status: {statusPeca}</p>
            )
        }
        if (statusPeca == "EM TRANSPORTE") {
            return (
                <p className={style.statusAzul}>Status: {statusPeca}</p>
            )
        }
    }

    const renderOptions = (role: string) => {
        if (role == "admin" || role == "engenheiro" || role == "operador") {
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
    };

    const renderButton = (role: string) => {
        if (role == "admin" || role == "engenheiro" || role == "operador") {
            return (
                <>
                    <Button title="Criar Peça" link=""></Button>
                </>
            );
        }
    };

    return (
        <div className={style.mainContainer}>
            <div className={style.titleDiv}>
                <h1 className={style.title}>Peças</h1>
                <div className={style.titleButton}>{renderButton(role)}</div>
            </div>
            <div className={style.sectionContainer}>
                {pecas.map((peca) => {
                    return (
                        <div
                            className={style.aeronaveContainer}
                            key={peca.id}
                        >
                            <div className={style.description}>
                                <div className={style.titleContainer}>
                                    <h3>{peca.nome}</h3>
                                    <p>ID: {peca.id}</p>
                                    <p>Fornecedor: {peca.fornecedor}</p>
                                    <p>Permissao: {peca.tipo}</p>
                                    <p>Tipo: {peca.tipo}</p>
                                    {renderStatus(peca.status)}
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
