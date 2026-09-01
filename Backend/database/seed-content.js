// ============================================================
// Script de seed de CONTEÚDO COMPLETO: popula o texto de cada
// módulo e cria um quiz de 5-6 perguntas para cada um.
//
// Corre com: node database/seed-content.js
// (usa o mesmo .env do backend para ligar ao MySQL)
// ============================================================
import 'dotenv/config';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8mb4',
});

// ------------------------------------------------------------
// Conteúdo dos módulos (ordem = id do módulo, 1 a 10)
// ------------------------------------------------------------
const modulos = [
  {
    ordem: 1,
    conteudo: `# Introdução à Programação

Programar é o ato de escrever instruções que um computador consegue executar, passo a passo, para resolver um problema ou realizar uma tarefa. Um computador não "pensa" — ele segue exatamente aquilo que lhe é pedido, na ordem em que é pedido. Por isso, a primeira competência de qualquer programador não é saber uma linguagem específica, mas sim saber decompor um problema em passos simples e sem ambiguidade.

## O que é um algoritmo?

Um **algoritmo** é uma sequência finita e bem definida de passos para resolver um problema. Antes de escrever código, é boa prática pensar no algoritmo em português (ou em pseudocódigo):

\`\`\`
1. Perguntar ao utilizador o seu nome
2. Guardar o nome numa variável
3. Mostrar "Olá, " seguido do nome
\`\`\`

## O teu primeiro programa

Neste curso vamos usar **JavaScript**, uma das linguagens mais usadas no mundo, tanto no browser como no servidor. O programa mais simples que podes escrever é mostrar uma mensagem:

\`\`\`js
console.log("Olá, CodeQuest!");
\`\`\`

A função \`console.log()\` escreve texto na consola — é a ferramenta que vais usar constantemente para veres o que o teu código está a fazer.

## Comentários

Comentários são texto que o computador ignora, mas que ajudam quem lê o código a perceber o que ele faz:

\`\`\`js
// Isto é um comentário de uma linha
console.log("Isto é executado"); // isto também é um comentário

/* 
  Isto é um comentário
  de várias linhas
*/
\`\`\`

## Porque é que os erros acontecem

Vais cometer erros — todos os programadores cometem, todos os dias. Um erro de sintaxe (ex: esquecer um ponto e vírgula ou uma aspa) impede o programa de correr. Um erro de lógica (o programa corre, mas faz a coisa errada) é mais difícil de encontrar, e é aí que a prática de "pensar em algoritmos" mais ajuda.

## Exercício proposto

Escreve um programa em JavaScript que mostre na consola, em três linhas separadas, o teu nome, a tua idade e a linguagem de programação que estás a aprender. Usa pelo menos um comentário a explicar o que o código faz.`,
  },
  {
    ordem: 2,
    conteudo: `# Variáveis

Uma **variável** é um espaço na memória do computador com um nome, onde guardamos um valor para usar mais tarde. Pensa numa variável como uma caixa etiquetada: dás-lhe um nome, pões lá dentro alguma coisa, e depois podes ir buscar ou substituir o que está dentro.

## Declarar variáveis

Em JavaScript há três formas de declarar uma variável:

\`\`\`js
let idade = 25;        // pode ser reatribuída
const nome = "Ana";    // não pode ser reatribuída
var cidade = "Aveiro";  // forma antiga, evita usar
\`\`\`

- Usa **\`const\`** por omissão, sempre que o valor não vai mudar.
- Usa **\`let\`** quando sabes que o valor vai ser alterado ao longo do programa.
- Evita **\`var\`** — é a forma mais antiga da linguagem e tem comportamentos que causam bugs difíceis de encontrar.

## Reatribuir vs redeclarar

\`\`\`js
let pontos = 0;
pontos = 10;       // válido: let permite reatribuir
pontos = pontos + 5; // agora pontos vale 15

const maximo = 100;
maximo = 200;       // ERRO! const não pode ser reatribuída
\`\`\`

## Regras para nomes de variáveis

- Não podem começar por um número (\`1nome\` é inválido, \`nome1\` é válido).
- Não podem ter espaços nem hífens (usa \`camelCase\`: \`nomeCompleto\`).
- São sensíveis a maiúsculas/minúsculas: \`idade\` e \`Idade\` são variáveis diferentes.
- Dá nomes descritivos: \`x\` diz pouco, \`pontuacaoJogador\` diz tudo.

## Boas práticas

\`\`\`js
// Mau: pouco claro
let x = 30;

// Bom: claro e descritivo
const idadeMinima = 18;
\`\`\`

## Exercício proposto

Cria três variáveis: uma \`const\` com o teu nome, uma \`let\` com a tua pontuação atual num jogo (começa em 0) e outra \`let\` que representa o número de vidas (começa em 3). Depois, simula perder uma vida e ganhar 50 pontos, atualizando as variáveis, e mostra o resultado final com \`console.log\`.`,
  },
  {
    ordem: 3,
    conteudo: `# Tipos de Dados

Todo o valor em JavaScript tem um **tipo**, que determina que operações podemos fazer com ele. Os tipos primitivos mais usados são:

## Number (números)

\`\`\`js
const inteiro = 42;
const decimal = 3.14;
const negativo = -7;
\`\`\`

Ao contrário de outras linguagens, JavaScript não distingue "inteiro" de "decimal" — é tudo \`number\`.

## String (texto)

\`\`\`js
const nome = "Diogo";
const saudacao = 'Olá!';
const mensagem = \`Olá, \${nome}!\`; // template string: insere variáveis com \${}
\`\`\`

As três formas de aspas (\`"\`, \`'\`, \`\`\` \` \`\`\`) funcionam para texto, mas só as crases (\` \` \`) permitem inserir variáveis diretamente com \`\${}\`.

## Boolean (verdadeiro/falso)

\`\`\`js
const estaLogado = true;
const temErros = false;
\`\`\`

Usados sobretudo em condições (módulo seguinte).

## Undefined e null

\`\`\`js
let pontuacao;          // undefined: existe, mas ainda não tem valor
let resultado = null;   // null: intencionalmente vazio/sem valor
\`\`\`

## Verificar o tipo de um valor

\`\`\`js
console.log(typeof 42);         // "number"
console.log(typeof "Ana");      // "string"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
\`\`\`

## Conversão entre tipos

É comum precisar de converter texto em número, ou vice-versa:

\`\`\`js
const textoIdade = "25";
const idade = Number(textoIdade);   // 25 (number)
const texto = String(idade);         // "25" (string)

console.log("5" + 3);   // "53" (concatena, porque "5" é string)
console.log(Number("5") + 3); // 8 (soma, porque converteu para número)
\`\`\`

## Exercício proposto

Cria uma variável \`string\` com o valor \`"10"\` e uma variável \`number\` com o valor \`5\`. Mostra o que acontece quando as somas com \`+\` sem converter, e depois converte a string para número com \`Number()\` e soma outra vez, comparando os dois resultados.`,
  },
  {
    ordem: 4,
    conteudo: `# Operadores

Operadores são símbolos que realizam operações sobre valores e variáveis.

## Operadores aritméticos

\`\`\`js
console.log(10 + 3);  // 13 (soma)
console.log(10 - 3);  // 7  (subtração)
console.log(10 * 3);  // 30 (multiplicação)
console.log(10 / 3);  // 3.333... (divisão)
console.log(10 % 3);  // 1  (resto da divisão, "módulo")
console.log(10 ** 2); // 100 (potência)
\`\`\`

O operador \`%\` (módulo) é muito usado para saber se um número é par: \`numero % 2 === 0\`.

## Operadores de atribuição

\`\`\`js
let pontos = 10;
pontos += 5;   // equivale a: pontos = pontos + 5  -> 15
pontos -= 2;   // pontos = pontos - 2 -> 13
pontos *= 2;   // pontos = pontos * 2 -> 26
\`\`\`

## Operadores de comparação

\`\`\`js
console.log(5 == "5");   // true  (compara só o valor, converte tipos)
console.log(5 === "5");  // false (compara valor E tipo)
console.log(5 !== "5");  // true
console.log(10 > 5);     // true
console.log(10 <= 10);   // true
\`\`\`

**Usa sempre \`===\` e \`!==\`** em vez de \`==\` e \`!=\` — evitam conversões de tipo inesperadas que são fonte comum de bugs.

## Operadores lógicos

\`\`\`js
const temConta = true;
const temSaldo = false;

console.log(temConta && temSaldo); // false (E: as duas têm de ser true)
console.log(temConta || temSaldo); // true  (OU: basta uma ser true)
console.log(!temConta);            // false (NÃO: inverte o valor)
\`\`\`

## Exercício proposto

Escreve código que declare um número qualquer numa variável e use o operador \`%\` para mostrar na consola se esse número é par ou ímpar (por agora, podes só mostrar o resultado da comparação com \`console.log\`; as estruturas condicionais para decidir automaticamente vêm no próximo módulo).`,
  },
  {
    ordem: 5,
    conteudo: `# Estruturas Condicionais

As estruturas condicionais permitem que o programa tome decisões: executar um bloco de código apenas se uma condição for verdadeira.

## if / else

\`\`\`js
const idade = 16;

if (idade >= 18) {
  console.log("És maior de idade.");
} else {
  console.log("És menor de idade.");
}
\`\`\`

## else if — várias condições

\`\`\`js
const nota = 14;

if (nota >= 18) {
  console.log("Excelente");
} else if (nota >= 14) {
  console.log("Bom");
} else if (nota >= 10) {
  console.log("Suficiente");
} else {
  console.log("Reprovado");
}
\`\`\`

As condições são verificadas por ordem, de cima para baixo, e só o primeiro bloco cuja condição é verdadeira é executado.

## Condições combinadas

\`\`\`js
const idade = 20;
const temCarta = true;

if (idade >= 18 && temCarta) {
  console.log("Pode conduzir.");
}
\`\`\`

## switch — alternativa para muitos casos

Quando comparas a mesma variável com vários valores possíveis, \`switch\` pode ser mais legível que muitos \`else if\`:

\`\`\`js
const diaSemana = 3;

switch (diaSemana) {
  case 1:
    console.log("Segunda-feira");
    break;
  case 2:
    console.log("Terça-feira");
    break;
  case 3:
    console.log("Quarta-feira");
    break;
  default:
    console.log("Outro dia");
}
\`\`\`

O \`break\` é essencial — sem ele, o código "cai" para o caso seguinte mesmo que já tenha encontrado o correto.

## Exercício proposto

Escreve um programa que declare uma variável \`nota\` (0 a 20) e use \`if/else if/else\` para mostrar "Aprovado" se a nota for maior ou igual a 10, e "Reprovado" caso contrário. Testa o teu código com pelo menos três valores diferentes de nota.`,
  },
  {
    ordem: 6,
    conteudo: `# Loops (Ciclos)

Loops permitem repetir um bloco de código várias vezes, sem teres de o escrever repetidamente.

## for — quando sabes quantas vezes repetir

\`\`\`js
for (let i = 0; i < 5; i++) {
  console.log("Iteração número " + i);
}
// Mostra: 0, 1, 2, 3, 4
\`\`\`

O \`for\` tem três partes: inicialização (\`let i = 0\`), condição (\`i < 5\`) e incremento (\`i++\`). O ciclo repete enquanto a condição for verdadeira.

## while — quando não sabes à partida quantas vezes

\`\`\`js
let tentativas = 0;

while (tentativas < 3) {
  console.log("Tentativa " + tentativas);
  tentativas++;
}
\`\`\`

**Cuidado com loops infinitos**: se te esqueceres de atualizar a condição (\`tentativas++\`), o ciclo nunca para.

## do...while — executa pelo menos uma vez

\`\`\`js
let numero;
do {
  numero = Math.floor(Math.random() * 10);
  console.log("Número gerado:", numero);
} while (numero !== 7);
\`\`\`

Ao contrário do \`while\`, o \`do...while\` verifica a condição **depois** de executar o bloco — por isso corre sempre pelo menos uma vez.

## Percorrer um array com for

\`\`\`js
const nomes = ["Ana", "Bruno", "Carla"];

for (let i = 0; i < nomes.length; i++) {
  console.log(nomes[i]);
}
\`\`\`

## break e continue

\`\`\`js
for (let i = 0; i < 10; i++) {
  if (i === 5) break;      // sai do ciclo imediatamente
  if (i % 2 === 0) continue; // salta para a próxima iteração
  console.log(i); // mostra só 1 e 3
}
\`\`\`

## Exercício proposto

Usa um ciclo \`for\` para mostrar na consola todos os números de 1 a 20, mas usa \`continue\` para saltar os múltiplos de 3.`,
  },
  {
    ordem: 7,
    conteudo: `# Funções

Uma função é um bloco de código reutilizável que podemos "chamar" (executar) sempre que precisarmos, evitando repetir o mesmo código várias vezes.

## Declarar e chamar uma função

\`\`\`js
function saudar(nome) {
  console.log("Olá, " + nome + "!");
}

saudar("Marta"); // "Olá, Marta!"
saudar("Rui");   // "Olá, Rui!"
\`\`\`

\`nome\` é um **parâmetro** — um valor que a função recebe quando é chamada. Quando chamamos \`saudar("Marta")\`, \`"Marta"\` é o **argumento**.

## Funções que devolvem valores

\`\`\`js
function somar(a, b) {
  return a + b;
}

const resultado = somar(3, 4); // resultado vale 7
console.log(resultado);
\`\`\`

O \`return\` termina a função e "devolve" um valor para quem a chamou. Sem \`return\`, a função devolve \`undefined\`.

## Parâmetros com valor por omissão

\`\`\`js
function saudar(nome = "visitante") {
  console.log("Olá, " + nome);
}

saudar();        // "Olá, visitante"
saudar("Ana");   // "Olá, Ana"
\`\`\`

## Arrow functions

Uma forma mais curta de escrever funções, muito comum em JavaScript moderno:

\`\`\`js
const somar = (a, b) => a + b;
const dobro = (n) => n * 2;

console.log(somar(2, 3)); // 5
console.log(dobro(4));    // 8
\`\`\`

## Porque usar funções

- Evitam repetição de código (princípio "DRY" — Don't Repeat Yourself).
- Tornam o código mais fácil de ler: um nome de função bem escolhido explica o que o bloco faz.
- Facilitam testar e corrigir erros, porque a lógica está isolada num só sítio.

## Exercício proposto

Escreve uma função \`calcularMedia(nota1, nota2, nota3)\` que devolva a média das três notas. Chama a função com valores diferentes e mostra o resultado com \`console.log\`.`,
  },
  {
    ordem: 8,
    conteudo: `# Arrays

Um array é uma lista ordenada de valores, guardados numa única variável.

## Criar e aceder a um array

\`\`\`js
const frutas = ["maçã", "banana", "pera"];

console.log(frutas[0]); // "maçã"  (o primeiro índice é sempre 0)
console.log(frutas[2]); // "pera"
console.log(frutas.length); // 3 (número de elementos)
\`\`\`

## Adicionar e remover elementos

\`\`\`js
const numeros = [1, 2, 3];

numeros.push(4);     // adiciona no fim: [1, 2, 3, 4]
numeros.pop();        // remove o último: [1, 2, 3]
numeros.unshift(0);   // adiciona no início: [0, 1, 2, 3]
numeros.shift();      // remove o primeiro: [1, 2, 3]
\`\`\`

## Percorrer um array

\`\`\`js
const cores = ["vermelho", "verde", "azul"];

cores.forEach((cor) => {
  console.log(cor);
});
\`\`\`

\`forEach\` executa uma função para cada elemento do array — é a forma mais comum de percorrer um array em JavaScript moderno.

## Transformar um array com map

\`\`\`js
const numeros = [1, 2, 3, 4];
const dobros = numeros.map((n) => n * 2);

console.log(dobros); // [2, 4, 6, 8]
\`\`\`

\`map\` cria um **novo array**, sem alterar o original, aplicando uma função a cada elemento.

## Filtrar um array com filter

\`\`\`js
const idades = [12, 18, 25, 16, 30];
const adultos = idades.filter((idade) => idade >= 18);

console.log(adultos); // [18, 25, 30]
\`\`\`

## Exercício proposto

Cria um array com as notas de 5 alunos. Usa \`filter\` para criar um novo array só com as notas de aprovado (>= 10), e usa \`forEach\` para mostrar cada uma dessas notas na consola.`,
  },
  {
    ordem: 9,
    conteudo: `# Objetos

Um objeto é uma coleção de dados relacionados, organizados em pares **chave: valor**. Enquanto um array organiza valores por posição (índice), um objeto organiza valores por nome.

## Criar e aceder a um objeto

\`\`\`js
const utilizador = {
  nome: "Sofia",
  idade: 22,
  ativo: true,
};

console.log(utilizador.nome);   // "Sofia" (notação de ponto)
console.log(utilizador["idade"]); // 22 (notação de parênteses retos)
\`\`\`

A notação de parênteses retos é útil quando o nome da propriedade está numa variável:

\`\`\`js
const propriedade = "nome";
console.log(utilizador[propriedade]); // "Sofia"
\`\`\`

## Alterar e adicionar propriedades

\`\`\`js
utilizador.idade = 23;       // altera um valor existente
utilizador.cidade = "Aveiro"; // adiciona uma propriedade nova
delete utilizador.ativo;      // remove uma propriedade
\`\`\`

## Métodos: funções dentro de um objeto

\`\`\`js
const utilizador = {
  nome: "Sofia",
  saudar() {
    console.log("Olá, sou " + this.nome);
  },
};

utilizador.saudar(); // "Olá, sou Sofia"
\`\`\`

\`this\` dentro de um método refere-se ao próprio objeto onde o método está definido.

## Objetos com arrays (e vice-versa)

\`\`\`js
const modulo = {
  titulo: "Objetos",
  perguntas: ["O que é um objeto?", "Como aceder a uma propriedade?"],
};

console.log(modulo.perguntas[0]); // "O que é um objeto?"
console.log(modulo.perguntas.length); // 2
\`\`\`

É muito comum, em aplicações reais, teres arrays de objetos — por exemplo, uma lista de utilizadores, cada um com nome, email e XP.

## Exercício proposto

Cria um objeto \`jogador\` com as propriedades \`nome\`, \`xp\` e \`nivel\`. Adiciona um método \`ganharXp(quantidade)\` que soma XP ao jogador e mostra na consola o novo total.`,
  },
  {
    ordem: 10,
    conteudo: `# Manipulação do DOM

O **DOM** (Document Object Model) é a representação de uma página HTML em memória, organizada como uma árvore de elementos. JavaScript pode usar o DOM para ler e alterar o conteúdo, estilo e estrutura de uma página, tornando-a interativa.

## Selecionar elementos

\`\`\`js
const titulo = document.querySelector("h1");
const botoes = document.querySelectorAll("button"); // devolve vários elementos
const caixa = document.getElementById("caixa-mensagem");
\`\`\`

\`querySelector\` usa a mesma sintaxe de seletores do CSS (\`"#id"\`, \`".classe"\`, \`"tag"\`), e é a forma mais flexível de selecionar elementos.

## Ler e alterar conteúdo

\`\`\`js
const paragrafo = document.querySelector("p");

console.log(paragrafo.textContent); // lê o texto atual
paragrafo.textContent = "Texto novo!"; // substitui o texto
paragrafo.innerHTML = "<strong>Texto em negrito</strong>"; // insere HTML
\`\`\`

## Alterar estilos e classes

\`\`\`js
const caixa = document.querySelector(".caixa");

caixa.style.backgroundColor = "lightblue";
caixa.classList.add("destaque");
caixa.classList.remove("escondido");
caixa.classList.toggle("ativo"); // adiciona se não tiver, remove se tiver
\`\`\`

## Reagir a eventos

\`\`\`js
const botao = document.querySelector("#meu-botao");

botao.addEventListener("click", () => {
  console.log("Botão clicado!");
});
\`\`\`

Eventos comuns incluem \`"click"\`, \`"input"\` (quando se escreve num campo), \`"submit"\` (envio de um formulário) e \`"keydown"\` (tecla premida).

## Criar elementos dinamicamente

\`\`\`js
const novaLista = document.createElement("li");
novaLista.textContent = "Novo item";
document.querySelector("ul").appendChild(novaLista);
\`\`\`

## Exercício proposto

Numa página HTML simples com um botão e um parágrafo vazio, escreve JavaScript que, ao clicar no botão, escreva "Olá, DOM!" dentro do parágrafo.`,
  },
];

