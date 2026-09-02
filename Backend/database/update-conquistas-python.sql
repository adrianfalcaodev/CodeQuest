-- ------------------------------------------------------------
-- Migração: renomeia as conquistas "Mestre" existentes (JavaScript)
-- e acrescenta as conquistas equivalentes para Python.
--
-- Podes correr este ficheiro diretamente numa base de dados já
-- em uso (é seguro repetir: usa ON DUPLICATE KEY UPDATE).
--
-- Exemplo:
--   mysql -u root -p ProjetoFinalIefp < database/update-conquistas-python.sql
-- ------------------------------------------------------------

-- Renomeia as duas conquistas "Mestre" já existentes para deixar
-- claro que são da trilha de JavaScript.
UPDATE `conquistas`
SET `nome` = 'Mestre das Variáveis - JavaScript',
    `descricao` = 'Nota máxima no quiz de Variáveis (JavaScript).'
WHERE `id` = 7;

UPDATE `conquistas`
SET `nome` = 'Mestre das Funções - JavaScript',
    `descricao` = 'Nota máxima no quiz de Funções (JavaScript).'
WHERE `id` = 8;

-- Acrescenta as duas novas conquistas equivalentes para Python.
-- criterio_valor = id do módulo "Variáveis em Python" (12) e
-- "Funções em Python" (17) — confirma estes ids na tua BD com:
--   SELECT id, titulo FROM modulos WHERE linguagem = 'Python';
INSERT INTO `conquistas` (`id`, `nome`, `descricao`, `icone`, `criterio_tipo`, `criterio_valor`)
VALUES
  (9, 'Mestre das Variáveis - Python', 'Nota máxima no quiz de Variáveis em Python.', 'star', 'MODULO_PERFEITO', 12),
  (10, 'Mestre das Funções - Python', 'Nota máxima no quiz de Funções em Python.', 'star', 'MODULO_PERFEITO', 17)
ON DUPLICATE KEY UPDATE
  `nome` = VALUES(`nome`),
  `descricao` = VALUES(`descricao`),
  `icone` = VALUES(`icone`),
  `criterio_tipo` = VALUES(`criterio_tipo`),
  `criterio_valor` = VALUES(`criterio_valor`);
