"use client"

import style from "./Etapas.module.css";
import LateralBarButton from "../HTMLComponents/LateralBarButton";
import Button from "../HTMLComponents/Button";
import { useEffect, useState } from "react";
import axios from "axios";

interface Etapa {
    id_etapa: number;
    nome: string;
    prazo: string;
    status_etapa: "pendente" | "andamento" | "concluida";
}

interface Funcionario {
    id_funcionario: number;
    nome: string;
    nivel_permissao: string;
}

export default function Etapas({ role }: { role: string }) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const [etapas, setEtapas] = useState<Etapa[]>([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [etapaSelecionada, setEtapaSelecionada] = useState<Etapa | null>(null);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<number | null>(null);

    const [novaEtapa, setNovaEtapa] = useState({
        nome: "",
        prazo: "",
        status_etapa: "pendente" as "pendente" | "andamento" | "concluida",
    });

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        axios.get<Etapa[]>(`${apiUrl}/etapa`, {
            headers: { "x-request-start": Date.now().toString() }
        })
        .then((response) => {
            setEtapas(response.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Erro ao carregar etapas:", err);
            setLoading(false);
        });
    }, [apiUrl]);

    const handleAtribuirFuncionario = async (etapa: Etapa) => {
        setEtapaSelecionada(etapa);

        try {
            const response = await axios.get<Funcionario[]>(`${apiUrl}/funcionario`, {
                headers: { "x-request-start": Date.now().toString() }
            });
            setFuncionarios(response.data);
            setIsAssignModalOpen(true);
        } catch (error) {
            console.error("Erro ao carregar funcionários:", error);
        }
    };

    const confirmarAtribuicao = async () => {
        if (!funcionarioSelecionado || !etapaSelecionada) return;

        try {
            await axios.post(`${apiUrl}/etapa/etapaFuncionario`, {
                id_funcionario: funcionarioSelecionado,
                id_etapa: etapaSelecionada.id_etapa
            }, {
                headers: { "x-request-start": Date.now().toString() }
            });

            alert("Funcionário atribuído com sucesso!");
            setIsAssignModalOpen(false);
        } catch (error) {
            console.error("Erro ao atribuir funcionário:", error);
        }
    };

    const handleCriarEtapa = async () => {
        try {
            const response = await axios.post(`${apiUrl}/etapa`, novaEtapa, {
                headers: { "x-request-start": Date.now().toString() }
            });
            setEtapas([...etapas, response.data]);
            setNovaEtapa({ nome: "", prazo: "", status_etapa: "pendente" });
            closeModal();
        } catch (err) {
            console.error("Erro ao criar etapa:", err);
        }
    };

    const renderStatus = (status: string) => {
        if (status === "concluida") return <p className={style.statusVerde}>Status: CONCLUIDA</p>;
        if (status === "pendente") return <p className={style.statusVermelho}>Status: PENDENTE</p>;
        if (status === "andamento") return <p className={style.statusAzul}>Status: EM ANDAMENTO</p>;
    };

    const renderOptions = (role: string, etapa: Etapa) => {
        if (role === "engenheiro" || role === "operador") {
            return (
                <>
                    <LateralBarButton title="Atualizar Status" link="" />
                    <LateralBarButton title="Aeronave Associada" link="" />
                </>
            );
        }
        if (role === "admin") {
            return (
                <>
                    <LateralBarButton title="Atribuir Funcionarios" onClick={() => handleAtribuirFuncionario(etapa)} />
                    <LateralBarButton title="Atualizar Status" link="" />
                    <LateralBarButton title="Aeronave Associada" link="" />
                </>
            );
        }
    };

    const renderButton = (role: string) => {
        if (role === "admin" || role === "engenheiro") {
            return (
                <div onClick={openModal}>
                    <Button title="Criar Etapa" link="" />
                </div>
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
                {loading && <p>Carregando etapas...</p>}

                {etapas.map((etapa) => (
                    <div className={style.aeronaveContainer} key={etapa.id_etapa}>
                        <div className={style.description}>
                            <div className={style.titleContainer}>
                                <h3>{etapa.nome}</h3>
                                <p>ID: {etapa.id_etapa}</p>
                                <p>Prazo: {etapa.prazo}</p>
                                {renderStatus(etapa.status_etapa)}
                            </div>
                        </div>
                        <div className={style.options}>{renderOptions(role, etapa)}</div>
                    </div>
                ))}

                {isModalOpen && (
                    <div className={style.modalOverlay}>
                        <div className={style.modalContent}>
                            <h2>Criar Nova Etapa</h2>

                            <label>Nome da etapa:
                                <input type="text"
                                    value={novaEtapa.nome}
                                    onChange={(e) => setNovaEtapa({ ...novaEtapa, nome: e.target.value })}
                                />
                            </label>

                            <label>Prazo:
                                <input type="date"
                                    value={novaEtapa.prazo}
                                    onChange={(e) => setNovaEtapa({ ...novaEtapa, prazo: e.target.value })}
                                />
                            </label>

                            <label>Status:
                                <select
                                    value={novaEtapa.status_etapa}
                                    onChange={(e) => setNovaEtapa({ ...novaEtapa, status_etapa: e.target.value as any })}
                                >
                                    <option value="pendente">Pendente</option>
                                    <option value="andamento">Em andamento</option>
                                    <option value="concluida">Concluída</option>
                                </select>
                            </label>

                            <div className={style.modalButtons}>
                                <button onClick={handleCriarEtapa}>Criar</button>
                                <button onClick={closeModal}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}

                {isAssignModalOpen && (
                    <div className={style.modalOverlay}>
                        <div className={style.modalContent}>
                            <h2>Atribuir Funcionário à Etapa</h2>
                            <p>Etapa: <strong>{etapaSelecionada?.nome}</strong></p>

                            <label>Selecione o funcionário:</label>
                            <select
                                onChange={(e) => setFuncionarioSelecionado(Number(e.target.value))}
                            >
                                <option value="">Selecione...</option>
                                {funcionarios.map((f) => (
                                    <option key={f.id_funcionario} value={f.id_funcionario}>
                                        {f.nome} ({f.nivel_permissao})
                                    </option>
                                ))}
                            </select>

                            <div className={style.modalButtons}>
                                <button onClick={confirmarAtribuicao}>Confirmar</button>
                                <button onClick={() => setIsAssignModalOpen(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
