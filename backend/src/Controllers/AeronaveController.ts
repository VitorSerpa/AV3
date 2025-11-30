import { Request, Response } from "express";
import { aeronaveRepository } from "../DAL/Repository/AeronaveRepository.js";

export async function getByPecaId(req: Request, res: Response) {
  const idPeca = Number(req.params.idPeca);

  if (isNaN(idPeca)) {
    return res.status(400).json({ error: "ID da peça inválido" });
  }

  try {
    const aeronaves = await aeronaveRepository.getByPecaId(idPeca);

    if (!aeronaves || aeronaves.length === 0) {
      return res.status(404).json({ message: "Nenhuma aeronave encontrada para essa peça" });
    }

    res.json(aeronaves);
  } catch (err) {
    console.error(`Erro ao buscar aeronaves com peça id ${idPeca}:`, err);
    res.status(500).json({ error: "Erro ao buscar aeronaves" });
  }
}

export async function create(req: Request, res: Response) {
    const funcionario = await aeronaveRepository.create(req.body);
    res.json(funcionario);
}

export async function getAll(req: Request, res: Response) {
    try {
        const aeronave = await aeronaveRepository.getAll();

        if (!aeronave || aeronave.length === 0) {
            return res
                .status(404)
                .json({ message: "Nenhuma aeronave encontrado" });
        }

        res.json(aeronave);
    } catch (err) {
        console.error(`Erro ao buscar aeronave:`, err);
        res.status(500).json({ error: "Erro ao buscar aeronave" });
    }
}
