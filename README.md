# ✈️ Aerocode - Sistema de Gerenciamento de Aeronaves

Este projeto é um sistema de gerenciamento de etapas na construção de aeronaves, desenvolvido para otimizar o acompanhamento e controle dos processos.

A interface gráfica (GUI) foi desenvolvida utilizando React com o framework Next.js, proporcionando uma navegação fluida, rápida e responsiva.

- [📄 Clique aqui para baixar o relatório em PDF](https://github.com/VitorSerpa/AV3/blob/main/Relatorio.pdf)


## ✅ Pré-requisitos

- Node.js instalado (versão 18 ou superior)
- npm (gerenciador de pacotes, já vem com o Node)
- TypeScript (usado com npx, não precisa instalar globalmente)

---

## ▶️ Como executar o projeto

### 1. Clone o repositório:

```bash
git clone https://github.com/VitorSerpa/AV2.git
```
2️⃣ Configurar o backend
2.1 Entrar na pasta do backend
```bash
cd backend
```

2.2 Instalar dependências
```bash
npm install
```

2.3 Configurar a variável de ambiente
Crie um arquivo .env na pasta backend com a URL do MySQL:

```bash
PORT=PORTA DO BACKEND ex:5000
DATABASE_URL="mysql://usuario:senha@localhost:3306/aerocode"
```
Troque usuario e senha para seu usuário do MySQL.
O banco aerocode será criado pelo Prisma se não existir.

2.4 Gerar Prisma Client
```bash
npx prisma generate
```

2.5 Criar as tabelas (rodar migrations)
```bash
npx prisma migrate deploy
```

2.6 Popular dados iniciais (seed)
```bash
npm run prisma:seed
```

2.7 Rodar o backend
```bash
npm run dev
```

3️⃣ Configurar o frontend
3.1 Entrar na pasta frontend em um outro terminal
```bash
cd frontend-app
```


3.2 Instalar dependências
```bash
npm install
```

3.3 Crie um arquivo .env na pasta backend com a URL que esta sendo usada no Backend ex:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

3.4 Rodar o frontend
npm run dev
```bash
npm run dev
```

3.4 Abra o navegador em localhost:3000