// ------------------------------------------------------------
// Quizzes (5-6 perguntas por módulo, 1 alternativa correta cada)
// ------------------------------------------------------------
const quizzes = [
  {
    moduloOrdem: 1,
    titulo: 'Quiz: Introdução à Programação',
    perguntas: [
      {
        enunciado: 'O que é um algoritmo?',
        explicacao: 'Um algoritmo é uma sequência de passos bem definidos para resolver um problema, independentemente da linguagem usada para o implementar.',
        alternativas: [
          { texto: 'Uma sequência finita e bem definida de passos para resolver um problema', correta: true },
          { texto: 'Um tipo de variável em JavaScript', correta: false },
          { texto: 'Um erro de sintaxe no código', correta: false },
          { texto: 'Um programa já compilado', correta: false },
        ],
      },
      {
        enunciado: 'Qual instrução mostra texto na consola em JavaScript?',
        explicacao: '`console.log()` é a função usada para escrever valores na consola, essencial para depurar código.',
        alternativas: [
          { texto: 'print("texto")', correta: false },
          { texto: 'console.log("texto")', correta: true },
          { texto: 'echo("texto")', correta: false },
          { texto: 'display("texto")', correta: false },
        ],
      },
      {
        enunciado: 'O que acontece quando o computador encontra um erro de sintaxe?',
        explicacao: 'Um erro de sintaxe impede a execução do programa, porque o código não respeita as regras da linguagem.',
        alternativas: [
          { texto: 'O programa corre normalmente, ignorando o erro', correta: false },
          { texto: 'O programa não consegue ser executado', correta: true },
          { texto: 'O erro é corrigido automaticamente', correta: false },
          { texto: 'O computador desliga-se', correta: false },
        ],
      },
      {
        enunciado: 'Como se escreve um comentário de uma linha em JavaScript?',
        explicacao: 'Duas barras (`//`) transformam o resto da linha num comentário, que o JavaScript ignora ao executar.',
        alternativas: [
          { texto: '# comentário', correta: false },
          { texto: '<!-- comentário -->', correta: false },
          { texto: '// comentário', correta: true },
          { texto: '** comentário **', correta: false },
        ],
      },
      {
        enunciado: 'Qual é a diferença entre um erro de sintaxe e um erro de lógica?',
        explicacao: 'O erro de sintaxe impede a execução; o erro de lógica deixa o programa correr, mas com um resultado incorreto — por isso é mais difícil de detetar.',
        alternativas: [
          { texto: 'Não há diferença, são o mesmo tipo de erro', correta: false },
          { texto: 'O erro de lógica impede a execução; o de sintaxe não', correta: false },
          { texto: 'O erro de sintaxe impede a execução; o de lógica deixa correr mas com resultado errado', correta: true },
          { texto: 'Erros de lógica só existem em linguagens compiladas', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 2,
    titulo: 'Quiz: Variáveis',
    perguntas: [
      {
        enunciado: 'Qual palavra-chave declara uma variável que NÃO pode ser reatribuída?',
        explicacao: '`const` cria uma ligação constante ao valor — tentar reatribuir gera um erro.',
        alternativas: [
          { texto: 'let', correta: false },
          { texto: 'const', correta: true },
          { texto: 'var', correta: false },
          { texto: 'static', correta: false },
        ],
      },
      {
        enunciado: 'Qual destas é uma declaração de variável válida em JavaScript?',
        explicacao: 'Os nomes de variáveis não podem começar por um número nem conter espaços ou hífens.',
        alternativas: [
          { texto: 'let 1nome = "Ana";', correta: false },
          { texto: 'let nome1 = "Ana";', correta: true },
          { texto: 'let nome-1 = "Ana";', correta: false },
          { texto: 'let nome 1 = "Ana";', correta: false },
        ],
      },
      {
        enunciado: 'Porque é geralmente recomendado evitar `var`?',
        explicacao: '`var` tem regras de escopo mais confusas do que `let`/`const`, o que pode causar bugs difíceis de detetar.',
        alternativas: [
          { texto: 'Porque não existe em JavaScript moderno', correta: false },
          { texto: 'Porque tem um comportamento de escopo que causa bugs mais facilmente', correta: true },
          { texto: 'Porque só funciona com números', correta: false },
          { texto: 'Porque é mais lenta a executar', correta: false },
        ],
      },
      {
        enunciado: 'O que acontece ao correr este código?\n\nconst maximo = 100;\nmaximo = 200;',
        explicacao: 'Reatribuir uma `const` depois de declarada gera sempre um erro em tempo de execução.',
        alternativas: [
          { texto: 'maximo passa a valer 200 sem problema', correta: false },
          { texto: 'Dá erro, porque const não pode ser reatribuída', correta: true },
          { texto: 'maximo passa a valer 300 (soma automática)', correta: false },
          { texto: 'Nada acontece, a linha é ignorada', correta: false },
        ],
      },
      {
        enunciado: 'JavaScript é sensível a maiúsculas/minúsculas nos nomes de variáveis?',
        explicacao: '`idade` e `Idade` são consideradas duas variáveis completamente diferentes em JavaScript.',
        alternativas: [
          { texto: 'Sim, "idade" e "Idade" são variáveis diferentes', correta: true },
          { texto: 'Não, maiúsculas e minúsculas são tratadas da mesma forma', correta: false },
          { texto: 'Só é sensível em nomes de funções, não em variáveis', correta: false },
          { texto: 'Depende da versão do JavaScript', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 3,
    titulo: 'Quiz: Tipos de Dados',
    perguntas: [
      {
        enunciado: 'Qual o resultado de `typeof 42`?',
        explicacao: 'Todo o número em JavaScript, inteiro ou decimal, é do tipo "number".',
        alternativas: [
          { texto: '"number"', correta: true },
          { texto: '"integer"', correta: false },
          { texto: '"int"', correta: false },
          { texto: '"float"', correta: false },
        ],
      },
      {
        enunciado: 'Qual destas formas permite inserir uma variável diretamente dentro de um texto?',
        explicacao: 'As template strings, delimitadas por crases (` `), permitem usar `${variavel}` para inserir valores diretamente.',
        alternativas: [
          { texto: '"Olá, " + nome + "!"', correta: false },
          { texto: '`Olá, ${nome}!`', correta: true },
          { texto: "'Olá, ' . nome . '!'", correta: false },
          { texto: 'Todas as anteriores funcionam da mesma forma', correta: false },
        ],
      },
      {
        enunciado: 'Qual é o resultado de `"5" + 3` em JavaScript?',
        explicacao: 'Quando um dos operandos é string, o operador `+` concatena em vez de somar, resultando em "53".',
        alternativas: [
          { texto: '8', correta: false },
          { texto: '"53"', correta: true },
          { texto: 'Erro', correta: false },
          { texto: 'undefined', correta: false },
        ],
      },
      {
        enunciado: 'Qual a diferença principal entre `undefined` e `null`?',
        explicacao: '`undefined` significa que uma variável existe mas ainda não recebeu valor; `null` é atribuído intencionalmente para representar "sem valor".',
        alternativas: [
          { texto: 'Não há diferença nenhuma', correta: false },
          { texto: 'undefined é uma variável sem valor atribuído; null é atribuído intencionalmente', correta: true },
          { texto: 'null só existe em arrays', correta: false },
          { texto: 'undefined só existe em objetos', correta: false },
        ],
      },
      {
        enunciado: 'Como converter a string "25" para o número 25?',
        explicacao: '`Number()` converte um valor para o tipo number, quando isso é possível.',
        alternativas: [
          { texto: 'String("25")', correta: false },
          { texto: 'Number("25")', correta: true },
          { texto: 'Boolean("25")', correta: false },
          { texto: 'typeof("25")', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 4,
    titulo: 'Quiz: Operadores',
    perguntas: [
      {
        enunciado: 'Qual o resultado de `10 % 3`?',
        explicacao: 'O operador `%` devolve o resto da divisão: 10 dividido por 3 dá 3 com resto 1.',
        alternativas: [
          { texto: '3', correta: false },
          { texto: '3.33', correta: false },
          { texto: '1', correta: true },
          { texto: '0', correta: false },
        ],
      },
      {
        enunciado: 'Qual a diferença entre `==` e `===`?',
        explicacao: '`===` compara valor e tipo sem converter; `==` converte tipos antes de comparar, o que pode gerar resultados inesperados.',
        alternativas: [
          { texto: 'Não há diferença, são idênticos', correta: false },
          { texto: '=== compara valor e tipo; == converte tipos antes de comparar', correta: true },
          { texto: '== só funciona com números', correta: false },
          { texto: '=== é mais lento a executar', correta: false },
        ],
      },
      {
        enunciado: 'Qual é o resultado de `pontos += 5` se `pontos` valia 10?',
        explicacao: '`+=` é um atalho para `pontos = pontos + 5`, logo o novo valor é 15.',
        alternativas: [
          { texto: '5', correta: false },
          { texto: '10', correta: false },
          { texto: '15', correta: true },
          { texto: '50', correta: false },
        ],
      },
      {
        enunciado: 'Qual operador lógico exige que AMBAS as condições sejam verdadeiras?',
        explicacao: 'O operador `&&` (E lógico) só resulta em `true` se as duas condições forem verdadeiras.',
        alternativas: [
          { texto: '||', correta: false },
          { texto: '&&', correta: true },
          { texto: '!', correta: false },
          { texto: '==', correta: false },
        ],
      },
      {
        enunciado: 'Por que motivo se recomenda usar `===` em vez de `==`?',
        explicacao: 'Usar `===` evita conversões de tipo implícitas que podem levar a comparações incorretas, como `5 == "5"` ser `true`.',
        alternativas: [
          { texto: 'Porque == não existe em JavaScript moderno', correta: false },
          { texto: 'Porque === evita conversões de tipo inesperadas', correta: true },
          { texto: 'Porque === é obrigatório para números', correta: false },
          { texto: 'Não há motivo real, é só preferência estética', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 5,
    titulo: 'Quiz: Estruturas Condicionais',
    perguntas: [
      {
        enunciado: 'Qual instrução testa uma condição e executa código apenas se ela for verdadeira?',
        explicacao: '`if` é a estrutura base de decisão em JavaScript.',
        alternativas: [
          { texto: 'loop', correta: false },
          { texto: 'if', correta: true },
          { texto: 'function', correta: false },
          { texto: 'const', correta: false },
        ],
      },
      {
        enunciado: 'Num bloco `if / else if / else`, quantos blocos podem ser executados?',
        explicacao: 'Apenas o primeiro bloco cuja condição for verdadeira é executado; os restantes são ignorados.',
        alternativas: [
          { texto: 'Todos os blocos cuja condição seja verdadeira', correta: false },
          { texto: 'Apenas o primeiro bloco cuja condição for verdadeira', correta: true },
          { texto: 'Sempre todos os blocos, um a seguir ao outro', correta: false },
          { texto: 'Nenhum, é preciso um switch para isso', correta: false },
        ],
      },
      {
        enunciado: 'No `switch`, o que acontece se esqueceres o `break` num `case`?',
        explicacao: 'Sem `break`, a execução continua para o próximo `case`, mesmo que a condição desse case não se verifique.',
        alternativas: [
          { texto: 'Nada, o switch para automaticamente', correta: false },
          { texto: 'O código "cai" e executa também o case seguinte', correta: true },
          { texto: 'Dá sempre um erro de sintaxe', correta: false },
          { texto: 'O switch ignora esse case inteiro', correta: false },
        ],
      },
      {
        enunciado: 'Qual o resultado de `if (idade >= 18 && temCarta)` se `idade = 20` e `temCarta = false`?',
        explicacao: 'Como `&&` exige que ambas as condições sejam verdadeiras, e `temCarta` é `false`, o bloco `if` não é executado.',
        alternativas: [
          { texto: 'O bloco if é executado', correta: false },
          { texto: 'O bloco if não é executado', correta: true },
          { texto: 'Dá um erro', correta: false },
          { texto: 'Depende da ordem das variáveis', correta: false },
        ],
      },
      {
        enunciado: 'Quando é preferível usar `switch` em vez de vários `else if`?',
        explicacao: '`switch` costuma ser mais legível quando se compara a mesma variável com muitos valores possíveis distintos.',
        alternativas: [
          { texto: 'Quando há apenas duas opções possíveis', correta: false },
          { texto: 'Quando se compara a mesma variável com muitos valores diferentes', correta: true },
          { texto: 'Nunca, else if é sempre melhor', correta: false },
          { texto: 'Só quando se trabalha com números decimais', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 6,
    titulo: 'Quiz: Loops',
    perguntas: [
      {
        enunciado: 'Quantas vezes este ciclo executa?\n\nfor (let i = 0; i < 5; i++) { ... }',
        explicacao: 'O ciclo começa em 0 e repete enquanto i < 5, logo executa para i = 0,1,2,3,4 — um total de 5 vezes.',
        alternativas: [
          { texto: '4 vezes', correta: false },
          { texto: '5 vezes', correta: true },
          { texto: '6 vezes', correta: false },
          { texto: 'Infinitas vezes', correta: false },
        ],
      },
      {
        enunciado: 'Qual a principal diferença entre `while` e `do...while`?',
        explicacao: '`do...while` executa o bloco pelo menos uma vez antes de verificar a condição; `while` verifica a condição antes de executar.',
        alternativas: [
          { texto: 'Não há diferença nenhuma', correta: false },
          { texto: 'do...while executa pelo menos uma vez, mesmo que a condição seja falsa', correta: true },
          { texto: 'while só funciona com arrays', correta: false },
          { texto: 'do...while não permite usar break', correta: false },
        ],
      },
      {
        enunciado: 'O que causa um "loop infinito"?',
        explicacao: 'Se a condição do ciclo nunca se tornar falsa (por exemplo, esquecer de atualizar a variável de controlo), o ciclo nunca para.',
        alternativas: [
          { texto: 'Usar for em vez de while', correta: false },
          { texto: 'A condição do ciclo nunca se tornar falsa', correta: true },
          { texto: 'Usar console.log dentro do ciclo', correta: false },
          { texto: 'Percorrer um array vazio', correta: false },
        ],
      },
      {
        enunciado: 'O que faz a instrução `break` dentro de um ciclo?',
        explicacao: '`break` interrompe imediatamente o ciclo, saltando para o código a seguir a ele.',
        alternativas: [
          { texto: 'Salta para a próxima iteração', correta: false },
          { texto: 'Termina o ciclo imediatamente', correta: true },
          { texto: 'Reinicia o ciclo do zero', correta: false },
          { texto: 'Não tem nenhum efeito', correta: false },
        ],
      },
      {
        enunciado: 'O que faz a instrução `continue` dentro de um ciclo?',
        explicacao: '`continue` salta o resto do código dessa iteração e avança diretamente para a próxima.',
        alternativas: [
          { texto: 'Termina o ciclo por completo', correta: false },
          { texto: 'Salta para a próxima iteração, ignorando o resto do código atual', correta: true },
          { texto: 'Reinicia a variável de controlo', correta: false },
          { texto: 'Só funciona dentro de um switch', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 7,
    titulo: 'Quiz: Funções',
    perguntas: [
      {
        enunciado: 'O que é um "parâmetro" numa função?',
        explicacao: 'Um parâmetro é o nome usado dentro da declaração da função para representar um valor que ela vai receber.',
        alternativas: [
          { texto: 'O valor devolvido pela função', correta: false },
          { texto: 'Um nome que representa um valor que a função vai receber', correta: true },
          { texto: 'O nome da própria função', correta: false },
          { texto: 'Um erro dentro da função', correta: false },
        ],
      },
      {
        enunciado: 'O que acontece a uma função sem instrução `return`?',
        explicacao: 'Sem `return`, uma função executa o seu código mas devolve sempre `undefined`.',
        alternativas: [
          { texto: 'Dá sempre erro', correta: false },
          { texto: 'Devolve undefined', correta: true },
          { texto: 'Devolve automaticamente 0', correta: false },
          { texto: 'Não pode ser chamada', correta: false },
        ],
      },
      {
        enunciado: 'Qual destas é uma "arrow function" válida que soma dois números?',
        explicacao: 'As arrow functions usam `=>` e podem omitir chavetas e `return` quando o corpo é uma única expressão.',
        alternativas: [
          { texto: 'const somar = (a, b) -> a + b;', correta: false },
          { texto: 'const somar = (a, b) => a + b;', correta: true },
          { texto: 'function somar(a, b) -> return a + b;', correta: false },
          { texto: 'arrow somar(a, b) { a + b }', correta: false },
        ],
      },
      {
        enunciado: 'Qual é o valor de `nome` ao chamar `saudar()` se a função for `function saudar(nome = "visitante") {...}`?',
        explicacao: 'Quando nenhum argumento é passado, o parâmetro assume o valor por omissão definido na declaração.',
        alternativas: [
          { texto: 'undefined', correta: false },
          { texto: '"visitante"', correta: true },
          { texto: 'null', correta: false },
          { texto: 'Dá erro por falta de argumento', correta: false },
        ],
      },
      {
        enunciado: 'Qual é uma vantagem principal de usar funções?',
        explicacao: 'Funções evitam repetir o mesmo código várias vezes, tornando o programa mais organizado e fácil de manter.',
        alternativas: [
          { texto: 'Tornam o programa mais lento de propósito', correta: false },
          { texto: 'Evitam repetição de código e facilitam a organização', correta: true },
          { texto: 'São obrigatórias em todas as linguagens', correta: false },
          { texto: 'Substituem a necessidade de variáveis', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 8,
    titulo: 'Quiz: Arrays',
    perguntas: [
      {
        enunciado: 'Qual é o índice do primeiro elemento de um array em JavaScript?',
        explicacao: 'Os arrays em JavaScript são indexados a partir de 0, não de 1.',
        alternativas: [
          { texto: '1', correta: false },
          { texto: '0', correta: true },
          { texto: '-1', correta: false },
          { texto: 'Depende do array', correta: false },
        ],
      },
      {
        enunciado: 'Qual método adiciona um elemento ao FIM de um array?',
        explicacao: '`push()` adiciona um ou mais elementos ao final do array.',
        alternativas: [
          { texto: 'push()', correta: true },
          { texto: 'pop()', correta: false },
          { texto: 'shift()', correta: false },
          { texto: 'unshift()', correta: false },
        ],
      },
      {
        enunciado: 'O que devolve `numeros.map((n) => n * 2)` para `numeros = [1, 2, 3]`?',
        explicacao: '`map` aplica a função a cada elemento e devolve um novo array com os resultados, sem alterar o original.',
        alternativas: [
          { texto: '[1, 2, 3]', correta: false },
          { texto: '[2, 4, 6]', correta: true },
          { texto: '6', correta: false },
          { texto: 'undefined', correta: false },
        ],
      },
      {
        enunciado: 'Qual método cria um novo array apenas com os elementos que cumprem uma condição?',
        explicacao: '`filter` percorre o array e devolve um novo array só com os elementos para os quais a função passada devolve `true`.',
        alternativas: [
          { texto: 'map()', correta: false },
          { texto: 'forEach()', correta: false },
          { texto: 'filter()', correta: true },
          { texto: 'push()', correta: false },
        ],
      },
      {
        enunciado: 'O que devolve `frutas.length` se `frutas = ["maçã", "pera"]`?',
        explicacao: '`length` devolve o número de elementos existentes no array, neste caso 2.',
        alternativas: [
          { texto: '"maçã,pera"', correta: false },
          { texto: '1', correta: false },
          { texto: '2', correta: true },
          { texto: 'undefined', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 9,
    titulo: 'Quiz: Objetos',
    perguntas: [
      {
        enunciado: 'Como se organiza a informação dentro de um objeto em JavaScript?',
        explicacao: 'Um objeto organiza dados em pares chave: valor, ao contrário de um array que usa posições/índices.',
        alternativas: [
          { texto: 'Em pares chave: valor', correta: true },
          { texto: 'Só por posição, como um array', correta: false },
          { texto: 'Só pode guardar números', correta: false },
          { texto: 'Em linhas e colunas, como uma tabela', correta: false },
        ],
      },
      {
        enunciado: 'Dado `const pessoa = { nome: "Rui" };`, como acedemos ao nome?',
        explicacao: 'A notação de ponto (`objeto.propriedade`) é a forma mais comum de aceder a uma propriedade de um objeto.',
        alternativas: [
          { texto: 'pessoa->nome', correta: false },
          { texto: 'pessoa.nome', correta: true },
          { texto: 'pessoa(nome)', correta: false },
          { texto: 'pessoa::nome', correta: false },
        ],
      },
      {
        enunciado: 'Quando é preferível usar a notação de parênteses retos (`objeto["propriedade"]`) em vez de ponto?',
        explicacao: 'A notação de parênteses retos é necessária quando o nome da propriedade está guardado numa variável.',
        alternativas: [
          { texto: 'Nunca, a notação de ponto serve sempre para tudo', correta: false },
          { texto: 'Quando o nome da propriedade está guardado numa variável', correta: true },
          { texto: 'Só funciona com números', correta: false },
          { texto: 'É apenas uma questão de estilo, sem diferença funcional', correta: false },
        ],
      },
      {
        enunciado: 'Dentro de um método de um objeto, a que se refere a palavra `this`?',
        explicacao: '`this`, usado dentro de um método, refere-se ao próprio objeto onde esse método está definido.',
        alternativas: [
          { texto: 'Ao objeto onde o método está definido', correta: true },
          { texto: 'À função global do programa', correta: false },
          { texto: 'A um array vazio por omissão', correta: false },
          { texto: 'Nunca é usado dentro de objetos', correta: false },
        ],
      },
      {
        enunciado: 'Como se remove uma propriedade de um objeto?',
        explicacao: 'A palavra-chave `delete` remove uma propriedade específica de um objeto.',
        alternativas: [
          { texto: 'objeto.remove("propriedade")', correta: false },
          { texto: 'delete objeto.propriedade', correta: true },
          { texto: 'objeto.propriedade = remove', correta: false },
          { texto: 'Não é possível remover propriedades', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 10,
    titulo: 'Quiz: Manipulação do DOM',
    perguntas: [
      {
        enunciado: 'O que significa a sigla DOM?',
        explicacao: 'DOM significa "Document Object Model" — a representação de uma página HTML como uma árvore de objetos que o JavaScript pode manipular.',
        alternativas: [
          { texto: 'Document Object Model', correta: true },
          { texto: 'Data Output Manager', correta: false },
          { texto: 'Dynamic Order Method', correta: false },
          { texto: 'Design Object Mode', correta: false },
        ],
      },
      {
        enunciado: 'Qual método seleciona o primeiro elemento que corresponde a um seletor CSS?',
        explicacao: '`document.querySelector()` aceita a mesma sintaxe de seletores CSS (id, classe, tag) e devolve o primeiro elemento correspondente.',
        alternativas: [
          { texto: 'document.select()', correta: false },
          { texto: 'document.querySelector()', correta: true },
          { texto: 'document.find()', correta: false },
          { texto: 'document.get()', correta: false },
        ],
      },
      {
        enunciado: 'Qual método regista uma função para correr quando um elemento é clicado?',
        explicacao: '`addEventListener("click", funcao)` associa uma função a um evento, como o clique num botão.',
        alternativas: [
          { texto: 'element.onClick(funcao)', correta: false },
          { texto: 'element.addEventListener("click", funcao)', correta: true },
          { texto: 'element.click = funcao', correta: false },
          { texto: 'element.whenClicked(funcao)', correta: false },
        ],
      },
      {
        enunciado: 'Qual a diferença entre `textContent` e `innerHTML`?',
        explicacao: '`textContent` trata tudo como texto simples; `innerHTML` interpreta o conteúdo como HTML, permitindo inserir tags.',
        alternativas: [
          { texto: 'Não há diferença, são idênticos', correta: false },
          { texto: 'textContent insere apenas texto; innerHTML interpreta HTML', correta: true },
          { texto: 'innerHTML só funciona em formulários', correta: false },
          { texto: 'textContent é mais lento que innerHTML', correta: false },
        ],
      },
      {
        enunciado: 'Qual método cria um novo elemento HTML dinamicamente com JavaScript?',
        explicacao: '`document.createElement("tag")` cria um novo elemento na memória, que depois pode ser inserido na página com `appendChild`.',
        alternativas: [
          { texto: 'document.newElement()', correta: false },
          { texto: 'document.createElement()', correta: true },
          { texto: 'document.addElement()', correta: false },
          { texto: 'document.makeElement()', correta: false },
        ],
      },
    ],
  },
];

async function main() {
  const conn = await pool.getConnection();
  try {
    console.log('A atualizar conteúdo dos módulos...');
    for (const modulo of modulos) {
      await conn.query('UPDATE modulos SET conteudo = ? WHERE ordem = ?', [
        modulo.conteudo,
        modulo.ordem,
      ]);
    }

    console.log('A recriar quizzes com 5-6 perguntas cada...');
    for (const quiz of quizzes) {
      const [[moduloRow]] = await conn.query('SELECT id FROM modulos WHERE ordem = ?', [
        quiz.moduloOrdem,
      ]);
      if (!moduloRow) {
        console.warn(`Módulo com ordem ${quiz.moduloOrdem} não encontrado, a saltar.`);
        continue;
      }
      const moduloId = moduloRow.id;

      // Remove quiz(zes) antigo(s) deste módulo (cascata apaga perguntas/alternativas)
      await conn.query('DELETE FROM quizzes WHERE modulo_id = ?', [moduloId]);

      const [quizResult] = await conn.query(
        'INSERT INTO quizzes (modulo_id, titulo) VALUES (?, ?)',
        [moduloId, quiz.titulo]
      );
      const quizId = quizResult.insertId;

      let ordemPergunta = 1;
      for (const pergunta of quiz.perguntas) {
        const [perguntaResult] = await conn.query(
          'INSERT INTO perguntas (quiz_id, enunciado, explicacao, ordem) VALUES (?, ?, ?, ?)',
          [quizId, pergunta.enunciado, pergunta.explicacao, ordemPergunta++]
        );
        const perguntaId = perguntaResult.insertId;

        for (const alt of pergunta.alternativas) {
          await conn.query(
            'INSERT INTO alternativas (pergunta_id, texto, correta) VALUES (?, ?, ?)',
            [perguntaId, alt.texto, alt.correta]
          );
        }
      }
      console.log(`  ✓ ${quiz.titulo} (${quiz.perguntas.length} perguntas)`);
    }

    console.log('Concluído com sucesso.');
  } finally {
    conn.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error('Erro ao popular conteúdo:', err);
  process.exit(1);
});
