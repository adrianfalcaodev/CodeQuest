
Obrigado por fazer download do CodeQuest, uma aplicação Web criada por Ádrian Falcão, Ana Novo e Diogo Pinto, no âmbito do curso TETPSI - Técnico Especialista em Tecnologias e Programação de Sistemas de Informação - 25.0373. 
CodeQuest tem o objetivo de introduzir aos seus utilizadores uma forma interativa de aprender os básicos da Programação.

Tutorial de Instalação/Inicialização da aplicação:

1º - Requisitos (só foi testado no Microsoft Windows):
        -Visual Studio Code;
        -MySQL Workbench e MySQL Community Server configurados por si (não terá tutorial de configuração inicial);
        -Know-how mínimo de utilização das ferramentas (ajuda, mas o tutorial vai ser o mais detalhado possível);

2º - Passo a passo:
        -Depois de transferida e extraída do .zip;
        -Abra o MySQL Workbench e uma QueryTab para iniciar;
        -No menu superior do Workbench abra o script "schema.sql" que está na pasta "CodeQuest\Backend\database" ("File -> Open Sql script" e navegue até à pasta) e execute o script (botão de relâmpago na QueryTab);
        -Faça o mesmo, mas desta vez abra o script "seed.sql" que está na mesma pasta;
        -Abra a pasta "CodeQuest" numa janela do Visual Studio Code ("File -> Open Folder");
        -No menu do canto superior esquerdo do Visual Studio Code abra um novo terminal ("Terminal -> New Terminal");
        -No novo terminal que estará por predefinição na zona de baixo da janela certifique-se de que está no caminho certo da pasta ("PS C:\...\CodeQuest>") e execute o comando "cd .\Backend\";
        -De seguida copie o conteúdo do ficheiro ".env.example" para um novo ficheiro chamado ".env". Sugestão: Use o comando "cp .env.example .env";
        -Abra o novo ficheiro ".env" e edite as informações de acordo com as suas configurações da base de dados (host, port, username, password) e atribua também um JWT_SECRET complexo e seguro;
        -De volta ao terminal, execute o comando "npm i" ou "npm.cmd i" caso tenha restrições de acesso ao CMD no seu computador;
        -Execute o comando "npm run dev" ou "npm.cmd run dev" para conectar à base de dados e verifique a presença das seguintes mensagens no terminal:
                [db] Ligação ao MySQL estabelecida com sucesso.
                [server] CodeQuest API a correr em http://localhost:3001
        -Abra um novo terminal (no símbolo do "+" da janela do terminal ou no menu superior Terminal -> New Terminal) e execute o comando "cd .\Frontend\"
        -À semelhança do Backend execute os comandos "npm i"/"npm.cmd i" e "npm run dev"/"npm.cmd run dev";
        -Irá aparecer um link (azul), carregue Ctrl+LMB (Botão Esquerdo do Rato) para abrir o link no navegador e a app estará funcional!

__________________________________________________________________________________________________________________________

Estrutura do projeto - Organização dos ficheiros


        CodeQuest/
        ├── Backend/                      # API REST (Node.js + Express + MySQL)
        │   ├── database/
        │   │   ├── schema.sql             # Definição das tabelas
        │   │   ├── seed.sql                # Dados iniciais (utilizadores, módulos JS, conquistas...)
        │   │   ├── seed-content.js         # Script para popular módulos/quizzes JavaScript
        │   │   ├── seed-content-python.js  # Script para popular módulos/quizzes Python (idempotente)
        │   │   ├── update-conquistas-python.sql
        │   │   └── README.md
        │   └── src/
        │       ├── config/
        │       │   └── db.js               # Ligação ao MySQL (pool)
        │       ├── controllers/            # Lógica de cada recurso da API
        │       │   ├── auth.controller.js       # Registo, login, recuperação de password
        │       │   ├── achievements.controller.js
        │       │   ├── modules.controller.js
        │       │   ├── quizzes.controller.js
        │       │   ├── ranking.controller.js
        │       │   └── users.controller.js      # Perfil, avatar, estatísticas
        │       ├── middleware/
        │       │   ├── auth.js             # Verificação do JWT
        │       │   ├── errorHandler.js     # Tratamento centralizado de erros
        │       │   └── upload.js           # Multer (upload de avatar)
        │       ├── routes/                 # Definição dos endpoints por recurso
        │       ├── services/
        │       │   └── email.js            # Envio de emails (recuperação de password)
        │       ├── utils/
        │       │   ├── gamification.js     # XP, níveis, streaks e conquistas
        │       │   └── jwt.js
        │       ├── app.js                  # Configuração do Express (middlewares, rotas)
        │       └── server.js               # Ponto de entrada / arranque do servidor
        │
        ├── Frontend/                     # SPA (React + Vite)
        │   └── src/
        │       ├── components/            # Componentes reutilizáveis
        │       │   ├── Navbar.jsx
        │       │   ├── LumenMascot.jsx     # Mascote flutuante
        │       │   ├── XpBar.jsx
        │       │   ├── NotificationHost.jsx # Toasts de XP/conquistas
        │       │   ├── ProtectedRoute.jsx  # Guard de rotas autenticadas
        │       │   ├── LoadingSpinner.jsx / EmptyState.jsx
        │       │   └── button.jsx / card.jsx
        │       ├── context/
        │       │   ├── AuthContext.jsx     # Sessão, token, utilizador autenticado
        │       │   └── NotificationContext.jsx
        │       ├── data/
        │       │   ├── api.js              # Todas as chamadas à API backend
        │       │   └── auth.js             # Helpers de storage local
        │       ├── images/                 # Assets (mascote, favicon, etc.)
        │       ├── pages/                  # Uma página por rota
        │       │   ├── LandingPage.jsx
        │       │   ├── LoginPage.jsx / ResgistoPage.jsx
        │       │   ├── EsqueceuPassPage.jsx / ResetPassPage.jsx
        │       │   ├── HomePage.jsx
        │       │   ├── LinguagemPage.jsx   # Lista de módulos de uma linguagem
        │       │   ├── ModuloPage.jsx / ContentPage.jsx
        │       │   ├── QuizPage.jsx
        │       │   ├── ConquistasPage.jsx
        │       │   ├── RankingPage.jsx
        │       │   ├── PerfilPage.jsx
        │       │   └── ErrorPage.jsx
        │       ├── style/                  # CSS por área (um ficheiro por contexto)
        │       ├── App.jsx                 # Definição de rotas (react-router)
        │       ├── main.jsx                # Ponto de entrada da aplicação
        │       └── theme.css               # Estilos globais/tema (navbar, cores, etc.)
        │
        └── README.md
