import { prisma } from "../client.js";

export const aeronaveRepository = {
  async getAll() {
    try {
      return await prisma.aeronave.findMany();
    } catch (err) {
      console.error("Erro ao buscar todas as Aeronaves:", err);
      throw new Error("Erro ao buscar Aeronaves");
    } 
  },

  async getById(id: number) {
    try {
      return await prisma.aeronave.findUnique({ where: { codigo: id } });
    } catch (err) {
      console.error(`Erro ao buscar Aeronave com id ${id}:`, err);
      throw new Error("Erro ao buscar Aeronave");
    }
  },

  async create(data: any) {
    try {
      return await prisma.aeronave.create({ data });
    } catch (err) {
      console.error("Erro ao criar Aeronave:", err);
      throw new Error("Erro ao criar Aeronave");
    }
  },

  async update(id: number, data: any) {
    try {
      return await prisma.aeronave.update({ where: { codigo: id }, data });
    } catch (err) {
      console.error(`Erro ao atualizar Aeronave com id ${id}:`, err);
      throw new Error("Erro ao atualizar Aeronave");
    }
  },

  async delete(id: number) {
    try {
      return await prisma.aeronave.delete({ where: { codigo: id } });
    } catch (err) {
      console.error(`Erro ao deletar Aeronave com id ${id}:`, err);
      throw new Error("Erro ao deletar Aeronave");
    }
  },

   async getByPecaId(idPeca: number) {
    try {
      return await prisma.aeronave.findMany({
        where: { id_peca: idPeca },
        include: {
          peca: true,
          etapa: true,
          teste: true,
        },
      });
    } catch (err) {
      console.error(`Erro ao buscar Aeronaves com peça id ${idPeca}:`, err);
      throw new Error("Erro ao buscar Aeronaves por peça");
    }
  },
};
