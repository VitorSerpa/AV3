-- CreateTable
CREATE TABLE `aeronave` (
    `codigo` INTEGER NOT NULL AUTO_INCREMENT,
    `modelo` VARCHAR(200) NOT NULL,
    `tipoAeronave` ENUM('comercial', 'militar') NULL,
    `capacidade` INTEGER NOT NULL,
    `alcance` INTEGER NOT NULL,

    PRIMARY KEY (`codigo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etapa` (
    `id_etapa` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `prazo` VARCHAR(100) NOT NULL,
    `status_etapa` ENUM('pendente', 'andamento', 'concluida') NULL,
    `id_aeronave` INTEGER NULL,

    INDEX `id_aeronave`(`id_aeronave`),
    PRIMARY KEY (`id_etapa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionario` (
    `id_funcionario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `telefone` VARCHAR(100) NOT NULL,
    `endereco` VARCHAR(100) NOT NULL,
    `usuario` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,
    `nivel_permissao` ENUM('admin', 'engenheiro', 'operador') NULL,

    PRIMARY KEY (`id_funcionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `funcionario_etapa` (
    `id_funcionario` INTEGER NOT NULL,
    `id_etapa` INTEGER NOT NULL,

    INDEX `id_etapa`(`id_etapa`),
    PRIMARY KEY (`id_funcionario`, `id_etapa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peca` (
    `id_peca` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `tipo_peca` ENUM('nacional', 'importada') NOT NULL,
    `fornecedor` VARCHAR(100) NOT NULL,
    `status_peca` ENUM('em_producao', 'em_transporte', 'pronta') NULL,
    `id_aeronave` INTEGER NULL,

    INDEX `id_aeronave`(`id_aeronave`),
    PRIMARY KEY (`id_peca`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teste` (
    `id_teste` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoTeste` ENUM('eletrico', 'hidraulico', 'aerodinamico') NULL,
    `resultado` ENUM('aprovado', 'reprovado') NULL,
    `id_aeronave` INTEGER NULL,

    INDEX `id_aeronave`(`id_aeronave`),
    PRIMARY KEY (`id_teste`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `etapa` ADD CONSTRAINT `etapa_ibfk_1` FOREIGN KEY (`id_aeronave`) REFERENCES `aeronave`(`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `funcionario_etapa` ADD CONSTRAINT `funcionario_etapa_ibfk_1` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionario`(`id_funcionario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `funcionario_etapa` ADD CONSTRAINT `funcionario_etapa_ibfk_2` FOREIGN KEY (`id_etapa`) REFERENCES `etapa`(`id_etapa`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `peca` ADD CONSTRAINT `peca_ibfk_1` FOREIGN KEY (`id_aeronave`) REFERENCES `aeronave`(`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `teste` ADD CONSTRAINT `teste_ibfk_1` FOREIGN KEY (`id_aeronave`) REFERENCES `aeronave`(`codigo`) ON DELETE NO ACTION ON UPDATE NO ACTION;
