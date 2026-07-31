CREATE DATABASE ProjetoFinalIefp;
USE DATABASE ProjetoFinalIefp;

CREATE TABLE utilizadores(
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50),
email VARCHAR(50),
password CHAR(50),
);

CREATE TABLE modulos(
id iNT AUTO_INCREMENT PRIMARY KEY,
langs VARCHAR(50), -- linguagens de programação
score INT -- pontuação modulos
);

ALTER TABLE utilizadores ADD modulos INT, ADD FOREIGN KEY(modulos) REFERENCES modulos(id);