"use client"

import style from "./Pecas.module.css";
import LateralBarButton from "../HTMLComponents/LateralBarButton";
import Button from "../HTMLComponents/Button";
import { useEffect, useState } from "react";
import axios from "axios";

interface Peca {
    id_peca: number;
    nome: string;
    tipo_peca: "nacional" | "importada";
    fornecedor: string;
    status_peca: "em_producao" | "em_transporte" | "pronta";
}

interface Aeronave {
    codigo: number;
    modelo: string;
    tipoAeronave: string;
    capacidade: number;
    alcance: number;
}

export default function Pecas({ role }: { role: string }) {
    const [pecas, setPecas] = useState<Peca[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [isModalWarningOpen, setIsModalWarningOpen] = useState(false);
    const [newPeca, setNewPeca] = useState({
        nome: "",
        tipo_peca: "nacional",
        fornecedor: "",
        status_peca: "em_producao",
    });
    const [selectedAeronave, setSelectedAeronave] = useState<Aeronave | null>(null);
    const [isAeronaveModalOpen, setIsAeronaveModalOpen] = useState(false);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        axios.get<Peca[]>(apiUrl + "/peca", {
            headers: { "x-request-start": Date.now().toString() }
        })
        .then((response) => {
            setPecas(response.data);
            setLoading(false);
        })
        .catch((err) => {
            setError("Erro ao carregar peças");
            console.error(err);
            setLoading(false);
        });
    }, [apiUrl]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const renderStatus = (statusPeca: string) => {
        if (statusPeca === "pronta") return <p className={style.statusVerde}>Status: PRONTA</p>;
        if (statusPeca === "em_producao") return <p className={style.statusVermelho}>Status: EM PRODUÇÃO</p>;
        if (statusPeca === "em_transporte") return <p className={style.statusAzul}>Status: EM TRANSPORTE</p>;
    };

    const renderOptions = (role: string, peca: Peca) => {
        if (role === "admin" || role === "engenheiro" || role === "operador") {
            return (
                <>
                    <LateralBarButton
                        title="Atualizar Status"
                        onClick={() => handleAtualizarStatus(peca)}
                    />
                    <LateralBarButton
                        title="Aeronave Associada"
                        onClick={() => handleGetAeronaveAssociada(peca)}
                    />
                </>
            );
        }
    };

    const renderButton = (role: string) => {
        if (role === "admin" || role === "engenheiro" || role === "operador") {
            return <Button title="Criar Peça" link="" onClick={openModal} />;
        }
    };

    const handleCreatePeca = async () => {
        try {
            const response = await axios.post(apiUrl + "/peca", newPeca, {
                headers: { "x-request-start": Date.now().toString() }
            });
            setPecas([...pecas, response.data]);
            closeModal();
        } catch (err) {
            console.error("Erro ao criar peça:", err);
        }
    };

    const handleAtualizarStatus = async (peca: Peca) => {
        try {
            if (peca.status_peca === "pronta") {
                setWarningMessage("Esta peça já está pronta e não pode ser atualizada.");
                return setIsModalWarningOpen(true);
            }
            if (peca.status_peca === "em_transporte") peca.status_peca = "pronta";
            if (peca.status_peca === "em_producao") peca.status_peca = "em_transporte";

            const response = await axios.put(`${apiUrl}/peca/${peca.id_peca}`, peca, {
                headers: { "x-request-start": Date.now().toString() }
            });
            setPecas(pecas.map(p => p.id_peca === peca.id_peca ? response.data : p));
        } catch (err) {
            console.error("Erro ao atualizar peça:", err);
        }
    };

    const handleGetAeronaveAssociada = async (peca: Peca) => {
        try {
            const response = await axios.get(`${apiUrl}/aeronave/${peca.id_peca}`, {
                headers: { "x-request-start": Date.now().toString() }
            });
            if (Array.isArray(response.data) && response.data.length > 0) {
                const aeronaveData = response.data[0];
                setSelectedAeronave({
                    codigo: aeronaveData.codigo,
                    modelo: aeronaveData.modelo,
                    tipoAeronave: aeronaveData.tipoAeronave,
                    capacidade: aeronaveData.capacidade,
                    alcance: aeronaveData.alcance,
                });
                setIsAeronaveModalOpen(true);
            } else {
                setWarningMessage("Nenhuma aeronave associada encontrada para esta peça.");
                setIsModalWarningOpen(true);
            }
        } catch (err: any) {
            setWarningMessage("Ocorreu um erro ao buscar a aeronave associada.");
            setIsModalWarningOpen(true);
        }
    };

    return (
        <div className={style.mainContainer}>
            <div className={style.titleDiv}>
                <h1 className={style.title}>Peças</h1>
                <div className={style.titleButton}>{renderButton(role)}</div>
            </div>

            <div className={style.sectionContainer}>
                {loading && <p>Carregando peças...</p>}
                {pecas.map((peca) => (
                    <div className={style.aeronaveContainer} key={peca.id_peca}>
                        <div className={style.description}>
                            <div className={style.titleContainer}>
                                <h3>{peca.nome}</h3>
                                <p>ID: {peca.id_peca}</p>
                                <p>Fornecedor: {peca.fornecedor}</p>
                                <p>Tipo: {peca.tipo_peca}</p>
                                {renderStatus(peca.status_peca)}
                            </div>
                        </div>
                        <div className={style.options}>
                            {renderOptions(role, peca)}
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <h2>Criar Nova Peça</h2>
                        <label>
                            Nome:
                            <input
                                type="text"
                                value={newPeca.nome}
                                onChange={(e) => setNewPeca({ ...newPeca, nome: e.target.value })}
                            />
                        </label>
                        <label>
                            Tipo:
                            <select
                                value={newPeca.tipo_peca}
                                onChange={(e) =>
                                    setNewPeca({ ...newPeca, tipo_peca: e.target.value as "nacional" | "importada" })
                                }
                            >
                                <option value="nacional">Nacional</option>
                                <option value="importada">Importada</option>
                            </select>
                        </label>
                        <label>
                            Fornecedor:
                            <input
                                type="text"
                                value={newPeca.fornecedor}
                                onChange={(e) => setNewPeca({ ...newPeca, fornecedor: e.target.value })}
                            />
                        </label>
                        <label>
                            Status:
                            <select
                                value={newPeca.status_peca}
                                onChange={(e) =>
                                    setNewPeca({
                                        ...newPeca,
                                        status_peca: e.target.value as "em_producao" | "em_transporte" | "pronta",
                                    })
                                }
                            >
                                <option value="em_producao">Em Produção</option>
                                <option value="em_transporte">Em Transporte</option>
                                <option value="pronta">Pronta</option>
                            </select>
                        </label>
                        <div className={style.modalButtons}>
                            <button onClick={handleCreatePeca}>Criar</button>
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

            {isAeronaveModalOpen && selectedAeronave && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <h2>Aeronave Associada</h2>
                        <p><strong>Código:</strong> {selectedAeronave.codigo}</p>
                        <p><strong>Modelo:</strong> {selectedAeronave.modelo}</p>
                        <p><strong>Tipo:</strong> {selectedAeronave.tipoAeronave}</p>
                        <p><strong>Capacidade:</strong> {selectedAeronave.capacidade} pessoas</p>
                        <p><strong>Alcance:</strong> {selectedAeronave.alcance} km</p>
                        <div className={style.modalButtons}>
                            <button
                                onClick={() => {
                                    setSelectedAeronave(null);
                                    setIsAeronaveModalOpen(false);
                                }}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
