DOCUMENTO TÉCNICO
CodeQuest – Plataforma Web Gamificada para Ensino de Programação
Versão: 1.0
Data: 09/07/2026
________________________________________
1. Visão Geral
1.1 Objetivo
O projeto consiste no desenvolvimento de uma plataforma web gamificada destinada ao ensino dos fundamentos da programação para iniciantes.
A aplicação utilizará elementos de gamificação para aumentar o engajamento dos utilizadores, incentivando o estudo através de pontos, níveis, conquistas e desafios.
Após estudar determinado conteúdo, o utilizador poderá realizar quizzes para testar seus conhecimentos, recebendo feedback imediato sobre seu desempenho.
________________________________________
2. Objetivos do Sistema
O sistema deverá permitir que o utilizador:
•	Criar uma conta.
•	Fazer login.
•	Recuperar senha.
•	Editar seu perfil.
•	Acompanhar seu progresso.
•	Estudar conteúdos organizados por módulos.
•	Responder quizzes.
•	Ganhar experiência (XP). Visualizar a posição no ranking de pontuação.
•	Evoluir de nível. Passar de Modulo.
•	Desbloquear conquistas. Desbloquear artigos de utilizador.
•	Consultar estatísticas pessoais. Desempenho do utilizador nos modulos
________________________________________
3. Tecnologias Utilizadas
Front-end
•	React
•	JavaScript
•	HTML5
•	CSS3
•	React Router
________________________________________
Back-end
•	Node.js
•	Express.js
________________________________________
Banco de Dados
•	MySQL
________________________________________
Ferramentas
•	Git
•	GitHub
•	Visual Studio Code
•	Postman
________________________________________
4. Arquitetura
O sistema seguirá a arquitetura cliente-servidor.
Frontend (React)
        ↓
API REST (Node + Express)
        ↓
Banco de Dados (MySQL)
________________________________________
5. Funcionalidades
5.1 Cadastro
O utilizador poderá:
•	criar conta;
•	informar nome;
•	email;
•	senha.
O sistema validará:
•	e-mail único;
•	senha mínima.
________________________________________
5.2 Login
O sistema deverá autenticar o utilizador utilizando:
•	Email
•	Senha
________________________________________
5.3 Perfil
O utilizador poderá visualizar:
•	Nome
•	Foto
•	XP
•	Nível
•	Quantidade de módulos concluídos
•	Acertos
•	Erros
•	Sequência diária (streak)
________________________________________
5.4 Dashboard
Ao entrar no sistema o utilizador verá:
•	progresso geral;
•	último módulo estudado;
•	nível atual;
•	XP;
•	desafios disponíveis;
•	ranking.
________________________________________
5.5 Módulos de Estudo
Os conteúdos serão separados em módulos.
Exemplo:
Módulo 1
Introdução à Programação
________________________________________
Módulo 2
Variáveis
________________________________________
Módulo 3
Tipos de Dados
________________________________________
Módulo 4
Operadores
________________________________________
Módulo 5
Estruturas Condicionais
________________________________________
Módulo 6
Loops
________________________________________
Módulo 7
Funções
________________________________________
Módulo 8
Arrays
________________________________________
Módulo 9
Objetos
________________________________________
Módulo 10
Manipulação do DOM
________________________________________
Cada módulo possuirá:
•	texto;
•	imagens;
•	exemplos;
•	blocos de código;
•	exercícios.
________________________________________
6. Sistema de Quizzes
Após concluir um módulo o utilizador poderá realizar um quiz.
Cada quiz possuirá:
•	perguntas;
•	alternativas;
•	resposta correta;
•	explicação.
Ao finalizar:
•	nota;
•	quantidade de acertos;
•	erros;
•	tempo gasto.
________________________________________
7. Sistema de Gamificação
XP
Cada ação concederá experiência.
Exemplo
Ação	XP
Login diário	10
Estudar módulo	40
Concluir módulo	100
Acertar questão	20
Completar quiz	80
________________________________________
Níveis
O utilizador evoluirá conforme acumular XP.
Exemplo
Nível 1
0 XP
Nível 2
200 XP
Nível 3
500 XP
Nível 4
900 XP
Nível 5
1400 XP
...
________________________________________
Conquistas
Exemplos:
Primeiro Login
Primeiro Quiz
10 Quizzes
100 Questões Respondidas
7 Dias Consecutivos
50 Dias Consecutivos
Mestre das Variáveis
Mestre das Funções
________________________________________
Ranking
Ranking global contendo:
•	Nome
•	Foto
•	XP
•	Nível
________________________________________
8. Requisitos Funcionais
RF01 – Cadastrar utilizador.
RF02 – Realizar login.
RF03 – Encerrar sessão.
RF04 – Editar perfil.
RF05 – Recuperar senha.
RF06 – Visualizar módulos.
RF07 – Estudar conteúdo.
RF08 – Registrar progresso.
RF09 – Realizar quizzes.
RF10 – Corrigir automaticamente.
RF11 – Visualizar XP.
RF12 – Evoluir nível.
RF13 – Liberar conquistas.
RF14 – Visualizar ranking.
RF15 – Exibir estatísticas.
________________________________________
9. Requisitos Não Funcionais
RNF01
Interface responsiva.
________________________________________
RNF02
Senhas armazenadas utilizando hash.
________________________________________
RNF03
API REST.
________________________________________
RNF04
Banco relacional MySQL.
________________________________________
RNF05
Código organizado em componentes reutilizáveis.
________________________________________
10. Fluxo do Sistema
Cadastro
↓
Login
↓
Dashboard
↓
Escolher módulo
↓
Estudar conteúdo
↓
Responder Quiz
↓
Receber Correção
↓
Ganhar XP
↓
Subir de Nível
↓
Desbloquear Conquistas
↓
Ranking________________________________________
11. Conclusão
O CodeQuest propõe uma abordagem moderna para o ensino de programação ao combinar conteúdos estruturados, avaliações contínuas e mecânicas de gamificação. A arquitetura baseada em React, Node.js, Express e MySQL oferece uma solução escalável, modular e de fácil manutenção, permitindo futuras expansões da plataforma, como desafios práticos, integração com repositórios de código e recursos de inteligência artificial para personalização do aprendizado.
