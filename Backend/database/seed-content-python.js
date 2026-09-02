// ============================================================
// Script de seed de conteúdo PYTHON: cria/atualiza 10 módulos de
// Python (mesma profundidade dos módulos de JavaScript) e os
// respetivos quizzes de 5 perguntas cada.
//
// Corre com: node database/seed-content-python.js
// Idempotente: pode ser corrido várias vezes sem duplicar módulos
// nem quizzes (identifica módulos existentes por título+linguagem).
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

const LINGUAGEM = 'Python';

// ------------------------------------------------------------
// Módulos (ordem 1 a 10, dentro da linguagem Python)
// ------------------------------------------------------------
const modulos = [
  {
    ordem: 1,
    titulo: 'Introdução ao Python',
    descricao: 'O que é o Python e como executar o teu primeiro programa.',
    conteudo: `# Introdução ao Python

Python é uma linguagem de programação criada para ser legível e simples de escrever, sem perder poder. É uma das linguagens mais usadas do mundo, tanto para iniciantes como em áreas como ciência de dados, automação e desenvolvimento web.

## Uma diferença importante logo de início

Ao contrário do JavaScript, o Python **não usa chavetas \`{}\`** para delimitar blocos de código — usa **indentação** (espaços no início da linha). Isto obriga o código a ficar sempre organizado visualmente:

\`\`\`python
if 5 > 3:
    print("Cinco é maior que três")
    print("Esta linha também está dentro do if")
print("Esta já não está")
\`\`\`

Todas as linhas dentro do mesmo bloco têm de ter a **mesma indentação** (o padrão são 4 espaços). Misturar indentações diferentes causa erros.

## O teu primeiro programa

\`\`\`python
print("Olá, CodeQuest!")
\`\`\`

\`print()\` é a função que escreve texto na consola — o equivalente ao \`console.log()\` do JavaScript.

## Comentários

\`\`\`python
# Isto é um comentário de uma linha
print("Isto é executado")  # isto também é um comentário

"""
Isto é um comentário
de várias linhas
(tecnicamente é uma string, mas é usado assim por convenção)
"""
\`\`\`

## Python é interpretado

O Python não precisa de ser compilado antes de correr — um interpretador lê e executa o código linha a linha. Isto torna o ciclo de escrever/testar código muito rápido, mas também significa que só descobres um erro numa linha quando o programa a tenta executar.

## Exercício proposto

Escreve um programa em Python que mostre, em três linhas separadas com \`print()\`, o teu nome, a tua idade e a linguagem que estás a aprender. Usa pelo menos um comentário a explicar o que o código faz.`,
  },
  {
    ordem: 2,
    titulo: 'Variáveis em Python',
    descricao: 'Como guardar e manipular dados em Python.',
    conteudo: `# Variáveis em Python

Uma variável é um nome que aponta para um valor guardado na memória. Em Python, criar uma variável é tão simples como atribuir-lhe um valor — não é preciso declarar o tipo nem usar palavras-chave como \`let\` ou \`const\`.

## Criar variáveis

\`\`\`python
idade = 25
nome = "Ana"
preco = 9.99
\`\`\`

Ao contrário do JavaScript, o Python **não distingue** \`let\`/\`const\`/\`var\` — todas as variáveis podem ser reatribuídas por omissão:

\`\`\`python
pontos = 0
pontos = 10        # válido, reatribuição normal
pontos = pontos + 5  # agora pontos vale 15
\`\`\`

## Constantes (por convenção)

Python não tem uma forma nativa de impedir a reatribuição de uma variável. Por convenção, escreve-se o nome todo em maiúsculas para sinalizar "isto não devia mudar":

\`\`\`python
IDADE_MINIMA = 18  # continua a poder ser alterada, mas o nome avisa que não devia
\`\`\`

## Atribuição múltipla

Uma conveniência do Python que o JavaScript não tem diretamente:

\`\`\`python
x, y, z = 1, 2, 3
print(x, y, z)  # 1 2 3

a = b = 0  # ambas as variáveis ficam com o valor 0
\`\`\`

## Regras para nomes de variáveis

- Não podem começar por um número (\`1nome\` é inválido, \`nome1\` é válido).
- Usam-se letras, números e underscore (\`_\`) — a convenção em Python é \`snake_case\` (\`nome_completo\`), ao contrário do \`camelCase\` do JavaScript.
- São sensíveis a maiúsculas/minúsculas: \`idade\` e \`Idade\` são variáveis diferentes.

## Exercício proposto

Cria três variáveis: uma com o teu nome, uma com a tua pontuação atual num jogo (começa em 0) e outra com o número de vidas (começa em 3). Depois, simula perder uma vida e ganhar 50 pontos, atualizando as variáveis, e mostra o resultado final com \`print()\`.`,
  },
  {
    ordem: 3,
    titulo: 'Tipos de Dados em Python',
    descricao: 'Números, strings, booleanos e outros tipos em Python.',
    conteudo: `# Tipos de Dados em Python

Todo o valor em Python tem um tipo, e o Python consegue adivinhar automaticamente qual é (chama-se a isto **tipagem dinâmica**).

## int e float (números)

\`\`\`python
inteiro = 42        # int
decimal = 3.14      # float
negativo = -7       # int
\`\`\`

Ao contrário do JavaScript (que trata tudo como \`number\`), o Python distingue \`int\` (inteiro) de \`float\` (decimal).

## str (texto)

\`\`\`python
nome = "Diogo"
saudacao = 'Olá!'
mensagem = f"Olá, {nome}!"  # f-string: insere variáveis com {}
\`\`\`

As **f-strings** (com um \`f\` antes das aspas) são o equivalente às template strings do JavaScript.

## bool (verdadeiro/falso)

\`\`\`python
esta_logado = True   # começa sempre com maiúscula em Python!
tem_erros = False
\`\`\`

## None (o equivalente a null/undefined)

\`\`\`python
resultado = None  # representa "sem valor", como null em JavaScript
\`\`\`

Python não distingue \`undefined\` de \`null\` como o JavaScript — só existe \`None\`.

## Verificar o tipo de um valor

\`\`\`python
print(type(42))          # <class 'int'>
print(type("Ana"))       # <class 'str'>
print(type(True))        # <class 'bool'>
print(type(None))        # <class 'NoneType'>
\`\`\`

## Conversão entre tipos

\`\`\`python
texto_idade = "25"
idade = int(texto_idade)     # 25 (int)
texto = str(idade)            # "25" (str)

print("5" + "3")   # "53" (concatena, porque ambos são strings)
print(int("5") + 3)  # 8 (soma, porque converteu para número)
\`\`\`

Nota: ao contrário do JavaScript, o Python **dá erro** se tentares somar um \`int\` com uma \`str\` diretamente (\`5 + "3"\` falha) — tens sempre de converter primeiro.

## Exercício proposto

Cria uma variável \`str\` com o valor \`"10"\` e uma variável \`int\` com o valor \`5\`. Tenta somá-las diretamente com \`+\` (repara no erro), depois converte a string para \`int\` com \`int()\` e soma outra vez, comparando os dois comportamentos.`,
  },
  {
    ordem: 4,
    titulo: 'Operadores em Python',
    descricao: 'Operadores aritméticos, de comparação e lógicos em Python.',
    conteudo: `# Operadores em Python

## Operadores aritméticos

\`\`\`python
print(10 + 3)   # 13 (soma)
print(10 - 3)   # 7  (subtração)
print(10 * 3)   # 30 (multiplicação)
print(10 / 3)   # 3.3333... (divisão, resultado sempre float)
print(10 // 3)  # 3  (divisão inteira, arredonda para baixo)
print(10 % 3)   # 1  (resto da divisão, "módulo")
print(10 ** 2)  # 100 (potência)
\`\`\`

Repara no \`//\` (divisão inteira) — não existe em JavaScript e é muito usado em Python. O operador \`%\` funciona da mesma forma que em JavaScript, muito usado para saber se um número é par: \`numero % 2 == 0\`.

## Operadores de atribuição

\`\`\`python
pontos = 10
pontos += 5   # equivale a: pontos = pontos + 5  -> 15
pontos -= 2   # pontos = pontos - 2 -> 13
pontos *= 2   # pontos = pontos * 2 -> 26
\`\`\`

## Operadores de comparação

\`\`\`python
print(5 == "5")   # False (Python NÃO converte tipos automaticamente)
print(5 == 5)     # True
print(5 != 3)     # True
print(10 > 5)     # True
print(10 <= 10)   # True
\`\`\`

Uma diferença importante: em Python, **não existe** \`===\`/\`!==\` como no JavaScript — o \`==\` já compara sempre valor e tipo, sem conversões escondidas. Isto torna o Python mais previsível nesta parte.

## Operadores lógicos

Em Python, os operadores lógicos escrevem-se por extenso, em inglês, em vez de símbolos:

\`\`\`python
tem_conta = True
tem_saldo = False

print(tem_conta and tem_saldo)  # False (E: as duas têm de ser True)
print(tem_conta or tem_saldo)   # True  (OU: basta uma ser True)
print(not tem_conta)            # False (NÃO: inverte o valor)
\`\`\`

## Exercício proposto

Escreve código que declare um número numa variável e use o operador \`%\` para mostrar (com \`print\`) se esse número é par ou ímpar. Testa também a divisão inteira \`//\` com dois números diferentes e compara o resultado com a divisão normal \`/\`.`,
  },
  {
    ordem: 5,
    titulo: 'Condicionais em Python',
    descricao: 'if, elif e else para tomar decisões no código.',
    conteudo: `# Condicionais em Python

## if / else

\`\`\`python
idade = 16

if idade >= 18:
    print("És maior de idade.")
else:
    print("És menor de idade.")
\`\`\`

Repara: não há chavetas \`{}\` — o bloco é definido pela indentação, e a linha do \`if\` termina em dois pontos (\`:\`).

## elif — várias condições

Em Python, "senão se" escreve-se \`elif\` (não \`else if\`):

\`\`\`python
nota = 14

if nota >= 18:
    print("Excelente")
elif nota >= 14:
    print("Bom")
elif nota >= 10:
    print("Suficiente")
else:
    print("Reprovado")
\`\`\`

As condições são verificadas por ordem, de cima para baixo, e só o primeiro bloco cuja condição é verdadeira é executado.

## Condições combinadas

\`\`\`python
idade = 20
tem_carta = True

if idade >= 18 and tem_carta:
    print("Pode conduzir.")
\`\`\`

## Python não tem switch

O Python (nas versões mais usadas em contexto de aprendizagem) não tem uma instrução \`switch\` tradicional — usa-se uma sequência de \`if/elif\` em alternativa:

\`\`\`python
dia_semana = 3

if dia_semana == 1:
    print("Segunda-feira")
elif dia_semana == 2:
    print("Terça-feira")
elif dia_semana == 3:
    print("Quarta-feira")
else:
    print("Outro dia")
\`\`\`

## Expressão condicional numa linha

Uma forma compacta de escrever um if/else simples, muito usada em Python:

\`\`\`python
idade = 20
estado = "adulto" if idade >= 18 else "menor"
print(estado)  # "adulto"
\`\`\`

## Exercício proposto

Escreve um programa que declare uma variável \`nota\` (0 a 20) e use \`if/elif/else\` para mostrar "Aprovado" se a nota for maior ou igual a 10, e "Reprovado" caso contrário. Testa o teu código com pelo menos três valores diferentes de nota.`,
  },
  {
    ordem: 6,
    titulo: 'Loops em Python',
    descricao: 'for e while para repetir código em Python.',
    conteudo: `# Loops em Python

## for — percorrer uma sequência

Ao contrário do JavaScript, o \`for\` do Python não tem inicialização/condição/incremento — percorre diretamente uma sequência de valores, muitas vezes gerada com \`range()\`:

\`\`\`python
for i in range(5):
    print("Iteração número", i)
# Mostra: 0, 1, 2, 3, 4
\`\`\`

\`range(5)\` gera os números de 0 a 4. \`range(2, 8)\` gera de 2 a 7, e \`range(0, 10, 2)\` gera de 2 em 2 (0, 2, 4, 6, 8).

## while — repete enquanto uma condição for verdadeira

\`\`\`python
tentativas = 0

while tentativas < 3:
    print("Tentativa", tentativas)
    tentativas += 1
\`\`\`

**Cuidado com loops infinitos**: se te esqueceres de atualizar a condição (\`tentativas += 1\`), o ciclo nunca para.

## Python não tem do...while

Não existe uma instrução \`do...while\` nativa em Python. Para simular "executa pelo menos uma vez", usa-se um \`while True\` com um \`break\` condicional:

\`\`\`python
import random

while True:
    numero = random.randint(1, 10)
    print("Número gerado:", numero)
    if numero == 7:
        break
\`\`\`

## Percorrer uma lista diretamente

\`\`\`python
nomes = ["Ana", "Bruno", "Carla"]

for nome in nomes:
    print(nome)
\`\`\`

Não precisas de índices para percorrer uma lista — o \`for ... in\` dá-te diretamente cada elemento.

## break e continue

\`\`\`python
for i in range(10):
    if i == 5:
        break       # sai do ciclo imediatamente
    if i % 2 == 0:
        continue    # salta para a próxima iteração
    print(i)  # mostra só 1 e 3
\`\`\`

## Exercício proposto

Usa um ciclo \`for\` com \`range()\` para mostrar todos os números de 1 a 20, mas usa \`continue\` para saltar os múltiplos de 3.`,
  },
  {
    ordem: 7,
    titulo: 'Funções em Python',
    descricao: 'Como criar e reutilizar blocos de código em Python.',
    conteudo: `# Funções em Python

Uma função é um bloco de código reutilizável, definido em Python com a palavra-chave \`def\`.

## Definir e chamar uma função

\`\`\`python
def saudar(nome):
    print("Olá, " + nome + "!")

saudar("Marta")  # "Olá, Marta!"
saudar("Rui")    # "Olá, Rui!"
\`\`\`

\`nome\` é um **parâmetro**. Quando chamamos \`saudar("Marta")\`, \`"Marta"\` é o **argumento**.

## Funções que devolvem valores

\`\`\`python
def somar(a, b):
    return a + b

resultado = somar(3, 4)  # resultado vale 7
print(resultado)
\`\`\`

Sem \`return\`, uma função em Python devolve \`None\` (o equivalente ao \`undefined\` do JavaScript).

## Parâmetros com valor por omissão

\`\`\`python
def saudar(nome="visitante"):
    print("Olá,", nome)

saudar()        # "Olá, visitante"
saudar("Ana")   # "Olá, Ana"
\`\`\`

## Argumentos por nome (keyword arguments)

Uma funcionalidade do Python sem equivalente direto no JavaScript: podes passar argumentos indicando o nome do parâmetro, em qualquer ordem:

\`\`\`python
def apresentar(nome, idade):
    print(f"{nome} tem {idade} anos")

apresentar(idade=30, nome="Sofia")  # "Sofia tem 30 anos"
\`\`\`

## Funções lambda (equivalente às arrow functions)

\`\`\`python
somar = lambda a, b: a + b
dobro = lambda n: n * 2

print(somar(2, 3))  # 5
print(dobro(4))     # 8
\`\`\`

Uma \`lambda\` só pode ter uma expressão (sem várias linhas de lógica) — para funções mais complexas, usa-se sempre \`def\`.

## Exercício proposto

Escreve uma função \`calcular_media(nota1, nota2, nota3)\` que devolva a média das três notas. Chama a função com valores diferentes e mostra o resultado com \`print()\`.`,
  },
  {
    ordem: 8,
    titulo: 'Listas em Python',
    descricao: 'O equivalente Python aos arrays: listas ordenadas de valores.',
    conteudo: `# Listas em Python

Uma lista (\`list\`) é o equivalente Python a um array — uma coleção ordenada de valores.

## Criar e aceder a uma lista

\`\`\`python
frutas = ["maçã", "banana", "pera"]

print(frutas[0])       # "maçã" (o primeiro índice é sempre 0)
print(frutas[2])       # "pera"
print(frutas[-1])      # "pera" (índice negativo conta a partir do fim!)
print(len(frutas))     # 3 (número de elementos)
\`\`\`

Os índices negativos são uma conveniência do Python que o JavaScript não tem diretamente: \`-1\` é sempre o último elemento.

## Adicionar e remover elementos

\`\`\`python
numeros = [1, 2, 3]

numeros.append(4)     # adiciona no fim: [1, 2, 3, 4]
numeros.pop()          # remove e devolve o último: [1, 2, 3]
numeros.insert(0, 0)   # insere na posição 0: [0, 1, 2, 3]
numeros.remove(2)      # remove o VALOR 2 (não o índice): [0, 1, 3]
\`\`\`

## Percorrer uma lista

\`\`\`python
cores = ["vermelho", "verde", "azul"]

for cor in cores:
    print(cor)
\`\`\`

## Transformar uma lista (equivalente ao map)

\`\`\`python
numeros = [1, 2, 3, 4]
dobros = [n * 2 for n in numeros]  # "list comprehension"

print(dobros)  # [2, 4, 6, 8]
\`\`\`

As **list comprehensions** são a forma mais comum, em Python, de transformar uma lista noutra — equivalem ao \`.map()\` do JavaScript, mas com uma sintaxe própria.

## Filtrar uma lista (equivalente ao filter)

\`\`\`python
idades = [12, 18, 25, 16, 30]
adultos = [idade for idade in idades if idade >= 18]

print(adultos)  # [18, 25, 30]
\`\`\`

## Fatiar uma lista (slicing)

\`\`\`python
numeros = [0, 1, 2, 3, 4, 5]
print(numeros[1:4])   # [1, 2, 3] (do índice 1 até ao 3, sem incluir o 4)
print(numeros[:3])    # [0, 1, 2] (do início até ao índice 2)
print(numeros[3:])    # [3, 4, 5] (do índice 3 até ao fim)
\`\`\`

## Exercício proposto

Cria uma lista com as notas de 5 alunos. Usa uma list comprehension para criar uma nova lista só com as notas de aprovado (\`>= 10\`), e percorre-a com um \`for\` para mostrar cada uma.`,
  },
  {
    ordem: 9,
    titulo: 'Dicionários em Python',
    descricao: 'O equivalente Python aos objetos: coleções chave-valor.',
    conteudo: `# Dicionários em Python

Um dicionário (\`dict\`) é o equivalente Python a um objeto — uma coleção de dados organizados em pares **chave: valor**.

## Criar e aceder a um dicionário

\`\`\`python
utilizador = {
    "nome": "Sofia",
    "idade": 22,
    "ativo": True,
}

print(utilizador["nome"])       # "Sofia" (acesso por chave, com parênteses retos)
print(utilizador.get("idade"))  # 22 (forma mais segura: não dá erro se a chave não existir)
\`\`\`

Ao contrário do JavaScript (que tem notação de ponto \`objeto.propriedade\`), em Python acede-se **sempre** com parênteses retos \`dicionario["chave"]\`, ou com o método \`.get()\`.

## Alterar e adicionar entradas

\`\`\`python
utilizador["idade"] = 23        # altera um valor existente
utilizador["cidade"] = "Aveiro"  # adiciona uma entrada nova
del utilizador["ativo"]          # remove uma entrada
\`\`\`

## Percorrer um dicionário

\`\`\`python
utilizador = {"nome": "Sofia", "idade": 22}

for chave in utilizador:
    print(chave, "->", utilizador[chave])

# ou, de forma mais direta:
for chave, valor in utilizador.items():
    print(chave, "->", valor)
\`\`\`

## Verificar se uma chave existe

\`\`\`python
utilizador = {"nome": "Sofia"}

if "idade" in utilizador:
    print("Tem idade definida")
else:
    print("Não tem idade definida")
\`\`\`

## Dicionários com listas (e vice-versa)

\`\`\`python
modulo = {
    "titulo": "Dicionários",
    "perguntas": ["O que é um dicionário?", "Como aceder a um valor?"],
}

print(modulo["perguntas"][0])       # "O que é um dicionário?"
print(len(modulo["perguntas"]))     # 2
\`\`\`

É muito comum, em programas reais, teres listas de dicionários — por exemplo, uma lista de utilizadores, cada um com nome, email e XP.

## Exercício proposto

Cria um dicionário \`jogador\` com as chaves \`nome\`, \`xp\` e \`nivel\`. Escreve uma função \`ganhar_xp(jogador, quantidade)\` que soma XP ao dicionário do jogador e mostra o novo total com \`print()\`.`,
  },
  {
    ordem: 10,
    titulo: 'Tratamento de Erros em Python',
    descricao: 'Como lidar com erros de forma controlada com try/except.',
    conteudo: `# Tratamento de Erros em Python

Nem sempre o código corre como esperado — um utilizador pode inserir texto onde se esperava um número, um ficheiro pode não existir, uma divisão pode ser por zero. Python usa **exceções** para lidar com estas situações de forma controlada.

## O que acontece sem tratamento de erros

\`\`\`python
numero = int("abc")  # ValueError: não é possível converter "abc" para número
print("Esta linha nunca é executada")
\`\`\`

Sem tratamento, um erro deste tipo interrompe o programa por completo.

## try / except

\`\`\`python
try:
    numero = int(input("Introduz um número: "))
    print("O dobro é", numero * 2)
except ValueError:
    print("Isso não é um número válido!")
\`\`\`

O código dentro do \`try\` é executado normalmente; se ocorrer um erro do tipo indicado no \`except\`, o programa salta para esse bloco em vez de terminar.

## Apanhar vários tipos de erro

\`\`\`python
try:
    resultado = 10 / int(input("Divide por: "))
    print(resultado)
except ValueError:
    print("Introduz um número válido.")
except ZeroDivisionError:
    print("Não podes dividir por zero!")
\`\`\`

## else e finally

\`\`\`python
try:
    numero = int("42")
except ValueError:
    print("Erro na conversão")
else:
    print("Conversão feita com sucesso:", numero)  # só corre se NÃO houve erro
finally:
    print("Isto corre sempre, com ou sem erro")
\`\`\`

## Lançar os teus próprios erros

\`\`\`python
def levantar_idade(idade):
    if idade < 0:
        raise ValueError("A idade não pode ser negativa")
    return idade

try:
    levantar_idade(-5)
except ValueError as erro:
    print("Erro:", erro)
\`\`\`

\`raise\` é o equivalente Python ao \`throw\` do JavaScript.

## Exercício proposto

Escreve uma função \`dividir(a, b)\` que devolva \`a / b\`, mas usa \`try/except\` para apanhar o erro \`ZeroDivisionError\` e devolver uma mensagem de erro amigável em vez de deixar o programa rebentar.`,
  },
];

