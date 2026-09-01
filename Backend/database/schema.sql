-- ============================================================
-- CodeQuest - Schema da Base de Dados (MySQL)
-- ============================================================
-- Corrige o project_sql.sql original:
--   - "USE DATABASE x;" -> "USE x;" (sintaxe inválida)
--   - vírgula a mais antes do ')' na tabela utilizadores
--   - adiciona tabelas em falta para quizzes, XP, níveis,
--     progresso, conquistas e ranking (conforme o README técnico)
-- ============================================================

CREATE DATABASE IF NOT EXISTS ProjetoFinalIefp
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE ProjetoFinalIefp;

-- ------------------------------------------------------------
-- Utilizadores
-- ------------------------------------------------------------
CREATE TABLE utilizadores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash CHAR(60) NOT NULL,           -- hash bcrypt
  avatar_url VARCHAR(255) DEFAULT NULL,
  xp INT NOT NULL DEFAULT 0,
  nivel INT NOT NULL DEFAULT 1,
  streak_atual INT NOT NULL DEFAULT 0,
  streak_maximo INT NOT NULL DEFAULT 0,
  ultimo_login DATE DEFAULT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Módulos de estudo (Introdução, Variáveis, Loops, ...)
-- ------------------------------------------------------------
CREATE TABLE modulos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  descricao TEXT,
  linguagem VARCHAR(50) DEFAULT NULL,        -- ex: "JavaScript"
  ordem INT NOT NULL DEFAULT 0,               -- ordem de apresentação
  conteudo LONGTEXT,                          -- texto/markdown do módulo
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- Progresso do utilizador em cada módulo
-- ------------------------------------------------------------
CREATE TABLE progresso_modulos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilizador_id INT NOT NULL,
  modulo_id INT NOT NULL,
  estudado BOOLEAN NOT NULL DEFAULT FALSE,
  concluido BOOLEAN NOT NULL DEFAULT FALSE,
  data_conclusao DATETIME DEFAULT NULL,
  UNIQUE KEY uk_utilizador_modulo (utilizador_id, modulo_id),
  FOREIGN KEY (utilizador_id) REFERENCES utilizadores(id) ON DELETE CASCADE,
  FOREIGN KEY (modulo_id) REFERENCES modulos(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Quizzes (um por módulo, tipicamente)
-- ------------------------------------------------------------
CREATE TABLE quizzes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  modulo_id INT NOT NULL,
  titulo VARCHAR(100) NOT NULL,
  FOREIGN KEY (modulo_id) REFERENCES modulos(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Perguntas de um quiz
-- ------------------------------------------------------------
CREATE TABLE perguntas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  quiz_id INT NOT NULL,
  enunciado TEXT NOT NULL,
  explicacao TEXT,
  ordem INT NOT NULL DEFAULT 0,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Alternativas de resposta de cada pergunta
-- ------------------------------------------------------------
CREATE TABLE alternativas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pergunta_id INT NOT NULL,
  texto VARCHAR(255) NOT NULL,
  correta BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (pergunta_id) REFERENCES perguntas(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Tentativas de quiz (uma linha por cada vez que o quiz é feito)
-- ------------------------------------------------------------
CREATE TABLE tentativas_quiz (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilizador_id INT NOT NULL,
  quiz_id INT NOT NULL,
  nota DECIMAL(5,2) NOT NULL,          -- percentagem 0-100
  acertos INT NOT NULL,
  erros INT NOT NULL,
  tempo_gasto_segundos INT DEFAULT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (utilizador_id) REFERENCES utilizadores(id) ON DELETE CASCADE,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Resposta dada pelo utilizador a cada pergunta, numa tentativa
-- ------------------------------------------------------------
CREATE TABLE respostas_tentativa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tentativa_id INT NOT NULL,
  pergunta_id INT NOT NULL,
  alternativa_id INT NOT NULL,
  correta BOOLEAN NOT NULL,
  FOREIGN KEY (tentativa_id) REFERENCES tentativas_quiz(id) ON DELETE CASCADE,
  FOREIGN KEY (pergunta_id) REFERENCES perguntas(id) ON DELETE CASCADE,
  FOREIGN KEY (alternativa_id) REFERENCES alternativas(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Conquistas (achievements) disponíveis no sistema
-- ------------------------------------------------------------
-- criterio_tipo define a regra usada pelo backend para desbloquear:
--   PRIMEIRO_LOGIN, PRIMEIRO_QUIZ, N_QUIZZES, N_QUESTOES,
--   STREAK_DIAS, MODULO_PERFEITO
-- criterio_valor guarda o número/alvo associado à regra
--   (ex: N_QUIZZES=10, STREAK_DIAS=7, MODULO_PERFEITO=<modulo_id>)
CREATE TABLE conquistas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255),
  icone VARCHAR(100) DEFAULT NULL,
  criterio_tipo VARCHAR(50) NOT NULL,
  criterio_valor INT DEFAULT NULL
);

-- ------------------------------------------------------------
-- Conquistas desbloqueadas por cada utilizador
-- ------------------------------------------------------------
CREATE TABLE utilizador_conquistas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilizador_id INT NOT NULL,
  conquista_id INT NOT NULL,
  desbloqueada_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uk_utilizador_conquista (utilizador_id, conquista_id),
  FOREIGN KEY (utilizador_id) REFERENCES utilizadores(id) ON DELETE CASCADE,
  FOREIGN KEY (conquista_id) REFERENCES conquistas(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Histórico de XP ganho (auditoria + suporte a estatísticas)
-- ------------------------------------------------------------
CREATE TABLE historico_xp (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilizador_id INT NOT NULL,
  acao VARCHAR(50) NOT NULL,          -- ex: LOGIN_DIARIO, ESTUDAR_MODULO...
  xp_ganho INT NOT NULL,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (utilizador_id) REFERENCES utilizadores(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Tokens de recuperação de password (RF05)
-- ------------------------------------------------------------
CREATE TABLE password_resets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilizador_id INT NOT NULL,
  token CHAR(64) NOT NULL UNIQUE,
  expira_em DATETIME NOT NULL,
  usado BOOLEAN NOT NULL DEFAULT FALSE,
  criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (utilizador_id) REFERENCES utilizadores(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Índices úteis
-- ------------------------------------------------------------
CREATE INDEX idx_ranking_xp ON utilizadores (xp DESC);
CREATE INDEX idx_tentativas_utilizador ON tentativas_quiz (utilizador_id);
CREATE INDEX idx_progresso_utilizador ON progresso_modulos (utilizador_id);
