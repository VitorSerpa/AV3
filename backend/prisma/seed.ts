import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const boeing = await prisma.aeronave.create({
    data: { modelo: 'Boeing 737', tipoAeronave: 'comercial', capacidade: 189, alcance: 5600 },
  });

  const f16 = await prisma.aeronave.create({
    data: { modelo: 'F-16 Falcon', tipoAeronave: 'militar', capacidade: 1, alcance: 4220 },
  });

  const airbus = await prisma.aeronave.create({
    data: { modelo: 'Airbus A320', tipoAeronave: 'comercial', capacidade: 180, alcance: 6100 },
  });

  const ana = await prisma.funcionario.create({
    data: { nome: 'Administrador', telefone: '11987654321', endereco: 'Rua B', usuario: 'admin', senha: '1234', nivel_permissao: 'admin' },
  });

  const carlos = await prisma.funcionario.create({
    data: { nome: 'Carlos Pereira', telefone: '11999887766', endereco: 'Rua C', usuario: 'CarlosP', senha: 'senha456', nivel_permissao: 'operador' },
  });

  const mariana = await prisma.funcionario.create({
    data: { nome: 'Mariana Souza', telefone: '11988776655', endereco: 'Rua D', usuario: 'MarianaS', senha: 'senha789', nivel_permissao: 'engenheiro' },
  });

  const etapa1 = await prisma.etapa.create({
    data: {
      nome: 'Montagem da fuselagem',
      prazo: '10 dias',
      status_etapa: 'pendente',
      aeronave: { connect: { codigo: boeing.codigo } }, 
    },
  });

  const etapa2 = await prisma.etapa.create({
    data: {
      nome: 'Instalação dos sistemas elétricos',
      prazo: '7 dias',
      status_etapa: 'andamento',
      aeronave: { connect: { codigo: f16.codigo } },
    },
  });

  const etapa3 = await prisma.etapa.create({
    data: {
      nome: 'Teste de aerodinâmica',
      prazo: '5 dias',
      status_etapa: 'concluida',
      aeronave: { connect: { codigo: airbus.codigo } },
    },
  });

  await prisma.funcionario_etapa.create({
    data: { id_funcionario: carlos.id_funcionario, id_etapa: etapa1.id_etapa },
  });

  await prisma.funcionario_etapa.create({
    data: { id_funcionario: mariana.id_funcionario, id_etapa: etapa2.id_etapa },
  });

  await prisma.funcionario_etapa.create({
    data: { id_funcionario: ana.id_funcionario, id_etapa: etapa3.id_etapa },
  });

  await prisma.peca.create({
    data: {
      nome: 'Asa principal',
      tipo_peca: 'importada',
      fornecedor: 'Boeing Supplier',
      status_peca: 'em_producao',
      aeronave: { connect: { codigo: boeing.codigo } },
    },
  });

  await prisma.peca.create({
    data: {
      nome: 'Motor turbofan',
      tipo_peca: 'nacional',
      fornecedor: 'Embraer',
      status_peca: 'em_transporte',
      aeronave: { connect: { codigo: f16.codigo } },
    },
  });

  await prisma.peca.create({
    data: {
      nome: 'Trem de pouso',
      tipo_peca: 'importada',
      fornecedor: 'Airbus Supplier',
      status_peca: 'pronta',
      aeronave: { connect: { codigo: airbus.codigo } },
    },
  });

  await prisma.teste.create({
    data: {
      tipoTeste: 'eletrico',
      resultado: 'aprovado',
      aeronave: { connect: { codigo: boeing.codigo } },
    },
  });

  await prisma.teste.create({
    data: {
      tipoTeste: 'hidraulico',
      resultado: 'reprovado',
      aeronave: { connect: { codigo: f16.codigo } },
    },
  });

  await prisma.teste.create({
    data: {
      tipoTeste: 'aerodinamico',
      resultado: 'aprovado',
      aeronave: { connect: { codigo: airbus.codigo } },
    },
  });

  console.log('Seed finalizada com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
