"use client"

import style from "./Funcionarios.module.css";
import LateralBarButton from "../HTMLComponents/LateralBarButton";
import Button from "../HTMLComponents/Button";
import { useEffect, useState } from "react";
import axios from "axios";

interface Funcionario {
    id_funcionario: number;
    nome: string;
    telefone: string;
    endereco: string;
    usuario: string;
    senha: string;
    nivel_permissao: "adminsitrador" | "engenheiro" | "operador";
}

export default function Funcionarios({ role }: { role: string }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [error, setError] = useState<string | null>(null);
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [warningMessage, setWarningMessage] = useState("");
    const [isModalWarningOpen, setIsModalWarningOpen] = useState(false);

    const [newFuncionario, setNewFuncionario] = useState({
        nome: "",
        telefone: "",
        endereco: "",
        usuario: "",
        senha: "",
        nivel_permissao: "operador" as "adminsitrador" | "engenheiro" | "operador",
    });

    useEffect(() => {
        axios.get<Funcionario[]>(apiUrl + "/funcionario", {
            headers: { "x-request-start": Date.now().toString() }
        })
        .then((response) => {
            setFuncionarios(response.data);
            setLoading(false);
        })
        .catch((err) => {
            setError("Erro ao carregar funcionários");
            console.error(err);
            setLoading(false);
        });
    }, [apiUrl]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleCriarFuncionario = async () => {
        try {
            const response = await axios.post(apiUrl + "/funcionario", newFuncionario, {
                headers: { "x-request-start": Date.now().toString() }
            });
            setFuncionarios([...funcionarios, response.data]);
            closeModal();
        } catch (err) {
            console.error("Erro ao criar funcionário:", err);
            setWarningMessage("Erro ao criar funcionário. Verifique os dados e tente novamente.");
            setIsModalWarningOpen(true);
        }
    };

    const handleGetEtapas = async (funcionario: Funcionario) => {
        try {
            const { data } = await axios.get(apiUrl + "/funcionario/" + funcionario.id_funcionario, {
                headers: { "x-request-start": Date.now().toString() }
            });

            if (data.length === 0) {
                setWarningMessage("Nenhuma etapa atribuída a este funcionário.");
            } else {
                const msg = data
                    .map((etapa: any) =>
                        `ID: ${etapa.id_etapa} - ${etapa.nome} (${etapa.status_etapa})`
                    )
                    .join("\n");

                setWarningMessage(msg);
            }

            setIsModalWarningOpen(true);
            closeModal();

        } catch (err) {
            setWarningMessage("Erro ao buscar etapas.");
            setIsModalWarningOpen(true);
        }
    };

    const renderUsers = (role: string, funcionario: Funcionario) => {
        if (role === "admin") {
            return (
                <>
                    <label className={style.label}>Username</label>
                    <input type="text" value={funcionario.usuario} readOnly />

                    <label className={style.label}>Password</label>
                    <input type="password" value={funcionario.senha} readOnly />
                </>
            );
        }
    }

    const renderOptions = (role: string, funcionario: Funcionario) => {
        if (role === "admin" || role === "engenheiro") {
            return (
                <LateralBarButton title="Etapas Associada" onClick={() => handleGetEtapas(funcionario)} />
            );
        }
    };

    const renderButton = (role: string) => {
        if (role === "admin") {
            return (
                <Button title="Criar Funcionario" link="" onClick={openModal} />
            );
        }
    };

    return (
        <div className={style.mainContainer}>
            <div className={style.titleDiv}>
                <h1 className={style.title}>Funcionários</h1>
                <div className={style.titleButton}>{renderButton(role)}</div>
            </div>
            <div className={style.sectionContainer}>
                {loading && <p>Carregando funcionários...</p>}
                {funcionarios.map((funcionario) => (
                    <div className={style.aeronaveContainer} key={funcionario.id_funcionario}>
                        <div className={style.description}>
                            <div className={style.titleContainer}>
                                <h3>{funcionario.nome}</h3>
                                <img className={style.imgFuncionario} src="/Avatar.svg" />
                            </div>
                            {renderUsers(role, funcionario)}
                        </div>
                        <div className={style.options}>
                            <p>ID: {funcionario.id_funcionario}</p>
                            <p>Nome: {funcionario.nome}</p>
                            <p>Telefone: {funcionario.telefone}</p>
                            <p>Permissão: {funcionario.nivel_permissao}</p>
                            {renderOptions(role, funcionario)}
                        </div>
                    </div>
                ))}

                {isModalOpen && (
                    <div className={style.modalOverlay}>
                        <div className={style.modalContent}>
                            <h2>Criar Novo Funcionário</h2>

                            <label>
                                Nome:
                                <input
                                    type="text"
                                    value={newFuncionario.nome}
                                    onChange={(e) => setNewFuncionario({ ...newFuncionario, nome: e.target.value })}
                                />
                            </label>

                            <label>
                                Telefone:
                                <input
                                    type="text"
                                    value={newFuncionario.telefone}
                                    onChange={(e) => setNewFuncionario({ ...newFuncionario, telefone: e.target.value })}
                                />
                            </label>

                            <label>
                                Endereço:
                                <input
                                    type="text"
                                    value={newFuncionario.endereco}
                                    onChange={(e) => setNewFuncionario({ ...newFuncionario, endereco: e.target.value })}
                                />
                            </label>

                            <label>
                                Usuário:
                                <input
                                    type="text"
                                    value={newFuncionario.usuario}
                                    onChange={(e) => setNewFuncionario({ ...newFuncionario, usuario: e.target.value })}
                                />
                            </label>

                            <label>
                                Senha:
                                <input
                                    type="password"
                                    value={newFuncionario.senha}
                                    onChange={(e) => setNewFuncionario({ ...newFuncionario, senha: e.target.value })}
                                />
                            </label>

                            <label>
                                Nível de Permissão:
                                <select
                                    value={newFuncionario.nivel_permissao}
                                    onChange={(e) =>
                                        setNewFuncionario({ ...newFuncionario, nivel_permissao: e.target.value as any })
                                    }
                                >
                                    <option value="adminsitrador">Administrador</option>
                                    <option value="engenheiro">Engenheiro</option>
                                    <option value="operador">Operador</option>
                                </select>
                            </label>

                            <div className={style.modalButtons}>
                                <button onClick={handleCriarFuncionario}>Criar</button>
                                <button onClick={closeModal}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}

                {isModalWarningOpen && (
                    <div className={style.modalOverlay}>
                        <div className={style.modalContent}>
                            <h2>Aviso</h2>
                            <p>{warningMessage}</p>
                            <div className={style.modalButtons}>
                                <button
                                    onClick={() => setIsModalWarningOpen(false)}
                                    style={{ backgroundColor: "#e0e0e0", color: "#333" }}
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