// ------------------------------------------------------------
// Quizzes (5 perguntas por módulo, 1 alternativa correta cada)
// ------------------------------------------------------------
const quizzes = [
  {
    moduloOrdem: 1,
    titulo: 'Quiz: Introdução ao Python',
    perguntas: [
      {
        enunciado: 'Como é que o Python delimita blocos de código (em vez de chavetas)?',
        explicacao: 'Python usa a indentação (espaços no início da linha) para definir onde começa e acaba um bloco de código.',
        alternativas: [
          { texto: 'Com chavetas {}', correta: false },
          { texto: 'Com indentação (espaços)', correta: true },
          { texto: 'Com parênteses ()', correta: false },
          { texto: 'Não delimita, tudo corre em sequência', correta: false },
        ],
      },
      {
        enunciado: 'Qual função mostra texto na consola em Python?',
        explicacao: '`print()` é a função usada para escrever valores na consola em Python.',
        alternativas: [
          { texto: 'console.log()', correta: false },
          { texto: 'print()', correta: true },
          { texto: 'echo()', correta: false },
          { texto: 'display()', correta: false },
        ],
      },
      {
        enunciado: 'Como se escreve um comentário de uma linha em Python?',
        explicacao: 'O símbolo `#` transforma o resto da linha num comentário, que o Python ignora ao executar.',
        alternativas: [
          { texto: '// comentário', correta: false },
          { texto: '<!-- comentário -->', correta: false },
          { texto: '# comentário', correta: true },
          { texto: '** comentário **', correta: false },
        ],
      },
      {
        enunciado: 'O que é o Python, em termos de execução do código?',
        explicacao: 'O Python é interpretado: um interpretador lê e executa o código linha a linha, sem precisar de compilação prévia.',
        alternativas: [
          { texto: 'Uma linguagem compilada, como o C', correta: false },
          { texto: 'Uma linguagem interpretada', correta: true },
          { texto: 'Uma linguagem de marcação, como o HTML', correta: false },
          { texto: 'Uma linguagem exclusiva para bases de dados', correta: false },
        ],
      },
      {
        enunciado: 'O que acontece se misturares indentações diferentes dentro do mesmo bloco em Python?',
        explicacao: 'Todas as linhas de um mesmo bloco têm de ter a mesma indentação; misturar indentações diferentes causa um erro.',
        alternativas: [
          { texto: 'O Python ajusta automaticamente', correta: false },
          { texto: 'Causa um erro', correta: true },
          { texto: 'É ignorado sem qualquer efeito', correta: false },
          { texto: 'Só funciona se usares tabs, nunca espaços', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 2,
    titulo: 'Quiz: Variáveis em Python',
    perguntas: [
      {
        enunciado: 'Como se cria uma variável em Python?',
        explicacao: 'Em Python basta atribuir um valor a um nome — não é preciso usar `let`, `const` ou `var` como em JavaScript.',
        alternativas: [
          { texto: 'let idade = 25', correta: false },
          { texto: 'var idade = 25', correta: false },
          { texto: 'idade = 25', correta: true },
          { texto: 'int idade = 25', correta: false },
        ],
      },
      {
        enunciado: 'Qual é a convenção de nomenclatura mais usada para variáveis em Python?',
        explicacao: 'A convenção Python para nomes de variáveis é snake_case (palavras separadas por underscore), ao contrário do camelCase do JavaScript.',
        alternativas: [
          { texto: 'camelCase (nomeCompleto)', correta: false },
          { texto: 'snake_case (nome_completo)', correta: true },
          { texto: 'PascalCase (NomeCompleto)', correta: false },
          { texto: 'kebab-case (nome-completo)', correta: false },
        ],
      },
      {
        enunciado: 'O que faz `x, y, z = 1, 2, 3` em Python?',
        explicacao: 'Esta é a atribuição múltipla: atribui 1 a x, 2 a y e 3 a z, tudo numa só linha.',
        alternativas: [
          { texto: 'Cria uma lista [1, 2, 3]', correta: false },
          { texto: 'Dá erro de sintaxe', correta: false },
          { texto: 'Atribui 1 a x, 2 a y e 3 a z', correta: true },
          { texto: 'Atribui a mesma soma (6) às três variáveis', correta: false },
        ],
      },
      {
        enunciado: 'Como se sinaliza, por convenção, que uma variável não devia ser alterada?',
        explicacao: 'Python não tem `const`; por convenção usa-se o nome todo em maiúsculas para sinalizar que não devia mudar, mas isso não é imposto pela linguagem.',
        alternativas: [
          { texto: 'Com a palavra-chave const', correta: false },
          { texto: 'Escrevendo o nome todo em maiúsculas', correta: true },
          { texto: 'Não é possível sinalizar isso de forma alguma', correta: false },
          { texto: 'Com a palavra-chave final', correta: false },
        ],
      },
      {
        enunciado: 'Python é sensível a maiúsculas/minúsculas nos nomes de variáveis?',
        explicacao: '`idade` e `Idade` são consideradas duas variáveis diferentes em Python, tal como em JavaScript.',
        alternativas: [
          { texto: 'Sim, "idade" e "Idade" são variáveis diferentes', correta: true },
          { texto: 'Não, maiúsculas e minúsculas são tratadas da mesma forma', correta: false },
          { texto: 'Só é sensível dentro de funções', correta: false },
          { texto: 'Depende da versão do Python', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 3,
    titulo: 'Quiz: Tipos de Dados em Python',
    perguntas: [
      {
        enunciado: 'Qual o resultado de `type(3.14)` em Python?',
        explicacao: 'Números com casas decimais são do tipo `float` em Python, diferente de `int` (números inteiros).',
        alternativas: [
          { texto: "<class 'int'>", correta: false },
          { texto: "<class 'float'>", correta: true },
          { texto: "<class 'number'>", correta: false },
          { texto: "<class 'decimal'>", correta: false },
        ],
      },
      {
        enunciado: 'Qual destas é uma f-string válida que insere uma variável num texto?',
        explicacao: 'As f-strings (com "f" antes das aspas) permitem inserir variáveis diretamente com `{}`.',
        alternativas: [
          { texto: '"Olá, " + nome + "!"', correta: false },
          { texto: 'f"Olá, {nome}!"', correta: true },
          { texto: '"Olá, %nome%!"', correta: false },
          { texto: 'string.format("Olá, nome!")', correta: false },
        ],
      },
      {
        enunciado: 'O que acontece ao tentar correr `5 + "3"` em Python?',
        explicacao: 'Ao contrário do JavaScript, o Python não converte tipos automaticamente ao somar um número com uma string — dá erro (TypeError).',
        alternativas: [
          { texto: 'Devolve 8', correta: false },
          { texto: 'Devolve "53"', correta: false },
          { texto: 'Dá erro (TypeError)', correta: true },
          { texto: 'Devolve None', correta: false },
        ],
      },
      {
        enunciado: 'Qual é o valor usado em Python para representar "sem valor" (equivalente a null/undefined)?',
        explicacao: 'Python usa apenas `None` para representar ausência de valor, sem distinguir null de undefined como o JavaScript.',
        alternativas: [
          { texto: 'null', correta: false },
          { texto: 'undefined', correta: false },
          { texto: 'None', correta: true },
          { texto: 'empty', correta: false },
        ],
      },
      {
        enunciado: 'Como se converte a string "25" para o número 25 em Python?',
        explicacao: '`int()` converte um valor compatível para o tipo inteiro.',
        alternativas: [
          { texto: 'str("25")', correta: false },
          { texto: 'int("25")', correta: true },
          { texto: 'bool("25")', correta: false },
          { texto: 'type("25")', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 4,
    titulo: 'Quiz: Operadores em Python',
    perguntas: [
      {
        enunciado: 'Qual o resultado de `10 // 3` em Python?',
        explicacao: 'O operador `//` é a divisão inteira: arredonda sempre para baixo, por isso 10 // 3 dá 3.',
        alternativas: [
          { texto: '3.33', correta: false },
          { texto: '3', correta: true },
          { texto: '1', correta: false },
          { texto: '4', correta: false },
        ],
      },
      {
        enunciado: 'Como se escreve o operador lógico "E" (AND) em Python?',
        explicacao: 'Em Python, os operadores lógicos escrevem-se por extenso: `and`, `or` e `not`, em vez de símbolos como `&&`.',
        alternativas: [
          { texto: '&&', correta: false },
          { texto: 'and', correta: true },
          { texto: 'AND', correta: false },
          { texto: '&', correta: false },
        ],
      },
      {
        enunciado: 'O que acontece com `5 == "5"` em Python?',
        explicacao: 'Ao contrário do `==` em JavaScript, o `==` do Python não converte tipos: um int nunca é igual a uma string com o mesmo dígito.',
        alternativas: [
          { texto: 'True, porque o valor é o mesmo', correta: false },
          { texto: 'False, porque os tipos são diferentes', correta: true },
          { texto: 'Dá erro de sintaxe', correta: false },
          { texto: 'Depende da versão do Python', correta: false },
        ],
      },
      {
        enunciado: 'Qual é o resultado de `pontos += 5` se `pontos` valia 10?',
        explicacao: '`+=` é um atalho para `pontos = pontos + 5`, logo o novo valor é 15, tal como em JavaScript.',
        alternativas: [
          { texto: '5', correta: false },
          { texto: '10', correta: false },
          { texto: '15', correta: true },
          { texto: '50', correta: false },
        ],
      },
      {
        enunciado: 'Python tem um operador equivalente ao `===` do JavaScript?',
        explicacao: 'Não é necessário: o `==` do Python já compara sempre valor e tipo, sem conversões implícitas, por isso não existe uma versão "estrita" separada.',
        alternativas: [
          { texto: 'Sim, chama-se ===', correta: false },
          { texto: 'Sim, chama-se is', correta: false },
          { texto: 'Não é necessário, o == já compara valor e tipo', correta: true },
          { texto: 'Sim, chama-se equals()', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 5,
    titulo: 'Quiz: Condicionais em Python',
    perguntas: [
      {
        enunciado: 'Como se escreve "senão se" em Python?',
        explicacao: 'Python usa a palavra-chave `elif`, contração de "else if".',
        alternativas: [
          { texto: 'else if', correta: false },
          { texto: 'elseif', correta: false },
          { texto: 'elif', correta: true },
          { texto: 'elsif', correta: false },
        ],
      },
      {
        enunciado: 'O que é obrigatório no final da linha de um `if` em Python?',
        explicacao: 'A linha do `if` (e de `elif`, `else`, `for`, `while`, `def`) termina sempre com dois pontos `:`.',
        alternativas: [
          { texto: 'Uma chaveta {', correta: false },
          { texto: 'Um ponto e vírgula ;', correta: false },
          { texto: 'Dois pontos :', correta: true },
          { texto: 'Nada, a linha termina sem símbolo', correta: false },
        ],
      },
      {
        enunciado: 'Python tem uma instrução `switch` tradicional?',
        explicacao: 'Nas versões mais usadas em contexto de aprendizagem, o Python não tem `switch` — usa-se uma sequência de `if/elif` como alternativa.',
        alternativas: [
          { texto: 'Sim, igual ao JavaScript', correta: false },
          { texto: 'Não, usa-se if/elif como alternativa', correta: true },
          { texto: 'Sim, mas chama-se case', correta: false },
          { texto: 'Só existe dentro de funções', correta: false },
        ],
      },
      {
        enunciado: 'O que devolve `"adulto" if idade >= 18 else "menor"` se `idade = 20`?',
        explicacao: 'Esta é a expressão condicional numa linha do Python; como 20 >= 18 é verdadeiro, devolve "adulto".',
        alternativas: [
          { texto: '"menor"', correta: false },
          { texto: '"adulto"', correta: true },
          { texto: 'True', correta: false },
          { texto: 'Dá erro de sintaxe', correta: false },
        ],
      },
      {
        enunciado: 'Quantos blocos de um `if/elif/elif/else` podem ser executados numa só verificação?',
        explicacao: 'Tal como no JavaScript, apenas o primeiro bloco cuja condição for verdadeira é executado; os restantes são ignorados.',
        alternativas: [
          { texto: 'Todos os blocos cuja condição seja verdadeira', correta: false },
          { texto: 'Apenas o primeiro bloco cuja condição for verdadeira', correta: true },
          { texto: 'Sempre todos os blocos, um a seguir ao outro', correta: false },
          { texto: 'Nenhum, é preciso usar match para isso', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 6,
    titulo: 'Quiz: Loops em Python',
    perguntas: [
      {
        enunciado: 'O que gera `range(5)` em Python?',
        explicacao: '`range(5)` gera os números de 0 a 4 (5 números, começando em 0).',
        alternativas: [
          { texto: 'Os números de 1 a 5', correta: false },
          { texto: 'Os números de 0 a 4', correta: true },
          { texto: 'Os números de 0 a 5', correta: false },
          { texto: 'Uma lista vazia', correta: false },
        ],
      },
      {
        enunciado: 'Python tem uma instrução `do...while` nativa?',
        explicacao: 'Python não tem `do...while` — para simular "executa pelo menos uma vez", usa-se `while True` com um `break` condicional.',
        alternativas: [
          { texto: 'Sim, igual ao JavaScript', correta: false },
          { texto: 'Não, simula-se com while True e break', correta: true },
          { texto: 'Sim, mas chama-se repeat', correta: false },
          { texto: 'Só existe em versões antigas do Python', correta: false },
        ],
      },
      {
        enunciado: 'Como se percorre diretamente cada elemento de uma lista em Python?',
        explicacao: '`for elemento in lista` dá acesso direto a cada valor, sem precisares de um índice.',
        alternativas: [
          { texto: 'for (let i = 0; i < lista.length; i++)', correta: false },
          { texto: 'for elemento in lista:', correta: true },
          { texto: 'foreach elemento in lista:', correta: false },
          { texto: 'loop elemento in lista:', correta: false },
        ],
      },
      {
        enunciado: 'O que faz `continue` dentro de um ciclo em Python?',
        explicacao: '`continue` salta o resto do código dessa iteração e avança diretamente para a próxima, tal como em JavaScript.',
        alternativas: [
          { texto: 'Termina o ciclo por completo', correta: false },
          { texto: 'Salta para a próxima iteração', correta: true },
          { texto: 'Reinicia a variável de controlo', correta: false },
          { texto: 'Só funciona dentro de uma função', correta: false },
        ],
      },
      {
        enunciado: 'O que gera `range(0, 10, 2)`?',
        explicacao: 'O terceiro argumento de `range()` é o "passo" — aqui gera 0, 2, 4, 6, 8 (de 2 em 2, até antes de 10).',
        alternativas: [
          { texto: '0, 1, 2, ..., 10', correta: false },
          { texto: '0, 2, 4, 6, 8', correta: true },
          { texto: '2, 4, 6, 8, 10', correta: false },
          { texto: '10, 8, 6, 4, 2, 0', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 7,
    titulo: 'Quiz: Funções em Python',
    perguntas: [
      {
        enunciado: 'Qual palavra-chave define uma função em Python?',
        explicacao: '`def` é a palavra-chave usada para definir uma função em Python.',
        alternativas: [
          { texto: 'function', correta: false },
          { texto: 'def', correta: true },
          { texto: 'func', correta: false },
          { texto: 'fn', correta: false },
        ],
      },
      {
        enunciado: 'O que devolve uma função Python que não tem `return`?',
        explicacao: 'Sem `return`, uma função em Python devolve `None`, o equivalente ao `undefined` do JavaScript.',
        alternativas: [
          { texto: 'Dá sempre erro', correta: false },
          { texto: 'None', correta: true },
          { texto: '0', correta: false },
          { texto: 'Uma string vazia', correta: false },
        ],
      },
      {
        enunciado: 'O que são "keyword arguments" em Python?',
        explicacao: 'Keyword arguments permitem passar argumentos indicando o nome do parâmetro, em qualquer ordem — algo sem equivalente direto no JavaScript.',
        alternativas: [
          { texto: 'Argumentos passados por nome, em qualquer ordem', correta: true },
          { texto: 'Palavras reservadas que não podem ser parâmetros', correta: false },
          { texto: 'Argumentos que só aceitam texto', correta: false },
          { texto: 'Um tipo de erro de sintaxe', correta: false },
        ],
      },
      {
        enunciado: 'Qual destas é uma função lambda válida que soma dois números?',
        explicacao: 'As funções lambda usam a sintaxe `lambda parametros: expressao`, sem `def` nem `return`.',
        alternativas: [
          { texto: 'lambda a, b: a + b', correta: true },
          { texto: 'lambda(a, b) => a + b', correta: false },
          { texto: 'def lambda(a, b): return a + b', correta: false },
          { texto: 'function(a, b) = a + b', correta: false },
        ],
      },
      {
        enunciado: 'Qual é uma limitação das funções lambda em Python?',
        explicacao: 'Uma lambda só pode conter uma única expressão — para lógica mais complexa (várias linhas, condições, ciclos), tens de usar `def`.',
        alternativas: [
          { texto: 'Não podem receber parâmetros', correta: false },
          { texto: 'Só podem ter uma expressão', correta: true },
          { texto: 'Não podem ser guardadas numa variável', correta: false },
          { texto: 'Só funcionam com números', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 8,
    titulo: 'Quiz: Listas em Python',
    perguntas: [
      {
        enunciado: 'O que devolve `frutas[-1]` se `frutas = ["maçã", "banana", "pera"]`?',
        explicacao: 'Índices negativos contam a partir do fim da lista; `-1` é sempre o último elemento, neste caso "pera".',
        alternativas: [
          { texto: '"maçã"', correta: false },
          { texto: '"banana"', correta: false },
          { texto: '"pera"', correta: true },
          { texto: 'Dá erro', correta: false },
        ],
      },
      {
        enunciado: 'Qual método adiciona um elemento ao FIM de uma lista em Python?',
        explicacao: '`.append()` adiciona um elemento ao final da lista.',
        alternativas: [
          { texto: '.append()', correta: true },
          { texto: '.push()', correta: false },
          { texto: '.add()', correta: false },
          { texto: '.insert()', correta: false },
        ],
      },
      {
        enunciado: 'O que devolve `[n * 2 for n in [1, 2, 3]]`?',
        explicacao: 'Isto é uma list comprehension, equivalente ao `.map()` do JavaScript: devolve uma nova lista com cada elemento multiplicado por 2.',
        alternativas: [
          { texto: '[1, 2, 3]', correta: false },
          { texto: '[2, 4, 6]', correta: true },
          { texto: '6', correta: false },
          { texto: 'Dá erro de sintaxe', correta: false },
        ],
      },
      {
        enunciado: 'O que devolve `numeros[1:4]` se `numeros = [0, 1, 2, 3, 4, 5]`?',
        explicacao: 'O "slicing" `[1:4]` devolve os elementos do índice 1 até ao 3 (sem incluir o índice 4): [1, 2, 3].',
        alternativas: [
          { texto: '[1, 2, 3]', correta: true },
          { texto: '[1, 2, 3, 4]', correta: false },
          { texto: '[0, 1, 2, 3]', correta: false },
          { texto: '[4]', correta: false },
        ],
      },
      {
        enunciado: 'Qual a diferença entre `.remove(2)` e `.pop(2)` numa lista?',
        explicacao: '`.remove(valor)` remove a primeira ocorrência desse VALOR; `.pop(indice)` remove o elemento nessa POSIÇÃO.',
        alternativas: [
          { texto: 'Não há diferença nenhuma', correta: false },
          { texto: '.remove() apaga por valor; .pop() apaga por índice', correta: true },
          { texto: '.remove() só funciona com números', correta: false },
          { texto: '.pop() apaga a lista toda', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 9,
    titulo: 'Quiz: Dicionários em Python',
    perguntas: [
      {
        enunciado: 'Como se organiza a informação dentro de um dicionário em Python?',
        explicacao: 'Um dicionário organiza dados em pares chave: valor, tal como um objeto em JavaScript.',
        alternativas: [
          { texto: 'Em pares chave: valor', correta: true },
          { texto: 'Só por posição, como uma lista', correta: false },
          { texto: 'Só pode guardar números', correta: false },
          { texto: 'Em linhas e colunas, como uma tabela', correta: false },
        ],
      },
      {
        enunciado: 'Dado `pessoa = {"nome": "Rui"}`, como acedemos ao nome?',
        explicacao: 'Em Python, acede-se sempre a um dicionário com parênteses retos: `pessoa["nome"]`.',
        alternativas: [
          { texto: 'pessoa.nome', correta: false },
          { texto: 'pessoa["nome"]', correta: true },
          { texto: 'pessoa->nome', correta: false },
          { texto: 'pessoa::nome', correta: false },
        ],
      },
      {
        enunciado: 'Qual a vantagem de usar `.get("idade")` em vez de `["idade"]` num dicionário?',
        explicacao: '`.get()` não gera erro se a chave não existir (devolve None por omissão); aceder com `[]` a uma chave inexistente causa um erro (KeyError).',
        alternativas: [
          { texto: 'Não há vantagem nenhuma, são idênticos', correta: false },
          { texto: '.get() não dá erro se a chave não existir', correta: true },
          { texto: '.get() só funciona com números', correta: false },
          { texto: '.get() é mais lento mas mais seguro', correta: false },
        ],
      },
      {
        enunciado: 'O que faz `.items()` num dicionário?',
        explicacao: '`.items()` devolve pares (chave, valor), permitindo percorrer ambos ao mesmo tempo num `for`.',
        alternativas: [
          { texto: 'Devolve só as chaves', correta: false },
          { texto: 'Devolve só os valores', correta: false },
          { texto: 'Devolve pares (chave, valor)', correta: true },
          { texto: 'Apaga todas as entradas', correta: false },
        ],
      },
      {
        enunciado: 'Como se remove uma entrada de um dicionário em Python?',
        explicacao: 'A palavra-chave `del` remove uma entrada específica de um dicionário pela sua chave.',
        alternativas: [
          { texto: 'dicionario.remove("chave")', correta: false },
          { texto: 'del dicionario["chave"]', correta: true },
          { texto: 'dicionario["chave"] = remove', correta: false },
          { texto: 'Não é possível remover entradas', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 10,
    titulo: 'Quiz: Tratamento de Erros em Python',
    perguntas: [
      {
        enunciado: 'O que acontece a um programa Python quando ocorre um erro sem tratamento?',
        explicacao: 'Sem um bloco try/except, um erro (exceção) interrompe o programa por completo.',
        alternativas: [
          { texto: 'O programa continua normalmente, ignorando o erro', correta: false },
          { texto: 'O programa é interrompido', correta: true },
          { texto: 'O erro é corrigido automaticamente', correta: false },
          { texto: 'O Python reinicia o script sozinho', correta: false },
        ],
      },
      {
        enunciado: 'Qual bloco contém o código que pode gerar um erro, em Python?',
        explicacao: 'O código que pode falhar é colocado dentro do bloco `try`; se ocorrer um erro do tipo indicado, salta para o `except` correspondente.',
        alternativas: [
          { texto: 'except', correta: false },
          { texto: 'try', correta: true },
          { texto: 'catch', correta: false },
          { texto: 'error', correta: false },
        ],
      },
      {
        enunciado: 'Quando é que o bloco `else` de um try/except/else é executado?',
        explicacao: 'O bloco `else` só corre se o `try` terminar SEM nenhum erro.',
        alternativas: [
          { texto: 'Sempre, independentemente de haver erro ou não', correta: false },
          { texto: 'Só se NÃO ocorrer nenhum erro no try', correta: true },
          { texto: 'Só se ocorrer um erro no try', correta: false },
          { texto: 'Nunca é executado automaticamente', correta: false },
        ],
      },
      {
        enunciado: 'O que faz o bloco `finally` num try/except?',
        explicacao: '`finally` executa sempre, quer tenha havido erro quer não — é usado tipicamente para libertar recursos.',
        alternativas: [
          { texto: 'Só corre se houver erro', correta: false },
          { texto: 'Só corre se NÃO houver erro', correta: false },
          { texto: 'Corre sempre, com ou sem erro', correta: true },
          { texto: 'Substitui o bloco try', correta: false },
        ],
      },
      {
        enunciado: 'Qual palavra-chave usas para lançar um erro propositadamente em Python?',
        explicacao: '`raise` é o equivalente Python ao `throw` do JavaScript, usado para lançar exceções manualmente.',
        alternativas: [
          { texto: 'throw', correta: false },
          { texto: 'raise', correta: true },
          { texto: 'error', correta: false },
          { texto: 'except', correta: false },
        ],
      },
    ],
  },
];

async function main() {
  const conn = await pool.getConnection();
  try {
    console.log('A criar/atualizar módulos de Python...');
    for (const modulo of modulos) {
      const [[existente]] = await conn.query(
        'SELECT id FROM modulos WHERE titulo = ? AND linguagem = ?',
        [modulo.titulo, LINGUAGEM]
      );

      if (existente) {
        await conn.query(
          'UPDATE modulos SET descricao = ?, ordem = ?, conteudo = ? WHERE id = ?',
          [modulo.descricao, modulo.ordem, modulo.conteudo, existente.id]
        );
        modulo.id = existente.id;
      } else {
        const [resultado] = await conn.query(
          'INSERT INTO modulos (titulo, descricao, linguagem, ordem, conteudo) VALUES (?, ?, ?, ?, ?)',
          [modulo.titulo, modulo.descricao, LINGUAGEM, modulo.ordem, modulo.conteudo]
        );
        modulo.id = resultado.insertId;
      }
      console.log(`  ✓ ${modulo.titulo} (id=${modulo.id})`);
    }

    console.log('A recriar quizzes de Python (5 perguntas cada)...');
    for (const quiz of quizzes) {
      const modulo = modulos.find((m) => m.ordem === quiz.moduloOrdem);
      if (!modulo) {
        console.warn(`Módulo Python com ordem ${quiz.moduloOrdem} não encontrado, a saltar.`);
        continue;
      }
      const moduloId = modulo.id;

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
  console.error('Erro ao popular conteúdo Python:', err);
  process.exit(1);
});
