import style from "./Funcionarios.module.css";
import LateralBarButton from "../HTMLComponents/LateralBarButton";
import Button from "../HTMLComponents/Button";
export default function Funcionarios({ role }: { role: string }) {
    let funcionarios = [
        {
            id: 1,
            nome: "Vitor Serpa",
            telefone: "12981312111",
            endereco: "Rua das Palmeiras, 123",
            usuario: "vitor.serpa",
            senha: "1234",
            nivelPermissao: "ADMINISTRADOR",
            pathImg: "/Avatar.svg",
        },
        {
            id: 2,
            nome: "Ana Souza",
            telefone: "11998765432",
            endereco: "Av. Brasil, 456",
            usuario: "ana.souza",
            senha: "4321",
            nivelPermissao: "OPERADOR",
            pathImg: "/Avatar.svg",
        },
        {
            id: 3,
            nome: "Carlos Lima",
            telefone: "21987654321",
            endereco: "Rua das Acácias, 789",
            usuario: "carlos.lima",
            senha: "abcd",
            nivelPermissao: "OPERADOR",
            pathImg: "/Avatar.svg",
        },
        {
            id: 4,
            nome: "Mariana Oliveira",
            telefone: "31991234567",
            endereco: "Av. Central, 321",
            usuario: "mariana.oliveira",
            senha: "senha123",
            nivelPermissao: "ENGENHEIRO",
            pathImg: "/Avatar.svg",
        },
    ];

    if (role == "operador") {
        funcionarios = [
            {
                id: 1,
                nome: "Vitor Serpa",
                telefone: "12981312111",
                endereco: "Rua das Palmeiras, 123",
                usuario: "vitor.serpa",
                senha: "1234",
                nivelPermissao: "OPERADOR",
                pathImg: "/Avatar.svg",
            },
        ];
    }

    const renderUsers = (role: string, funcionario: any) => {
        if (role == "admin") {
            return (
                <>
                    <label htmlFor="" className={style.label}>
                        Username
                    </label>
                    <input
                        type="text"
                        name=""
                        id=""
                        value={funcionario.usuario}
                        readOnly
                    />

                    <label htmlFor="" className={style.label}>
                        Password
                    </label>
                    <input
                        type="password"
                        name=""
                        id=""
                        value={funcionario.senha}
                        readOnly
                    />
                </>
            )
        }
    }

    const renderOptions = (role: string) => {
        if (role == "admin" || role == "engenheiro") {
            return (
                <LateralBarButton
                    title="Etapas Associada"
                    link=""
                ></LateralBarButton>
            );
        }
    };

    const renderButton = (role: string) => {
        if (role == "admin") {
            return (
                <>
                    <Button title="Criar Funcionario" link=""></Button>
                </>
            );
        }
    };

    return (
        <div className={style.mainContainer}>
            <div className={style.titleDiv}>
                <h1 className={style.title}>Funcionarios</h1>
                <div className={style.titleButton}>{renderButton(role)}</div>
            </div>
            <div className={style.sectionContainer}>
                {funcionarios.map((funcionario) => {
                    return (
                        <div
                            className={style.aeronaveContainer}
                            key={funcionario.id}
                        >
                            <div className={style.description}>
                                <div className={style.titleContainer}>
                                    <h3>{funcionario.nome}</h3>
                                    <img
                                        className={style.imgFuncionario}
                                        src={funcionario.pathImg}
                                    />
                                </div>
                                {renderUsers(role, funcionario)}
                            </div>
                            <div className={style.options}>
                                <p>ID: {funcionario.id}</p>
                                <p>Nome: {funcionario.nome}</p>
                                <p>Telefone: {funcionario.telefone}</p>
                                <p>Permissao: {funcionario.nivelPermissao}</p>
                                {renderOptions(role)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
