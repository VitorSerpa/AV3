"use client";

import style from "./Aeronaves.module.css";
import LateralBarButton from "../HTMLComponents/LateralBarButton";
import Button from "../HTMLComponents/Button";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Aeronaves({ role }: { role: string }) {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    interface Aeronave {
        codigo: number;
        modelo: string;
        tipoAeronave: string;
        capacidade: number;
        alcance: number;
    }

    interface Peca {
        id_peca: number;
        nome: string;
    }

    const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
    const [loading, setLoading] = useState(true);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const [novaAeronave, setNovaAeronave] = useState({
        modelo: "",
        tipoAeronave: "comercial",
        capacidade: "",
        alcance: ""
    });

    const [isAtribuirModalOpen, setIsAtribuirModalOpen] = useState(false);
    const [pecasDisponiveis, setPecasDisponiveis] = useState<Peca[]>([]);
    const [selectedAeronave, setSelectedAeronave] = useState<number | null>(null);
    const [selectedPeca, setSelectedPeca] = useState<string>("");

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    useEffect(() => {
        axios.get(apiUrl + "/aeronave", {
            headers: { "x-request-start": Date.now().toString() }
        })
            .then((response) => {
                setAeronaves(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erro ao carregar aeronaves:", err);
                setLoading(false);
            });
    }, []);

    const handleCriarAeronave = () => {
        axios.post(apiUrl + "/aeronave", {
            modelo: novaAeronave.modelo,
            tipoAeronave: novaAeronave.tipoAeronave,
            capacidade: Number(novaAeronave.capacidade),
            alcance: Number(novaAeronave.alcance)
        }, {
            headers: { "x-request-start": Date.now().toString() }
        })
            .then((response) => {
                setAeronaves([...aeronaves, response.data]);
                setNovaAeronave({
                    modelo: "",
                    tipoAeronave: "comercial",
                    capacidade: "",
                    alcance: ""
                });
                closeCreateModal();
            })
            .catch((err) => {
                console.error("Erro ao criar aeronave:", err);
            });
    };

    const openAtribuirPecaModal = (codigo: number) => {
        setSelectedAeronave(codigo);
        setIsAtribuirModalOpen(true);

        axios.get(apiUrl + "/peca", {
            headers: { "x-request-start": Date.now().toString() }
        })
            .then(res => {
                setPecasDisponiveis(res.data)
                console.log(res.data)
            })

            .catch(err => console.error("Erro ao carregar peças:", err));
    };

    const closeAtribuirPecaModal = () => {
        setSelectedAeronave(null);
        setSelectedPeca("");
        setIsAtribuirModalOpen(false);
    };

    const handleConfirmarAtribuicao = () => {
        if (!selectedAeronave || !selectedPeca) return;

        axios.put(`${apiUrl}/peca/${selectedPeca}`, {
            id_aeronave: selectedAeronave
        }, {
            headers: { "x-request-start": Date.now().toString() }
        })
            .then(() => {
                alert("Peça atribuída com sucesso!");
                closeAtribuirPecaModal();

                setPecasDisponiveis(prev => prev.filter(p => p.id_peca !== Number(selectedPeca)));
            })
            .catch(err => {
                console.error("Erro ao atribuir peça:", err);
                alert("Erro ao atribuir peça.");
            });

    };


    const renderOptions = (role: string, aeronave: Aeronave) => {
        if (role === "admin" || role === "engenheiro") {
            return (
                <div className={style.options}>
                    <LateralBarButton title="Gerar Relatório" link="" />
                    <LateralBarButton title="Realizar Testes" link="" />
                    <LateralBarButton
                        title="Atribuir peça"
                        onClick={() => openAtribuirPecaModal(aeronave.codigo)}
                    />
                </div>
            );
        }
    };

    const renderButton = (role: string) => {
        if (role === "admin") {
            return (
                <Button title="Criar Aeronave" onClick={openCreateModal} />
            );
        }
    };

    return (
        <div className={style.mainContainer}>

            <div className={style.titleDiv}>
                <h1 className={style.title}>Aeronaves</h1>
                <div className={style.titleButton}>{renderButton(role)}</div>
            </div>

            <div className={style.sectionContainer}>
                {loading && <p>Carregando aeronaves...</p>}

                {aeronaves.map((aeronave) => (
                    <div className={style.aeronaveContainer} key={aeronave.codigo}>
                        <div className={style.description}>
                            <div className={style.titleContainer}>
                                <h3>Modelo: {aeronave.modelo}</h3>
                            </div>
                            <p>Tipo: {aeronave.tipoAeronave}</p>
                            <p>Capacidade: {aeronave.capacidade} pessoas</p>
                            <p>Alcance: {aeronave.alcance} km</p>
                        </div>

                        {renderOptions(role, aeronave)}
                    </div>
                ))}
            </div>

            {isCreateModalOpen && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <h2>Criar Nova Aeronave</h2>

                        <label>Modelo:
                            <input
                                type="text"
                                value={novaAeronave.modelo}
                                onChange={(e) => setNovaAeronave({
                                    ...novaAeronave,
                                    modelo: e.target.value
                                })}
                            />
                        </label>

                        <label>Tipo:
                            <select
                                value={novaAeronave.tipoAeronave}
                                onChange={(e) => setNovaAeronave({
                                    ...novaAeronave,
                                    tipoAeronave: e.target.value
                                })}
                            >
                                <option value="comercial">Comercial</option>
                                <option value="militar">Militar</option>
                            </select>
                        </label>

                        <label>Capacidade:
                            <input
                                type="number"
                                value={novaAeronave.capacidade}
                                onChange={(e) => setNovaAeronave({
                                    ...novaAeronave,
                                    capacidade: e.target.value
                                })}
                            />
                        </label>

                        <label>Alcance (km):
                            <input
                                type="number"
                                value={novaAeronave.alcance}
                                onChange={(e) => setNovaAeronave({
                                    ...novaAeronave,
                                    alcance: e.target.value
                                })}
                            />
                        </label>

                        <div className={style.modalButtons}>
                            <button onClick={handleCriarAeronave}>Criar</button>
                            <button onClick={closeCreateModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            {isAtribuirModalOpen && (
                <div className={style.modalOverlay}>
                    <div className={style.modalContent}>
                        <h2>Atribuir peça à aeronave</h2>

                        <label>Peça:
                            <select
                                value={selectedPeca}
                                onChange={(e) => setSelectedPeca(e.target.value)}
                            >
                                <option key="placeholder" value="">Selecione uma peça</option>
                                {pecasDisponiveis.map((peca) => (
                                    <option key={`peca-${peca.id_peca}`} value={String(peca.id_peca)}>
                                        {peca.nome}
                                    </option>
                                ))}
                            </select>


                        </label>

                        <div className={style.modalButtons}>
                            <button onClick={handleConfirmarAtribuicao}>Atribuir</button>
                            <button onClick={closeAtribuirPecaModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
