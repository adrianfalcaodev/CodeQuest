-- ============================================================
-- CodeQuest - Dados de seed (conteúdo completo dos 10 módulos
-- + quizzes com 5 perguntas cada + conquistas)
-- Gerado a partir de uma BD de teste validada ponta-a-ponta.
-- Corre depois do schema.sql.
-- ============================================================
USE ProjetoFinalIefp;
SET NAMES utf8mb4;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `modulos`
--

LOCK TABLES `modulos` WRITE;
/*!40000 ALTER TABLE `modulos` DISABLE KEYS */;
INSERT INTO `modulos` (`id`, `titulo`, `descricao`, `linguagem`, `ordem`, `conteudo`, `criado_em`) VALUES (1,'Introdução à Programação','O que é programar e como um computador executa código.','JavaScript',1,'# Introdução à Programação\n\nProgramar é o ato de escrever instruções que um computador consegue executar, passo a passo, para resolver um problema ou realizar uma tarefa. Um computador não \"pensa\" — ele segue exatamente aquilo que lhe é pedido, na ordem em que é pedido. Por isso, a primeira competência de qualquer programador não é saber uma linguagem específica, mas sim saber decompor um problema em passos simples e sem ambiguidade.\n\n## O que é um algoritmo?\n\nUm **algoritmo** é uma sequência finita e bem definida de passos para resolver um problema. Antes de escrever código, é boa prática pensar no algoritmo em português (ou em pseudocódigo):\n\n```\n1. Perguntar ao utilizador o seu nome\n2. Guardar o nome numa variável\n3. Mostrar \"Olá, \" seguido do nome\n```\n\n## O teu primeiro programa\n\nNeste curso vamos usar **JavaScript**, uma das linguagens mais usadas no mundo, tanto no browser como no servidor. O programa mais simples que podes escrever é mostrar uma mensagem:\n\n```js\nconsole.log(\"Olá, CodeQuest!\");\n```\n\nA função `console.log()` escreve texto na consola — é a ferramenta que vais usar constantemente para veres o que o teu código está a fazer.\n\n## Comentários\n\nComentários são texto que o computador ignora, mas que ajudam quem lê o código a perceber o que ele faz:\n\n```js\n// Isto é um comentário de uma linha\nconsole.log(\"Isto é executado\"); // isto também é um comentário\n\n/* \n  Isto é um comentário\n  de várias linhas\n*/\n```\n\n## Porque é que os erros acontecem\n\nVais cometer erros — todos os programadores cometem, todos os dias. Um erro de sintaxe (ex: esquecer um ponto e vírgula ou uma aspa) impede o programa de correr. Um erro de lógica (o programa corre, mas faz a coisa errada) é mais difícil de encontrar, e é aí que a prática de \"pensar em algoritmos\" mais ajuda.\n\n## Exercício proposto\n\nEscreve um programa em JavaScript que mostre na consola, em três linhas separadas, o teu nome, a tua idade e a linguagem de programação que estás a aprender. Usa pelo menos um comentário a explicar o que o código faz.','2026-08-31 02:35:54'),
(2,'Variáveis','Como guardar e manipular dados.','JavaScript',2,'# Variáveis\n\nUma **variável** é um espaço na memória do computador com um nome, onde guardamos um valor para usar mais tarde. Pensa numa variável como uma caixa etiquetada: dás-lhe um nome, pões lá dentro alguma coisa, e depois podes ir buscar ou substituir o que está dentro.\n\n## Declarar variáveis\n\nEm JavaScript há três formas de declarar uma variável:\n\n```js\nlet idade = 25;        // pode ser reatribuída\nconst nome = \"Ana\";    // não pode ser reatribuída\nvar cidade = \"Aveiro\";  // forma antiga, evita usar\n```\n\n- Usa **`const`** por omissão, sempre que o valor não vai mudar.\n- Usa **`let`** quando sabes que o valor vai ser alterado ao longo do programa.\n- Evita **`var`** — é a forma mais antiga da linguagem e tem comportamentos que causam bugs difíceis de encontrar.\n\n## Reatribuir vs redeclarar\n\n```js\nlet pontos = 0;\npontos = 10;       // válido: let permite reatribuir\npontos = pontos + 5; // agora pontos vale 15\n\nconst maximo = 100;\nmaximo = 200;       // ERRO! const não pode ser reatribuída\n```\n\n## Regras para nomes de variáveis\n\n- Não podem começar por um número (`1nome` é inválido, `nome1` é válido).\n- Não podem ter espaços nem hífens (usa `camelCase`: `nomeCompleto`).\n- São sensíveis a maiúsculas/minúsculas: `idade` e `Idade` são variáveis diferentes.\n- Dá nomes descritivos: `x` diz pouco, `pontuacaoJogador` diz tudo.\n\n## Boas práticas\n\n```js\n// Mau: pouco claro\nlet x = 30;\n\n// Bom: claro e descritivo\nconst idadeMinima = 18;\n```\n\n## Exercício proposto\n\nCria três variáveis: uma `const` com o teu nome, uma `let` com a tua pontuação atual num jogo (começa em 0) e outra `let` que representa o número de vidas (começa em 3). Depois, simula perder uma vida e ganhar 50 pontos, atualizando as variáveis, e mostra o resultado final com `console.log`.','2026-08-31 02:35:54'),
(3,'Tipos de Dados','Números, strings, booleanos e outros tipos.','JavaScript',3,'# Tipos de Dados\n\nTodo o valor em JavaScript tem um **tipo**, que determina que operações podemos fazer com ele. Os tipos primitivos mais usados são:\n\n## Number (números)\n\n```js\nconst inteiro = 42;\nconst decimal = 3.14;\nconst negativo = -7;\n```\n\nAo contrário de outras linguagens, JavaScript não distingue \"inteiro\" de \"decimal\" — é tudo `number`.\n\n## String (texto)\n\n```js\nconst nome = \"Diogo\";\nconst saudacao = \'Olá!\';\nconst mensagem = `Olá, ${nome}!`; // template string: insere variáveis com ${}\n```\n\nAs três formas de aspas (`\"`, `\'`, ``` ` ```) funcionam para texto, mas só as crases (` ` `) permitem inserir variáveis diretamente com `${}`.\n\n## Boolean (verdadeiro/falso)\n\n```js\nconst estaLogado = true;\nconst temErros = false;\n```\n\nUsados sobretudo em condições (módulo seguinte).\n\n## Undefined e null\n\n```js\nlet pontuacao;          // undefined: existe, mas ainda não tem valor\nlet resultado = null;   // null: intencionalmente vazio/sem valor\n```\n\n## Verificar o tipo de um valor\n\n```js\nconsole.log(typeof 42);         // \"number\"\nconsole.log(typeof \"Ana\");      // \"string\"\nconsole.log(typeof true);       // \"boolean\"\nconsole.log(typeof undefined);  // \"undefined\"\n```\n\n## Conversão entre tipos\n\nÉ comum precisar de converter texto em número, ou vice-versa:\n\n```js\nconst textoIdade = \"25\";\nconst idade = Number(textoIdade);   // 25 (number)\nconst texto = String(idade);         // \"25\" (string)\n\nconsole.log(\"5\" + 3);   // \"53\" (concatena, porque \"5\" é string)\nconsole.log(Number(\"5\") + 3); // 8 (soma, porque converteu para número)\n```\n\n## Exercício proposto\n\nCria uma variável `string` com o valor `\"10\"` e uma variável `number` com o valor `5`. Mostra o que acontece quando as somas com `+` sem converter, e depois converte a string para número com `Number()` e soma outra vez, comparando os dois resultados.','2026-08-31 02:35:54'),
(4,'Operadores','Operadores aritméticos, de comparação e lógicos.','JavaScript',4,'# Operadores\n\nOperadores são símbolos que realizam operações sobre valores e variáveis.\n\n## Operadores aritméticos\n\n```js\nconsole.log(10 + 3);  // 13 (soma)\nconsole.log(10 - 3);  // 7  (subtração)\nconsole.log(10 * 3);  // 30 (multiplicação)\nconsole.log(10 / 3);  // 3.333... (divisão)\nconsole.log(10 % 3);  // 1  (resto da divisão, \"módulo\")\nconsole.log(10 ** 2); // 100 (potência)\n```\n\nO operador `%` (módulo) é muito usado para saber se um número é par: `numero % 2 === 0`.\n\n## Operadores de atribuição\n\n```js\nlet pontos = 10;\npontos += 5;   // equivale a: pontos = pontos + 5  -> 15\npontos -= 2;   // pontos = pontos - 2 -> 13\npontos *= 2;   // pontos = pontos * 2 -> 26\n```\n\n## Operadores de comparação\n\n```js\nconsole.log(5 == \"5\");   // true  (compara só o valor, converte tipos)\nconsole.log(5 === \"5\");  // false (compara valor E tipo)\nconsole.log(5 !== \"5\");  // true\nconsole.log(10 > 5);     // true\nconsole.log(10 <= 10);   // true\n```\n\n**Usa sempre `===` e `!==`** em vez de `==` e `!=` — evitam conversões de tipo inesperadas que são fonte comum de bugs.\n\n## Operadores lógicos\n\n```js\nconst temConta = true;\nconst temSaldo = false;\n\nconsole.log(temConta && temSaldo); // false (E: as duas têm de ser true)\nconsole.log(temConta || temSaldo); // true  (OU: basta uma ser true)\nconsole.log(!temConta);            // false (NÃO: inverte o valor)\n```\n\n## Exercício proposto\n\nEscreve código que declare um número qualquer numa variável e use o operador `%` para mostrar na consola se esse número é par ou ímpar (por agora, podes só mostrar o resultado da comparação com `console.log`; as estruturas condicionais para decidir automaticamente vêm no próximo módulo).','2026-08-31 02:35:54'),
(5,'Estruturas Condicionais','if, else e switch.','JavaScript',5,'# Estruturas Condicionais\n\nAs estruturas condicionais permitem que o programa tome decisões: executar um bloco de código apenas se uma condição for verdadeira.\n\n## if / else\n\n```js\nconst idade = 16;\n\nif (idade >= 18) {\n  console.log(\"És maior de idade.\");\n} else {\n  console.log(\"És menor de idade.\");\n}\n```\n\n## else if — várias condições\n\n```js\nconst nota = 14;\n\nif (nota >= 18) {\n  console.log(\"Excelente\");\n} else if (nota >= 14) {\n  console.log(\"Bom\");\n} else if (nota >= 10) {\n  console.log(\"Suficiente\");\n} else {\n  console.log(\"Reprovado\");\n}\n```\n\nAs condições são verificadas por ordem, de cima para baixo, e só o primeiro bloco cuja condição é verdadeira é executado.\n\n## Condições combinadas\n\n```js\nconst idade = 20;\nconst temCarta = true;\n\nif (idade >= 18 && temCarta) {\n  console.log(\"Pode conduzir.\");\n}\n```\n\n## switch — alternativa para muitos casos\n\nQuando comparas a mesma variável com vários valores possíveis, `switch` pode ser mais legível que muitos `else if`:\n\n```js\nconst diaSemana = 3;\n\nswitch (diaSemana) {\n  case 1:\n    console.log(\"Segunda-feira\");\n    break;\n  case 2:\n    console.log(\"Terça-feira\");\n    break;\n  case 3:\n    console.log(\"Quarta-feira\");\n    break;\n  default:\n    console.log(\"Outro dia\");\n}\n```\n\nO `break` é essencial — sem ele, o código \"cai\" para o caso seguinte mesmo que já tenha encontrado o correto.\n\n## Exercício proposto\n\nEscreve um programa que declare uma variável `nota` (0 a 20) e use `if/else if/else` para mostrar \"Aprovado\" se a nota for maior ou igual a 10, e \"Reprovado\" caso contrário. Testa o teu código com pelo menos três valores diferentes de nota.','2026-08-31 02:35:54'),
(6,'Loops','for, while e do...while.','JavaScript',6,'# Loops (Ciclos)\n\nLoops permitem repetir um bloco de código várias vezes, sem teres de o escrever repetidamente.\n\n## for — quando sabes quantas vezes repetir\n\n```js\nfor (let i = 0; i < 5; i++) {\n  console.log(\"Iteração número \" + i);\n}\n// Mostra: 0, 1, 2, 3, 4\n```\n\nO `for` tem três partes: inicialização (`let i = 0`), condição (`i < 5`) e incremento (`i++`). O ciclo repete enquanto a condição for verdadeira.\n\n## while — quando não sabes à partida quantas vezes\n\n```js\nlet tentativas = 0;\n\nwhile (tentativas < 3) {\n  console.log(\"Tentativa \" + tentativas);\n  tentativas++;\n}\n```\n\n**Cuidado com loops infinitos**: se te esqueceres de atualizar a condição (`tentativas++`), o ciclo nunca para.\n\n## do...while — executa pelo menos uma vez\n\n```js\nlet numero;\ndo {\n  numero = Math.floor(Math.random() * 10);\n  console.log(\"Número gerado:\", numero);\n} while (numero !== 7);\n```\n\nAo contrário do `while`, o `do...while` verifica a condição **depois** de executar o bloco — por isso corre sempre pelo menos uma vez.\n\n## Percorrer um array com for\n\n```js\nconst nomes = [\"Ana\", \"Bruno\", \"Carla\"];\n\nfor (let i = 0; i < nomes.length; i++) {\n  console.log(nomes[i]);\n}\n```\n\n## break e continue\n\n```js\nfor (let i = 0; i < 10; i++) {\n  if (i === 5) break;      // sai do ciclo imediatamente\n  if (i % 2 === 0) continue; // salta para a próxima iteração\n  console.log(i); // mostra só 1 e 3\n}\n```\n\n## Exercício proposto\n\nUsa um ciclo `for` para mostrar na consola todos os números de 1 a 20, mas usa `continue` para saltar os múltiplos de 3.','2026-08-31 02:35:54'),
(7,'Funções','Como criar e reutilizar blocos de código.','JavaScript',7,'# Funções\n\nUma função é um bloco de código reutilizável que podemos \"chamar\" (executar) sempre que precisarmos, evitando repetir o mesmo código várias vezes.\n\n## Declarar e chamar uma função\n\n```js\nfunction saudar(nome) {\n  console.log(\"Olá, \" + nome + \"!\");\n}\n\nsaudar(\"Marta\"); // \"Olá, Marta!\"\nsaudar(\"Rui\");   // \"Olá, Rui!\"\n```\n\n`nome` é um **parâmetro** — um valor que a função recebe quando é chamada. Quando chamamos `saudar(\"Marta\")`, `\"Marta\"` é o **argumento**.\n\n## Funções que devolvem valores\n\n```js\nfunction somar(a, b) {\n  return a + b;\n}\n\nconst resultado = somar(3, 4); // resultado vale 7\nconsole.log(resultado);\n```\n\nO `return` termina a função e \"devolve\" um valor para quem a chamou. Sem `return`, a função devolve `undefined`.\n\n## Parâmetros com valor por omissão\n\n```js\nfunction saudar(nome = \"visitante\") {\n  console.log(\"Olá, \" + nome);\n}\n\nsaudar();        // \"Olá, visitante\"\nsaudar(\"Ana\");   // \"Olá, Ana\"\n```\n\n## Arrow functions\n\nUma forma mais curta de escrever funções, muito comum em JavaScript moderno:\n\n```js\nconst somar = (a, b) => a + b;\nconst dobro = (n) => n * 2;\n\nconsole.log(somar(2, 3)); // 5\nconsole.log(dobro(4));    // 8\n```\n\n## Porque usar funções\n\n- Evitam repetição de código (princípio \"DRY\" — Don\'t Repeat Yourself).\n- Tornam o código mais fácil de ler: um nome de função bem escolhido explica o que o bloco faz.\n- Facilitam testar e corrigir erros, porque a lógica está isolada num só sítio.\n\n## Exercício proposto\n\nEscreve uma função `calcularMedia(nota1, nota2, nota3)` que devolva a média das três notas. Chama a função com valores diferentes e mostra o resultado com `console.log`.','2026-08-31 02:35:54'),
(8,'Arrays','Listas ordenadas de valores.','JavaScript',8,'# Arrays\n\nUm array é uma lista ordenada de valores, guardados numa única variável.\n\n## Criar e aceder a um array\n\n```js\nconst frutas = [\"maçã\", \"banana\", \"pera\"];\n\nconsole.log(frutas[0]); // \"maçã\"  (o primeiro índice é sempre 0)\nconsole.log(frutas[2]); // \"pera\"\nconsole.log(frutas.length); // 3 (número de elementos)\n```\n\n## Adicionar e remover elementos\n\n```js\nconst numeros = [1, 2, 3];\n\nnumeros.push(4);     // adiciona no fim: [1, 2, 3, 4]\nnumeros.pop();        // remove o último: [1, 2, 3]\nnumeros.unshift(0);   // adiciona no início: [0, 1, 2, 3]\nnumeros.shift();      // remove o primeiro: [1, 2, 3]\n```\n\n## Percorrer um array\n\n```js\nconst cores = [\"vermelho\", \"verde\", \"azul\"];\n\ncores.forEach((cor) => {\n  console.log(cor);\n});\n```\n\n`forEach` executa uma função para cada elemento do array — é a forma mais comum de percorrer um array em JavaScript moderno.\n\n## Transformar um array com map\n\n```js\nconst numeros = [1, 2, 3, 4];\nconst dobros = numeros.map((n) => n * 2);\n\nconsole.log(dobros); // [2, 4, 6, 8]\n```\n\n`map` cria um **novo array**, sem alterar o original, aplicando uma função a cada elemento.\n\n## Filtrar um array com filter\n\n```js\nconst idades = [12, 18, 25, 16, 30];\nconst adultos = idades.filter((idade) => idade >= 18);\n\nconsole.log(adultos); // [18, 25, 30]\n```\n\n## Exercício proposto\n\nCria um array com as notas de 5 alunos. Usa `filter` para criar um novo array só com as notas de aprovado (>= 10), e usa `forEach` para mostrar cada uma dessas notas na consola.','2026-08-31 02:35:54'),
(9,'Objetos','Estruturas de dados chave-valor.','JavaScript',9,'# Objetos\n\nUm objeto é uma coleção de dados relacionados, organizados em pares **chave: valor**. Enquanto um array organiza valores por posição (índice), um objeto organiza valores por nome.\n\n## Criar e aceder a um objeto\n\n```js\nconst utilizador = {\n  nome: \"Sofia\",\n  idade: 22,\n  ativo: true,\n};\n\nconsole.log(utilizador.nome);   // \"Sofia\" (notação de ponto)\nconsole.log(utilizador[\"idade\"]); // 22 (notação de parênteses retos)\n```\n\nA notação de parênteses retos é útil quando o nome da propriedade está numa variável:\n\n```js\nconst propriedade = \"nome\";\nconsole.log(utilizador[propriedade]); // \"Sofia\"\n```\n\n## Alterar e adicionar propriedades\n\n```js\nutilizador.idade = 23;       // altera um valor existente\nutilizador.cidade = \"Aveiro\"; // adiciona uma propriedade nova\ndelete utilizador.ativo;      // remove uma propriedade\n```\n\n## Métodos: funções dentro de um objeto\n\n```js\nconst utilizador = {\n  nome: \"Sofia\",\n  saudar() {\n    console.log(\"Olá, sou \" + this.nome);\n  },\n};\n\nutilizador.saudar(); // \"Olá, sou Sofia\"\n```\n\n`this` dentro de um método refere-se ao próprio objeto onde o método está definido.\n\n## Objetos com arrays (e vice-versa)\n\n```js\nconst modulo = {\n  titulo: \"Objetos\",\n  perguntas: [\"O que é um objeto?\", \"Como aceder a uma propriedade?\"],\n};\n\nconsole.log(modulo.perguntas[0]); // \"O que é um objeto?\"\nconsole.log(modulo.perguntas.length); // 2\n```\n\nÉ muito comum, em aplicações reais, teres arrays de objetos — por exemplo, uma lista de utilizadores, cada um com nome, email e XP.\n\n## Exercício proposto\n\nCria um objeto `jogador` com as propriedades `nome`, `xp` e `nivel`. Adiciona um método `ganharXp(quantidade)` que soma XP ao jogador e mostra na consola o novo total.','2026-08-31 02:35:54'),
(10,'Manipulação do DOM','Como interagir com uma página HTML via JavaScript.','JavaScript',10,'# Manipulação do DOM\n\nO **DOM** (Document Object Model) é a representação de uma página HTML em memória, organizada como uma árvore de elementos. JavaScript pode usar o DOM para ler e alterar o conteúdo, estilo e estrutura de uma página, tornando-a interativa.\n\n## Selecionar elementos\n\n```js\nconst titulo = document.querySelector(\"h1\");\nconst botoes = document.querySelectorAll(\"button\"); // devolve vários elementos\nconst caixa = document.getElementById(\"caixa-mensagem\");\n```\n\n`querySelector` usa a mesma sintaxe de seletores do CSS (`\"#id\"`, `\".classe\"`, `\"tag\"`), e é a forma mais flexível de selecionar elementos.\n\n## Ler e alterar conteúdo\n\n```js\nconst paragrafo = document.querySelector(\"p\");\n\nconsole.log(paragrafo.textContent); // lê o texto atual\nparagrafo.textContent = \"Texto novo!\"; // substitui o texto\nparagrafo.innerHTML = \"<strong>Texto em negrito</strong>\"; // insere HTML\n```\n\n## Alterar estilos e classes\n\n```js\nconst caixa = document.querySelector(\".caixa\");\n\ncaixa.style.backgroundColor = \"lightblue\";\ncaixa.classList.add(\"destaque\");\ncaixa.classList.remove(\"escondido\");\ncaixa.classList.toggle(\"ativo\"); // adiciona se não tiver, remove se tiver\n```\n\n## Reagir a eventos\n\n```js\nconst botao = document.querySelector(\"#meu-botao\");\n\nbotao.addEventListener(\"click\", () => {\n  console.log(\"Botão clicado!\");\n});\n```\n\nEventos comuns incluem `\"click\"`, `\"input\"` (quando se escreve num campo), `\"submit\"` (envio de um formulário) e `\"keydown\"` (tecla premida).\n\n## Criar elementos dinamicamente\n\n```js\nconst novaLista = document.createElement(\"li\");\nnovaLista.textContent = \"Novo item\";\ndocument.querySelector(\"ul\").appendChild(novaLista);\n```\n\n## Exercício proposto\n\nNuma página HTML simples com um botão e um parágrafo vazio, escreve JavaScript que, ao clicar no botão, escreva \"Olá, DOM!\" dentro do parágrafo.','2026-08-31 02:35:54');
/*!40000 ALTER TABLE `modulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `quizzes`
--

LOCK TABLES `quizzes` WRITE;
/*!40000 ALTER TABLE `quizzes` DISABLE KEYS */;
INSERT INTO `quizzes` (`id`, `modulo_id`, `titulo`) VALUES (2,1,'Quiz: Introdução à Programação'),
(3,2,'Quiz: Variáveis'),
(4,3,'Quiz: Tipos de Dados'),
(5,4,'Quiz: Operadores'),
(6,5,'Quiz: Estruturas Condicionais'),
(7,6,'Quiz: Loops'),
(8,7,'Quiz: Funções'),
(9,8,'Quiz: Arrays'),
(10,9,'Quiz: Objetos'),
(11,10,'Quiz: Manipulação do DOM');
/*!40000 ALTER TABLE `quizzes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `perguntas`
--

LOCK TABLES `perguntas` WRITE;
/*!40000 ALTER TABLE `perguntas` DISABLE KEYS */;
INSERT INTO `perguntas` (`id`, `quiz_id`, `enunciado`, `explicacao`, `ordem`) VALUES (3,2,'O que é um algoritmo?','Um algoritmo é uma sequência de passos bem definidos para resolver um problema, independentemente da linguagem usada para o implementar.',1),
(4,2,'Qual instrução mostra texto na consola em JavaScript?','`console.log()` é a função usada para escrever valores na consola, essencial para depurar código.',2),
(5,2,'O que acontece quando o computador encontra um erro de sintaxe?','Um erro de sintaxe impede a execução do programa, porque o código não respeita as regras da linguagem.',3),
(6,2,'Como se escreve um comentário de uma linha em JavaScript?','Duas barras (`//`) transformam o resto da linha num comentário, que o JavaScript ignora ao executar.',4),
(7,2,'Qual é a diferença entre um erro de sintaxe e um erro de lógica?','O erro de sintaxe impede a execução; o erro de lógica deixa o programa correr, mas com um resultado incorreto — por isso é mais difícil de detetar.',5),
(8,3,'Qual palavra-chave declara uma variável que NÃO pode ser reatribuída?','`const` cria uma ligação constante ao valor — tentar reatribuir gera um erro.',1),
(9,3,'Qual destas é uma declaração de variável válida em JavaScript?','Os nomes de variáveis não podem começar por um número nem conter espaços ou hífens.',2),
(10,3,'Porque é geralmente recomendado evitar `var`?','`var` tem regras de escopo mais confusas do que `let`/`const`, o que pode causar bugs difíceis de detetar.',3),
(11,3,'O que acontece ao correr este código?\n\nconst maximo = 100;\nmaximo = 200;','Reatribuir uma `const` depois de declarada gera sempre um erro em tempo de execução.',4),
(12,3,'JavaScript é sensível a maiúsculas/minúsculas nos nomes de variáveis?','`idade` e `Idade` são consideradas duas variáveis completamente diferentes em JavaScript.',5),
(13,4,'Qual o resultado de `typeof 42`?','Todo o número em JavaScript, inteiro ou decimal, é do tipo \"number\".',1),
(14,4,'Qual destas formas permite inserir uma variável diretamente dentro de um texto?','As template strings, delimitadas por crases (` `), permitem usar `${variavel}` para inserir valores diretamente.',2),
(15,4,'Qual é o resultado de `\"5\" + 3` em JavaScript?','Quando um dos operandos é string, o operador `+` concatena em vez de somar, resultando em \"53\".',3),
(16,4,'Qual a diferença principal entre `undefined` e `null`?','`undefined` significa que uma variável existe mas ainda não recebeu valor; `null` é atribuído intencionalmente para representar \"sem valor\".',4),
(17,4,'Como converter a string \"25\" para o número 25?','`Number()` converte um valor para o tipo number, quando isso é possível.',5),
(18,5,'Qual o resultado de `10 % 3`?','O operador `%` devolve o resto da divisão: 10 dividido por 3 dá 3 com resto 1.',1),
(19,5,'Qual a diferença entre `==` e `===`?','`===` compara valor e tipo sem converter; `==` converte tipos antes de comparar, o que pode gerar resultados inesperados.',2),
(20,5,'Qual é o resultado de `pontos += 5` se `pontos` valia 10?','`+=` é um atalho para `pontos = pontos + 5`, logo o novo valor é 15.',3),
(21,5,'Qual operador lógico exige que AMBAS as condições sejam verdadeiras?','O operador `&&` (E lógico) só resulta em `true` se as duas condições forem verdadeiras.',4),
(22,5,'Por que motivo se recomenda usar `===` em vez de `==`?','Usar `===` evita conversões de tipo implícitas que podem levar a comparações incorretas, como `5 == \"5\"` ser `true`.',5),
(23,6,'Qual instrução testa uma condição e executa código apenas se ela for verdadeira?','`if` é a estrutura base de decisão em JavaScript.',1),
(24,6,'Num bloco `if / else if / else`, quantos blocos podem ser executados?','Apenas o primeiro bloco cuja condição for verdadeira é executado; os restantes são ignorados.',2),
(25,6,'No `switch`, o que acontece se esqueceres o `break` num `case`?','Sem `break`, a execução continua para o próximo `case`, mesmo que a condição desse case não se verifique.',3),
(26,6,'Qual o resultado de `if (idade >= 18 && temCarta)` se `idade = 20` e `temCarta = false`?','Como `&&` exige que ambas as condições sejam verdadeiras, e `temCarta` é `false`, o bloco `if` não é executado.',4),
(27,6,'Quando é preferível usar `switch` em vez de vários `else if`?','`switch` costuma ser mais legível quando se compara a mesma variável com muitos valores possíveis distintos.',5),
(28,7,'Quantas vezes este ciclo executa?\n\nfor (let i = 0; i < 5; i++) { ... }','O ciclo começa em 0 e repete enquanto i < 5, logo executa para i = 0,1,2,3,4 — um total de 5 vezes.',1),
(29,7,'Qual a principal diferença entre `while` e `do...while`?','`do...while` executa o bloco pelo menos uma vez antes de verificar a condição; `while` verifica a condição antes de executar.',2),
(30,7,'O que causa um \"loop infinito\"?','Se a condição do ciclo nunca se tornar falsa (por exemplo, esquecer de atualizar a variável de controlo), o ciclo nunca para.',3),
(31,7,'O que faz a instrução `break` dentro de um ciclo?','`break` interrompe imediatamente o ciclo, saltando para o código a seguir a ele.',4),
(32,7,'O que faz a instrução `continue` dentro de um ciclo?','`continue` salta o resto do código dessa iteração e avança diretamente para a próxima.',5),
(33,8,'O que é um \"parâmetro\" numa função?','Um parâmetro é o nome usado dentro da declaração da função para representar um valor que ela vai receber.',1),
(34,8,'O que acontece a uma função sem instrução `return`?','Sem `return`, uma função executa o seu código mas devolve sempre `undefined`.',2),
(35,8,'Qual destas é uma \"arrow function\" válida que soma dois números?','As arrow functions usam `=>` e podem omitir chavetas e `return` quando o corpo é uma única expressão.',3),
(36,8,'Qual é o valor de `nome` ao chamar `saudar()` se a função for `function saudar(nome = \"visitante\") {...}`?','Quando nenhum argumento é passado, o parâmetro assume o valor por omissão definido na declaração.',4),
(37,8,'Qual é uma vantagem principal de usar funções?','Funções evitam repetir o mesmo código várias vezes, tornando o programa mais organizado e fácil de manter.',5),
(38,9,'Qual é o índice do primeiro elemento de um array em JavaScript?','Os arrays em JavaScript são indexados a partir de 0, não de 1.',1),
(39,9,'Qual método adiciona um elemento ao FIM de um array?','`push()` adiciona um ou mais elementos ao final do array.',2),
(40,9,'O que devolve `numeros.map((n) => n * 2)` para `numeros = [1, 2, 3]`?','`map` aplica a função a cada elemento e devolve um novo array com os resultados, sem alterar o original.',3),
(41,9,'Qual método cria um novo array apenas com os elementos que cumprem uma condição?','`filter` percorre o array e devolve um novo array só com os elementos para os quais a função passada devolve `true`.',4),
(42,9,'O que devolve `frutas.length` se `frutas = [\"maçã\", \"pera\"]`?','`length` devolve o número de elementos existentes no array, neste caso 2.',5),
(43,10,'Como se organiza a informação dentro de um objeto em JavaScript?','Um objeto organiza dados em pares chave: valor, ao contrário de um array que usa posições/índices.',1),
(44,10,'Dado `const pessoa = { nome: \"Rui\" };`, como acedemos ao nome?','A notação de ponto (`objeto.propriedade`) é a forma mais comum de aceder a uma propriedade de um objeto.',2),
(45,10,'Quando é preferível usar a notação de parênteses retos (`objeto[\"propriedade\"]`) em vez de ponto?','A notação de parênteses retos é necessária quando o nome da propriedade está guardado numa variável.',3),
(46,10,'Dentro de um método de um objeto, a que se refere a palavra `this`?','`this`, usado dentro de um método, refere-se ao próprio objeto onde esse método está definido.',4),
(47,10,'Como se remove uma propriedade de um objeto?','A palavra-chave `delete` remove uma propriedade específica de um objeto.',5),
(48,11,'O que significa a sigla DOM?','DOM significa \"Document Object Model\" — a representação de uma página HTML como uma árvore de objetos que o JavaScript pode manipular.',1),
(49,11,'Qual método seleciona o primeiro elemento que corresponde a um seletor CSS?','`document.querySelector()` aceita a mesma sintaxe de seletores CSS (id, classe, tag) e devolve o primeiro elemento correspondente.',2),
(50,11,'Qual método regista uma função para correr quando um elemento é clicado?','`addEventListener(\"click\", funcao)` associa uma função a um evento, como o clique num botão.',3),
(51,11,'Qual a diferença entre `textContent` e `innerHTML`?','`textContent` trata tudo como texto simples; `innerHTML` interpreta o conteúdo como HTML, permitindo inserir tags.',4),
(52,11,'Qual método cria um novo elemento HTML dinamicamente com JavaScript?','`document.createElement(\"tag\")` cria um novo elemento na memória, que depois pode ser inserido na página com `appendChild`.',5);
/*!40000 ALTER TABLE `perguntas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `alternativas`
--

LOCK TABLES `alternativas` WRITE;
/*!40000 ALTER TABLE `alternativas` DISABLE KEYS */;
INSERT INTO `alternativas` (`id`, `pergunta_id`, `texto`, `correta`) VALUES (9,3,'Uma sequência finita e bem definida de passos para resolver um problema',1),
(10,3,'Um tipo de variável em JavaScript',0),
(11,3,'Um erro de sintaxe no código',0),
(12,3,'Um programa já compilado',0),
(13,4,'print(\"texto\")',0),
(14,4,'console.log(\"texto\")',1),
(15,4,'echo(\"texto\")',0),
(16,4,'display(\"texto\")',0),
(17,5,'O programa corre normalmente, ignorando o erro',0),
(18,5,'O programa não consegue ser executado',1),
(19,5,'O erro é corrigido automaticamente',0),
(20,5,'O computador desliga-se',0),
(21,6,'# comentário',0),
(22,6,'<!-- comentário -->',0),
(23,6,'// comentário',1),
(24,6,'** comentário **',0),
(25,7,'Não há diferença, são o mesmo tipo de erro',0),
(26,7,'O erro de lógica impede a execução; o de sintaxe não',0),
(27,7,'O erro de sintaxe impede a execução; o de lógica deixa correr mas com resultado errado',1),
(28,7,'Erros de lógica só existem em linguagens compiladas',0),
(29,8,'let',0),
(30,8,'const',1),
(31,8,'var',0),
(32,8,'static',0),
(33,9,'let 1nome = \"Ana\";',0),
(34,9,'let nome1 = \"Ana\";',1),
(35,9,'let nome-1 = \"Ana\";',0),
(36,9,'let nome 1 = \"Ana\";',0),
(37,10,'Porque não existe em JavaScript moderno',0),
(38,10,'Porque tem um comportamento de escopo que causa bugs mais facilmente',1),
(39,10,'Porque só funciona com números',0),
(40,10,'Porque é mais lenta a executar',0),
(41,11,'maximo passa a valer 200 sem problema',0),
(42,11,'Dá erro, porque const não pode ser reatribuída',1),
(43,11,'maximo passa a valer 300 (soma automática)',0),
(44,11,'Nada acontece, a linha é ignorada',0),
(45,12,'Sim, \"idade\" e \"Idade\" são variáveis diferentes',1),
(46,12,'Não, maiúsculas e minúsculas são tratadas da mesma forma',0),
(47,12,'Só é sensível em nomes de funções, não em variáveis',0),
(48,12,'Depende da versão do JavaScript',0),
(49,13,'\"number\"',1),
(50,13,'\"integer\"',0),
(51,13,'\"int\"',0),
(52,13,'\"float\"',0),
(53,14,'\"Olá, \" + nome + \"!\"',0),
(54,14,'`Olá, ${nome}!`',1),
(55,14,'\'Olá, \' . nome . \'!\'',0),
(56,14,'Todas as anteriores funcionam da mesma forma',0),
(57,15,'8',0),
(58,15,'\"53\"',1),
(59,15,'Erro',0),
(60,15,'undefined',0),
(61,16,'Não há diferença nenhuma',0),
(62,16,'undefined é uma variável sem valor atribuído; null é atribuído intencionalmente',1),
(63,16,'null só existe em arrays',0),
(64,16,'undefined só existe em objetos',0),
(65,17,'String(\"25\")',0),
(66,17,'Number(\"25\")',1),
(67,17,'Boolean(\"25\")',0),
(68,17,'typeof(\"25\")',0),
(69,18,'3',0),
(70,18,'3.33',0),
(71,18,'1',1),
(72,18,'0',0),
(73,19,'Não há diferença, são idênticos',0),
(74,19,'=== compara valor e tipo; == converte tipos antes de comparar',1),
(75,19,'== só funciona com números',0),
(76,19,'=== é mais lento a executar',0),
(77,20,'5',0),
(78,20,'10',0),
(79,20,'15',1),
(80,20,'50',0),
(81,21,'||',0),
(82,21,'&&',1),
(83,21,'!',0),
(84,21,'==',0),
(85,22,'Porque == não existe em JavaScript moderno',0),
(86,22,'Porque === evita conversões de tipo inesperadas',1),
(87,22,'Porque === é obrigatório para números',0),
(88,22,'Não há motivo real, é só preferência estética',0),
(89,23,'loop',0),
(90,23,'if',1),
(91,23,'function',0),
(92,23,'const',0),
(93,24,'Todos os blocos cuja condição seja verdadeira',0),
(94,24,'Apenas o primeiro bloco cuja condição for verdadeira',1),
(95,24,'Sempre todos os blocos, um a seguir ao outro',0),
(96,24,'Nenhum, é preciso um switch para isso',0),
(97,25,'Nada, o switch para automaticamente',0),
(98,25,'O código \"cai\" e executa também o case seguinte',1),
(99,25,'Dá sempre um erro de sintaxe',0),
(100,25,'O switch ignora esse case inteiro',0),
(101,26,'O bloco if é executado',0),
(102,26,'O bloco if não é executado',1),
(103,26,'Dá um erro',0),
(104,26,'Depende da ordem das variáveis',0),
(105,27,'Quando há apenas duas opções possíveis',0),
(106,27,'Quando se compara a mesma variável com muitos valores diferentes',1),
(107,27,'Nunca, else if é sempre melhor',0),
(108,27,'Só quando se trabalha com números decimais',0),
(109,28,'4 vezes',0),
(110,28,'5 vezes',1),
(111,28,'6 vezes',0),
(112,28,'Infinitas vezes',0),
(113,29,'Não há diferença nenhuma',0),
(114,29,'do...while executa pelo menos uma vez, mesmo que a condição seja falsa',1),
(115,29,'while só funciona com arrays',0),
(116,29,'do...while não permite usar break',0),
(117,30,'Usar for em vez de while',0),
(118,30,'A condição do ciclo nunca se tornar falsa',1),
(119,30,'Usar console.log dentro do ciclo',0),
(120,30,'Percorrer um array vazio',0),
(121,31,'Salta para a próxima iteração',0),
(122,31,'Termina o ciclo imediatamente',1),
(123,31,'Reinicia o ciclo do zero',0),
(124,31,'Não tem nenhum efeito',0),
(125,32,'Termina o ciclo por completo',0),
(126,32,'Salta para a próxima iteração, ignorando o resto do código atual',1),
(127,32,'Reinicia a variável de controlo',0),
(128,32,'Só funciona dentro de um switch',0),
(129,33,'O valor devolvido pela função',0),
(130,33,'Um nome que representa um valor que a função vai receber',1),
(131,33,'O nome da própria função',0),
(132,33,'Um erro dentro da função',0),
(133,34,'Dá sempre erro',0),
(134,34,'Devolve undefined',1),
(135,34,'Devolve automaticamente 0',0),
(136,34,'Não pode ser chamada',0),
(137,35,'const somar = (a, b) -> a + b;',0),
(138,35,'const somar = (a, b) => a + b;',1),
(139,35,'function somar(a, b) -> return a + b;',0),
(140,35,'arrow somar(a, b) { a + b }',0),
(141,36,'undefined',0),
(142,36,'\"visitante\"',1),
(143,36,'null',0),
(144,36,'Dá erro por falta de argumento',0),
(145,37,'Tornam o programa mais lento de propósito',0),
(146,37,'Evitam repetição de código e facilitam a organização',1),
(147,37,'São obrigatórias em todas as linguagens',0),
(148,37,'Substituem a necessidade de variáveis',0),
(149,38,'1',0),
(150,38,'0',1),
(151,38,'-1',0),
(152,38,'Depende do array',0),
(153,39,'push()',1),
(154,39,'pop()',0),
(155,39,'shift()',0),
(156,39,'unshift()',0),
(157,40,'[1, 2, 3]',0),
(158,40,'[2, 4, 6]',1),
(159,40,'6',0),
(160,40,'undefined',0),
(161,41,'map()',0),
(162,41,'forEach()',0),
(163,41,'filter()',1),
(164,41,'push()',0),
(165,42,'\"maçã,pera\"',0),
(166,42,'1',0),
(167,42,'2',1),
(168,42,'undefined',0),
(169,43,'Em pares chave: valor',1),
(170,43,'Só por posição, como um array',0),
(171,43,'Só pode guardar números',0),
(172,43,'Em linhas e colunas, como uma tabela',0),
(173,44,'pessoa->nome',0),
(174,44,'pessoa.nome',1),
(175,44,'pessoa(nome)',0),
(176,44,'pessoa::nome',0),
(177,45,'Nunca, a notação de ponto serve sempre para tudo',0),
(178,45,'Quando o nome da propriedade está guardado numa variável',1),
(179,45,'Só funciona com números',0),
(180,45,'É apenas uma questão de estilo, sem diferença funcional',0),
(181,46,'Ao objeto onde o método está definido',1),
(182,46,'À função global do programa',0),
(183,46,'A um array vazio por omissão',0),
(184,46,'Nunca é usado dentro de objetos',0),
(185,47,'objeto.remove(\"propriedade\")',0),
(186,47,'delete objeto.propriedade',1),
(187,47,'objeto.propriedade = remove',0),
(188,47,'Não é possível remover propriedades',0),
(189,48,'Document Object Model',1),
(190,48,'Data Output Manager',0),
(191,48,'Dynamic Order Method',0),
(192,48,'Design Object Mode',0),
(193,49,'document.select()',0),
(194,49,'document.querySelector()',1),
(195,49,'document.find()',0),
(196,49,'document.get()',0),
(197,50,'element.onClick(funcao)',0),
(198,50,'element.addEventListener(\"click\", funcao)',1),
(199,50,'element.click = funcao',0),
(200,50,'element.whenClicked(funcao)',0),
(201,51,'Não há diferença, são idênticos',0),
(202,51,'textContent insere apenas texto; innerHTML interpreta HTML',1),
(203,51,'innerHTML só funciona em formulários',0),
(204,51,'textContent é mais lento que innerHTML',0),
(205,52,'document.newElement()',0),
(206,52,'document.createElement()',1),
(207,52,'document.addElement()',0),
(208,52,'document.makeElement()',0);
/*!40000 ALTER TABLE `alternativas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `conquistas`
--

LOCK TABLES `conquistas` WRITE;
/*!40000 ALTER TABLE `conquistas` DISABLE KEYS */;
INSERT INTO `conquistas` (`id`, `nome`, `descricao`, `icone`, `criterio_tipo`, `criterio_valor`) VALUES (1,'Primeiro Login','Fizeste login pela primeira vez.','trophy','PRIMEIRO_LOGIN',NULL),
(2,'Primeiro Quiz','Completaste o teu primeiro quiz.','quiz','PRIMEIRO_QUIZ',NULL),
(3,'10 Quizzes','Completaste 10 quizzes.','medal','N_QUIZZES',10),
(4,'100 Questões Respondidas','Respondeste a 100 questões.','brain','N_QUESTOES',100),
(5,'7 Dias Consecutivos','Estudaste 7 dias seguidos.','flame','STREAK_DIAS',7),
(6,'50 Dias Consecutivos','Estudaste 50 dias seguidos.','fire','STREAK_DIAS',50),
(7,'Mestre das Variáveis','Nota máxima no quiz de Variáveis.','star','MODULO_PERFEITO',2),
(8,'Mestre das Funções','Nota máxima no quiz de Funções.','star','MODULO_PERFEITO',7);
/*!40000 ALTER TABLE `conquistas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-31  2:37:17
