import { Request, Response } from "express";
import { etapaRepository } from "../DAL/Repository/EtapaRepository.js";
import {funcionarioEtapaRepository} from "../DAL/Repository/FuncionarioEtapaRepository.js"

export async function getAll(req: Request, res: Response) {
    try {
        const etapas = await etapaRepository.getAll();

        if (!etapas || etapas.length === 0) {
            return res
                .status(404)
                .json({ message: "Nenhuma etapa encontrado" });
        }
        res.json(etapas);
    } catch (err) {
        console.error(`Erro ao buscar etapas:`, err);
        res.status(500).json({ error: "Erro ao buscar etapas" });
    }
}

export async function create(req: Request, res: Response) {
    try {
        const etapa = await etapaRepository.create(req.body);
        res.json(etapa);
    } catch (err) {
        console.error(`Erro ao criar etapa:`, err);
        res.status(500).json({ error: "Erro ao criar etapa" });
    }
}

export async function createEtapaFuncionario(req: Request, res: Response) {
    try {
        const etapa = await funcionarioEtapaRepository.create(req.body);
        res.json(etapa);
    } catch (err) {
        console.error(`Erro ao criar etapa:`, err);
        res.status(500).json({ error: "Erro ao criar etapa" });
    }
}

export async function atribuirEtapaAeronave(req: Request, res: Response) {
  const { idEtapa, idAeronave } = req.body;

  if (!idEtapa || !idAeronave) {
    return res.status(400).json({ message: "idEtapa e idAeronave são obrigatórios" });
  }

  try {
    const etapa = await etapaRepository.atribuirEtapaAeronave(Number(idEtapa), Number(idAeronave));
    res.json({ message: "Etapa atribuída à aeronave com sucesso", etapa });
  } catch (err) {
    console.error(`Erro ao atribuir etapa ${idEtapa} à aeronave ${idAeronave}:`, err);
    res.status(500).json({ error: "Erro ao atribuir etapa à aeronave" });
  }
}