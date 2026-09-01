// ============================================================
// Script de seed de conteÃºdo PYTHON: cria/atualiza 10 mÃ³dulos de
// Python (mesma profundidade dos mÃ³dulos de JavaScript) e os
// respetivos quizzes de 5 perguntas cada.
//
// Corre com: node database/seed-content-python.js
// Idempotente: pode ser corrido vÃ¡rias vezes sem duplicar mÃ³dulos
// nem quizzes (identifica mÃ³dulos existentes por tÃ­tulo+linguagem).
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
// MÃ³dulos (ordem 1 a 10, dentro da linguagem Python)
// ------------------------------------------------------------
const modulos = [
  {
    ordem: 1,
    titulo: 'IntroduÃ§Ã£o ao Python',
    descricao: 'O que Ã© o Python e como executar o teu primeiro programa.',
    conteudo: `# IntroduÃ§Ã£o ao Python

Python Ã© uma linguagem de programaÃ§Ã£o criada para ser legÃ­vel e simples de escrever, sem perder poder. Ã‰ uma das linguagens mais usadas do mundo, tanto para iniciantes como em Ã¡reas como ciÃªncia de dados, automaÃ§Ã£o e desenvolvimento web.

## Uma diferenÃ§a importante logo de inÃ­cio

Ao contrÃ¡rio do JavaScript, o Python **nÃ£o usa chavetas \`{}\`** para delimitar blocos de cÃ³digo â€” usa **indentaÃ§Ã£o** (espaÃ§os no inÃ­cio da linha). Isto obriga o cÃ³digo a ficar sempre organizado visualmente:

\`\`\`python
if 5 > 3:
    print("Cinco Ã© maior que trÃªs")
    print("Esta linha tambÃ©m estÃ¡ dentro do if")
print("Esta jÃ¡ nÃ£o estÃ¡")
\`\`\`

Todas as linhas dentro do mesmo bloco tÃªm de ter a **mesma indentaÃ§Ã£o** (o padrÃ£o sÃ£o 4 espaÃ§os). Misturar indentaÃ§Ãµes diferentes causa erros.

## O teu primeiro programa

\`\`\`python
print("OlÃ¡, CodeQuest!")
\`\`\`

\`print()\` Ã© a funÃ§Ã£o que escreve texto na consola â€” o equivalente ao \`console.log()\` do JavaScript.

## ComentÃ¡rios

\`\`\`python
# Isto Ã© um comentÃ¡rio de uma linha
print("Isto Ã© executado")  # isto tambÃ©m Ã© um comentÃ¡rio

"""
Isto Ã© um comentÃ¡rio
de vÃ¡rias linhas
(tecnicamente Ã© uma string, mas Ã© usado assim por convenÃ§Ã£o)
"""
\`\`\`

## Python Ã© interpretado

O Python nÃ£o precisa de ser compilado antes de correr â€” um interpretador lÃª e executa o cÃ³digo linha a linha. Isto torna o ciclo de escrever/testar cÃ³digo muito rÃ¡pido, mas tambÃ©m significa que sÃ³ descobres um erro numa linha quando o programa a tenta executar.

## ExercÃ­cio proposto

Escreve um programa em Python que mostre, em trÃªs linhas separadas com \`print()\`, o teu nome, a tua idade e a linguagem que estÃ¡s a aprender. Usa pelo menos um comentÃ¡rio a explicar o que o cÃ³digo faz.`,
  },
  {
    ordem: 2,
    titulo: 'VariÃ¡veis em Python',
    descricao: 'Como guardar e manipular dados em Python.',
    conteudo: `# VariÃ¡veis em Python

Uma variÃ¡vel Ã© um nome que aponta para um valor guardado na memÃ³ria. Em Python, criar uma variÃ¡vel Ã© tÃ£o simples como atribuir-lhe um valor â€” nÃ£o Ã© preciso declarar o tipo nem usar palavras-chave como \`let\` ou \`const\`.

## Criar variÃ¡veis

\`\`\`python
idade = 25
nome = "Ana"
preco = 9.99
\`\`\`

Ao contrÃ¡rio do JavaScript, o Python **nÃ£o distingue** \`let\`/\`const\`/\`var\` â€” todas as variÃ¡veis podem ser reatribuÃ­das por omissÃ£o:

\`\`\`python
pontos = 0
pontos = 10        # vÃ¡lido, reatribuiÃ§Ã£o normal
pontos = pontos + 5  # agora pontos vale 15
\`\`\`

## Constantes (por convenÃ§Ã£o)

Python nÃ£o tem uma forma nativa de impedir a reatribuiÃ§Ã£o de uma variÃ¡vel. Por convenÃ§Ã£o, escreve-se o nome todo em maiÃºsculas para sinalizar "isto nÃ£o devia mudar":

\`\`\`python
IDADE_MINIMA = 18  # continua a poder ser alterada, mas o nome avisa que nÃ£o devia
\`\`\`

## AtribuiÃ§Ã£o mÃºltipla

Uma conveniÃªncia do Python que o JavaScript nÃ£o tem diretamente:

\`\`\`python
x, y, z = 1, 2, 3
print(x, y, z)  # 1 2 3

a = b = 0  # ambas as variÃ¡veis ficam com o valor 0
\`\`\`

## Regras para nomes de variÃ¡veis

- NÃ£o podem comeÃ§ar por um nÃºmero (\`1nome\` Ã© invÃ¡lido, \`nome1\` Ã© vÃ¡lido).
- Usam-se letras, nÃºmeros e underscore (\`_\`) â€” a convenÃ§Ã£o em Python Ã© \`snake_case\` (\`nome_completo\`), ao contrÃ¡rio do \`camelCase\` do JavaScript.
- SÃ£o sensÃ­veis a maiÃºsculas/minÃºsculas: \`idade\` e \`Idade\` sÃ£o variÃ¡veis diferentes.

## ExercÃ­cio proposto

Cria trÃªs variÃ¡veis: uma com o teu nome, uma com a tua pontuaÃ§Ã£o atual num jogo (comeÃ§a em 0) e outra com o nÃºmero de vidas (comeÃ§a em 3). Depois, simula perder uma vida e ganhar 50 pontos, atualizando as variÃ¡veis, e mostra o resultado final com \`print()\`.`,
  },
  {
    ordem: 3,
    titulo: 'Tipos de Dados em Python',
    descricao: 'NÃºmeros, strings, booleanos e outros tipos em Python.',
    conteudo: `# Tipos de Dados em Python

Todo o valor em Python tem um tipo, e o Python consegue adivinhar automaticamente qual Ã© (chama-se a isto **tipagem dinÃ¢mica**).

## int e float (nÃºmeros)

\`\`\`python
inteiro = 42        # int
decimal = 3.14      # float
negativo = -7       # int
\`\`\`

Ao contrÃ¡rio do JavaScript (que trata tudo como \`number\`), o Python distingue \`int\` (inteiro) de \`float\` (decimal).

## str (texto)

\`\`\`python
nome = "Diogo"
saudacao = 'OlÃ¡!'
mensagem = f"OlÃ¡, {nome}!"  # f-string: insere variÃ¡veis com {}
\`\`\`

As **f-strings** (com um \`f\` antes das aspas) sÃ£o o equivalente Ã s template strings do JavaScript.

## bool (verdadeiro/falso)

\`\`\`python
esta_logado = True   # comeÃ§a sempre com maiÃºscula em Python!
tem_erros = False
\`\`\`

## None (o equivalente a null/undefined)

\`\`\`python
resultado = None  # representa "sem valor", como null em JavaScript
\`\`\`

Python nÃ£o distingue \`undefined\` de \`null\` como o JavaScript â€” sÃ³ existe \`None\`.

## Verificar o tipo de um valor

\`\`\`python
print(type(42))          # <class 'int'>
print(type("Ana"))       # <class 'str'>
print(type(True))        # <class 'bool'>
print(type(None))        # <class 'NoneType'>
\`\`\`

## ConversÃ£o entre tipos

\`\`\`python
texto_idade = "25"
idade = int(texto_idade)     # 25 (int)
texto = str(idade)            # "25" (str)

print("5" + "3")   # "53" (concatena, porque ambos sÃ£o strings)
print(int("5") + 3)  # 8 (soma, porque converteu para nÃºmero)
\`\`\`

Nota: ao contrÃ¡rio do JavaScript, o Python **dÃ¡ erro** se tentares somar um \`int\` com uma \`str\` diretamente (\`5 + "3"\` falha) â€” tens sempre de converter primeiro.

## ExercÃ­cio proposto

Cria uma variÃ¡vel \`str\` com o valor \`"10"\` e uma variÃ¡vel \`int\` com o valor \`5\`. Tenta somÃ¡-las diretamente com \`+\` (repara no erro), depois converte a string para \`int\` com \`int()\` e soma outra vez, comparando os dois comportamentos.`,
  },
  {
    ordem: 4,
    titulo: 'Operadores em Python',
    descricao: 'Operadores aritmÃ©ticos, de comparaÃ§Ã£o e lÃ³gicos em Python.',
    conteudo: `# Operadores em Python

## Operadores aritmÃ©ticos

\`\`\`python
print(10 + 3)   # 13 (soma)
print(10 - 3)   # 7  (subtraÃ§Ã£o)
print(10 * 3)   # 30 (multiplicaÃ§Ã£o)
print(10 / 3)   # 3.3333... (divisÃ£o, resultado sempre float)
print(10 // 3)  # 3  (divisÃ£o inteira, arredonda para baixo)
print(10 % 3)   # 1  (resto da divisÃ£o, "mÃ³dulo")
print(10 ** 2)  # 100 (potÃªncia)
\`\`\`

Repara no \`//\` (divisÃ£o inteira) â€” nÃ£o existe em JavaScript e Ã© muito usado em Python. O operador \`%\` funciona da mesma forma que em JavaScript, muito usado para saber se um nÃºmero Ã© par: \`numero % 2 == 0\`.

## Operadores de atribuiÃ§Ã£o

\`\`\`python
pontos = 10
pontos += 5   # equivale a: pontos = pontos + 5  -> 15
pontos -= 2   # pontos = pontos - 2 -> 13
pontos *= 2   # pontos = pontos * 2 -> 26
\`\`\`

## Operadores de comparaÃ§Ã£o

\`\`\`python
print(5 == "5")   # False (Python NÃƒO converte tipos automaticamente)
print(5 == 5)     # True
print(5 != 3)     # True
print(10 > 5)     # True
print(10 <= 10)   # True
\`\`\`

Uma diferenÃ§a importante: em Python, **nÃ£o existe** \`===\`/\`!==\` como no JavaScript â€” o \`==\` jÃ¡ compara sempre valor e tipo, sem conversÃµes escondidas. Isto torna o Python mais previsÃ­vel nesta parte.

## Operadores lÃ³gicos

Em Python, os operadores lÃ³gicos escrevem-se por extenso, em inglÃªs, em vez de sÃ­mbolos:

\`\`\`python
tem_conta = True
tem_saldo = False

print(tem_conta and tem_saldo)  # False (E: as duas tÃªm de ser True)
print(tem_conta or tem_saldo)   # True  (OU: basta uma ser True)
print(not tem_conta)            # False (NÃƒO: inverte o valor)
\`\`\`

## ExercÃ­cio proposto

Escreve cÃ³digo que declare um nÃºmero numa variÃ¡vel e use o operador \`%\` para mostrar (com \`print\`) se esse nÃºmero Ã© par ou Ã­mpar. Testa tambÃ©m a divisÃ£o inteira \`//\` com dois nÃºmeros diferentes e compara o resultado com a divisÃ£o normal \`/\`.`,
  },
  {
    ordem: 5,
    titulo: 'Condicionais em Python',
    descricao: 'if, elif e else para tomar decisÃµes no cÃ³digo.',
    conteudo: `# Condicionais em Python

## if / else

\`\`\`python
idade = 16

if idade >= 18:
    print("Ã‰s maior de idade.")
else:
    print("Ã‰s menor de idade.")
\`\`\`

Repara: nÃ£o hÃ¡ chavetas \`{}\` â€” o bloco Ã© definido pela indentaÃ§Ã£o, e a linha do \`if\` termina em dois pontos (\`:\`).

## elif â€” vÃ¡rias condiÃ§Ãµes

Em Python, "senÃ£o se" escreve-se \`elif\` (nÃ£o \`else if\`):

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

As condiÃ§Ãµes sÃ£o verificadas por ordem, de cima para baixo, e sÃ³ o primeiro bloco cuja condiÃ§Ã£o Ã© verdadeira Ã© executado.

## CondiÃ§Ãµes combinadas

\`\`\`python
idade = 20
tem_carta = True

if idade >= 18 and tem_carta:
    print("Pode conduzir.")
\`\`\`

## Python nÃ£o tem switch

O Python (nas versÃµes mais usadas em contexto de aprendizagem) nÃ£o tem uma instruÃ§Ã£o \`switch\` tradicional â€” usa-se uma sequÃªncia de \`if/elif\` em alternativa:

\`\`\`python
dia_semana = 3

if dia_semana == 1:
    print("Segunda-feira")
elif dia_semana == 2:
    print("TerÃ§a-feira")
elif dia_semana == 3:
    print("Quarta-feira")
else:
    print("Outro dia")
\`\`\`

## ExpressÃ£o condicional numa linha

Uma forma compacta de escrever um if/else simples, muito usada em Python:

\`\`\`python
idade = 20
estado = "adulto" if idade >= 18 else "menor"
print(estado)  # "adulto"
\`\`\`

## ExercÃ­cio proposto

Escreve um programa que declare uma variÃ¡vel \`nota\` (0 a 20) e use \`if/elif/else\` para mostrar "Aprovado" se a nota for maior ou igual a 10, e "Reprovado" caso contrÃ¡rio. Testa o teu cÃ³digo com pelo menos trÃªs valores diferentes de nota.`,
  },
  {
    ordem: 6,
    titulo: 'Loops em Python',
    descricao: 'for e while para repetir cÃ³digo em Python.',
    conteudo: `# Loops em Python

## for â€” percorrer uma sequÃªncia

Ao contrÃ¡rio do JavaScript, o \`for\` do Python nÃ£o tem inicializaÃ§Ã£o/condiÃ§Ã£o/incremento â€” percorre diretamente uma sequÃªncia de valores, muitas vezes gerada com \`range()\`:

\`\`\`python
for i in range(5):
    print("IteraÃ§Ã£o nÃºmero", i)
# Mostra: 0, 1, 2, 3, 4
\`\`\`

\`range(5)\` gera os nÃºmeros de 0 a 4. \`range(2, 8)\` gera de 2 a 7, e \`range(0, 10, 2)\` gera de 2 em 2 (0, 2, 4, 6, 8).

## while â€” repete enquanto uma condiÃ§Ã£o for verdadeira

\`\`\`python
tentativas = 0

while tentativas < 3:
    print("Tentativa", tentativas)
    tentativas += 1
\`\`\`

**Cuidado com loops infinitos**: se te esqueceres de atualizar a condiÃ§Ã£o (\`tentativas += 1\`), o ciclo nunca para.

## Python nÃ£o tem do...while

NÃ£o existe uma instruÃ§Ã£o \`do...while\` nativa em Python. Para simular "executa pelo menos uma vez", usa-se um \`while True\` com um \`break\` condicional:

\`\`\`python
import random

while True:
    numero = random.randint(1, 10)
    print("NÃºmero gerado:", numero)
    if numero == 7:
        break
\`\`\`

## Percorrer uma lista diretamente

\`\`\`python
nomes = ["Ana", "Bruno", "Carla"]

for nome in nomes:
    print(nome)
\`\`\`

NÃ£o precisas de Ã­ndices para percorrer uma lista â€” o \`for ... in\` dÃ¡-te diretamente cada elemento.

## break e continue

\`\`\`python
for i in range(10):
    if i == 5:
        break       # sai do ciclo imediatamente
    if i % 2 == 0:
        continue    # salta para a prÃ³xima iteraÃ§Ã£o
    print(i)  # mostra sÃ³ 1 e 3
\`\`\`

## ExercÃ­cio proposto

Usa um ciclo \`for\` com \`range()\` para mostrar todos os nÃºmeros de 1 a 20, mas usa \`continue\` para saltar os mÃºltiplos de 3.`,
  },
  {
    ordem: 7,
    titulo: 'FunÃ§Ãµes em Python',
    descricao: 'Como criar e reutilizar blocos de cÃ³digo em Python.',
    conteudo: `# FunÃ§Ãµes em Python

Uma funÃ§Ã£o Ã© um bloco de cÃ³digo reutilizÃ¡vel, definido em Python com a palavra-chave \`def\`.

## Definir e chamar uma funÃ§Ã£o

\`\`\`python
def saudar(nome):
    print("OlÃ¡, " + nome + "!")

saudar("Marta")  # "OlÃ¡, Marta!"
saudar("Rui")    # "OlÃ¡, Rui!"
\`\`\`

\`nome\` Ã© um **parÃ¢metro**. Quando chamamos \`saudar("Marta")\`, \`"Marta"\` Ã© o **argumento**.

## FunÃ§Ãµes que devolvem valores

\`\`\`python
def somar(a, b):
    return a + b

resultado = somar(3, 4)  # resultado vale 7
print(resultado)
\`\`\`

Sem \`return\`, uma funÃ§Ã£o em Python devolve \`None\` (o equivalente ao \`undefined\` do JavaScript).

## ParÃ¢metros com valor por omissÃ£o

\`\`\`python
def saudar(nome="visitante"):
    print("OlÃ¡,", nome)

saudar()        # "OlÃ¡, visitante"
saudar("Ana")   # "OlÃ¡, Ana"
\`\`\`

## Argumentos por nome (keyword arguments)

Uma funcionalidade do Python sem equivalente direto no JavaScript: podes passar argumentos indicando o nome do parÃ¢metro, em qualquer ordem:

\`\`\`python
def apresentar(nome, idade):
    print(f"{nome} tem {idade} anos")

apresentar(idade=30, nome="Sofia")  # "Sofia tem 30 anos"
\`\`\`

## FunÃ§Ãµes lambda (equivalente Ã s arrow functions)

\`\`\`python
somar = lambda a, b: a + b
dobro = lambda n: n * 2

print(somar(2, 3))  # 5
print(dobro(4))     # 8
\`\`\`

Uma \`lambda\` sÃ³ pode ter uma expressÃ£o (sem vÃ¡rias linhas de lÃ³gica) â€” para funÃ§Ãµes mais complexas, usa-se sempre \`def\`.

## ExercÃ­cio proposto

Escreve uma funÃ§Ã£o \`calcular_media(nota1, nota2, nota3)\` que devolva a mÃ©dia das trÃªs notas. Chama a funÃ§Ã£o com valores diferentes e mostra o resultado com \`print()\`.`,
  },
  {
    ordem: 8,
    titulo: 'Listas em Python',
    descricao: 'O equivalente Python aos arrays: listas ordenadas de valores.',
    conteudo: `# Listas em Python

Uma lista (\`list\`) Ã© o equivalente Python a um array â€” uma coleÃ§Ã£o ordenada de valores.

## Criar e aceder a uma lista

\`\`\`python
frutas = ["maÃ§Ã£", "banana", "pera"]

print(frutas[0])       # "maÃ§Ã£" (o primeiro Ã­ndice Ã© sempre 0)
print(frutas[2])       # "pera"
print(frutas[-1])      # "pera" (Ã­ndice negativo conta a partir do fim!)
print(len(frutas))     # 3 (nÃºmero de elementos)
\`\`\`

Os Ã­ndices negativos sÃ£o uma conveniÃªncia do Python que o JavaScript nÃ£o tem diretamente: \`-1\` Ã© sempre o Ãºltimo elemento.

## Adicionar e remover elementos

\`\`\`python
numeros = [1, 2, 3]

numeros.append(4)     # adiciona no fim: [1, 2, 3, 4]
numeros.pop()          # remove e devolve o Ãºltimo: [1, 2, 3]
numeros.insert(0, 0)   # insere na posiÃ§Ã£o 0: [0, 1, 2, 3]
numeros.remove(2)      # remove o VALOR 2 (nÃ£o o Ã­ndice): [0, 1, 3]
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

As **list comprehensions** sÃ£o a forma mais comum, em Python, de transformar uma lista noutra â€” equivalem ao \`.map()\` do JavaScript, mas com uma sintaxe prÃ³pria.

## Filtrar uma lista (equivalente ao filter)

\`\`\`python
idades = [12, 18, 25, 16, 30]
adultos = [idade for idade in idades if idade >= 18]

print(adultos)  # [18, 25, 30]
\`\`\`

## Fatiar uma lista (slicing)

\`\`\`python
numeros = [0, 1, 2, 3, 4, 5]
print(numeros[1:4])   # [1, 2, 3] (do Ã­ndice 1 atÃ© ao 3, sem incluir o 4)
print(numeros[:3])    # [0, 1, 2] (do inÃ­cio atÃ© ao Ã­ndice 2)
print(numeros[3:])    # [3, 4, 5] (do Ã­ndice 3 atÃ© ao fim)
\`\`\`

## ExercÃ­cio proposto

Cria uma lista com as notas de 5 alunos. Usa uma list comprehension para criar uma nova lista sÃ³ com as notas de aprovado (\`>= 10\`), e percorre-a com um \`for\` para mostrar cada uma.`,
  },
  {
    ordem: 9,
    titulo: 'DicionÃ¡rios em Python',
    descricao: 'O equivalente Python aos objetos: coleÃ§Ãµes chave-valor.',
    conteudo: `# DicionÃ¡rios em Python

Um dicionÃ¡rio (\`dict\`) Ã© o equivalente Python a um objeto â€” uma coleÃ§Ã£o de dados organizados em pares **chave: valor**.

## Criar e aceder a um dicionÃ¡rio

\`\`\`python
utilizador = {
    "nome": "Sofia",
    "idade": 22,
    "ativo": True,
}

print(utilizador["nome"])       # "Sofia" (acesso por chave, com parÃªnteses retos)
print(utilizador.get("idade"))  # 22 (forma mais segura: nÃ£o dÃ¡ erro se a chave nÃ£o existir)
\`\`\`

Ao contrÃ¡rio do JavaScript (que tem notaÃ§Ã£o de ponto \`objeto.propriedade\`), em Python acede-se **sempre** com parÃªnteses retos \`dicionario["chave"]\`, ou com o mÃ©todo \`.get()\`.

## Alterar e adicionar entradas

\`\`\`python
utilizador["idade"] = 23        # altera um valor existente
utilizador["cidade"] = "Aveiro"  # adiciona uma entrada nova
del utilizador["ativo"]          # remove uma entrada
\`\`\`

## Percorrer um dicionÃ¡rio

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
    print("NÃ£o tem idade definida")
\`\`\`

## DicionÃ¡rios com listas (e vice-versa)

\`\`\`python
modulo = {
    "titulo": "DicionÃ¡rios",
    "perguntas": ["O que Ã© um dicionÃ¡rio?", "Como aceder a um valor?"],
}

print(modulo["perguntas"][0])       # "O que Ã© um dicionÃ¡rio?"
print(len(modulo["perguntas"]))     # 2
\`\`\`

Ã‰ muito comum, em programas reais, teres listas de dicionÃ¡rios â€” por exemplo, uma lista de utilizadores, cada um com nome, email e XP.

## ExercÃ­cio proposto

Cria um dicionÃ¡rio \`jogador\` com as chaves \`nome\`, \`xp\` e \`nivel\`. Escreve uma funÃ§Ã£o \`ganhar_xp(jogador, quantidade)\` que soma XP ao dicionÃ¡rio do jogador e mostra o novo total com \`print()\`.`,
  },
  {
    ordem: 10,
    titulo: 'Tratamento de Erros em Python',
    descricao: 'Como lidar com erros de forma controlada com try/except.',
    conteudo: `# Tratamento de Erros em Python

Nem sempre o cÃ³digo corre como esperado â€” um utilizador pode inserir texto onde se esperava um nÃºmero, um ficheiro pode nÃ£o existir, uma divisÃ£o pode ser por zero. Python usa **exceÃ§Ãµes** para lidar com estas situaÃ§Ãµes de forma controlada.

## O que acontece sem tratamento de erros

\`\`\`python
numero = int("abc")  # ValueError: nÃ£o Ã© possÃ­vel converter "abc" para nÃºmero
print("Esta linha nunca Ã© executada")
\`\`\`

Sem tratamento, um erro deste tipo interrompe o programa por completo.

## try / except

\`\`\`python
try:
    numero = int(input("Introduz um nÃºmero: "))
    print("O dobro Ã©", numero * 2)
except ValueError:
    print("Isso nÃ£o Ã© um nÃºmero vÃ¡lido!")
\`\`\`

O cÃ³digo dentro do \`try\` Ã© executado normalmente; se ocorrer um erro do tipo indicado no \`except\`, o programa salta para esse bloco em vez de terminar.

## Apanhar vÃ¡rios tipos de erro

\`\`\`python
try:
    resultado = 10 / int(input("Divide por: "))
    print(resultado)
except ValueError:
    print("Introduz um nÃºmero vÃ¡lido.")
except ZeroDivisionError:
    print("NÃ£o podes dividir por zero!")
\`\`\`

## else e finally

\`\`\`python
try:
    numero = int("42")
except ValueError:
    print("Erro na conversÃ£o")
else:
    print("ConversÃ£o feita com sucesso:", numero)  # sÃ³ corre se NÃƒO houve erro
finally:
    print("Isto corre sempre, com ou sem erro")
\`\`\`

## LanÃ§ar os teus prÃ³prios erros

\`\`\`python
def levantar_idade(idade):
    if idade < 0:
        raise ValueError("A idade nÃ£o pode ser negativa")
    return idade

try:
    levantar_idade(-5)
except ValueError as erro:
    print("Erro:", erro)
\`\`\`

\`raise\` Ã© o equivalente Python ao \`throw\` do JavaScript.

## ExercÃ­cio proposto

Escreve uma funÃ§Ã£o \`dividir(a, b)\` que devolva \`a / b\`, mas usa \`try/except\` para apanhar o erro \`ZeroDivisionError\` e devolver uma mensagem de erro amigÃ¡vel em vez de deixar o programa rebentar.`,
  },
];

// ------------------------------------------------------------
// Quizzes (5 perguntas por mÃ³dulo, 1 alternativa correta cada)
// ------------------------------------------------------------
const quizzes = [
  {
    moduloOrdem: 1,
    titulo: 'Quiz: IntroduÃ§Ã£o ao Python',
    perguntas: [
      {
        enunciado: 'Como Ã© que o Python delimita blocos de cÃ³digo (em vez de chavetas)?',
        explicacao: 'Python usa a indentaÃ§Ã£o (espaÃ§os no inÃ­cio da linha) para definir onde comeÃ§a e acaba um bloco de cÃ³digo.',
        alternativas: [
          { texto: 'Com chavetas {}', correta: false },
          { texto: 'Com indentaÃ§Ã£o (espaÃ§os)', correta: true },
          { texto: 'Com parÃªnteses ()', correta: false },
          { texto: 'NÃ£o delimita, tudo corre em sequÃªncia', correta: false },
        ],
      },
      {
        enunciado: 'Qual funÃ§Ã£o mostra texto na consola em Python?',
        explicacao: '`print()` Ã© a funÃ§Ã£o usada para escrever valores na consola em Python.',
        alternativas: [
          { texto: 'console.log()', correta: false },
          { texto: 'print()', correta: true },
          { texto: 'echo()', correta: false },
          { texto: 'display()', correta: false },
        ],
      },
      {
        enunciado: 'Como se escreve um comentÃ¡rio de uma linha em Python?',
        explicacao: 'O sÃ­mbolo `#` transforma o resto da linha num comentÃ¡rio, que o Python ignora ao executar.',
        alternativas: [
          { texto: '// comentÃ¡rio', correta: false },
          { texto: '<!-- comentÃ¡rio -->', correta: false },
          { texto: '# comentÃ¡rio', correta: true },
          { texto: '** comentÃ¡rio **', correta: false },
        ],
      },
      {
        enunciado: 'O que Ã© o Python, em termos de execuÃ§Ã£o do cÃ³digo?',
        explicacao: 'O Python Ã© interpretado: um interpretador lÃª e executa o cÃ³digo linha a linha, sem precisar de compilaÃ§Ã£o prÃ©via.',
        alternativas: [
          { texto: 'Uma linguagem compilada, como o C', correta: false },
          { texto: 'Uma linguagem interpretada', correta: true },
          { texto: 'Uma linguagem de marcaÃ§Ã£o, como o HTML', correta: false },
          { texto: 'Uma linguagem exclusiva para bases de dados', correta: false },
        ],
      },
      {
        enunciado: 'O que acontece se misturares indentaÃ§Ãµes diferentes dentro do mesmo bloco em Python?',
        explicacao: 'Todas as linhas de um mesmo bloco tÃªm de ter a mesma indentaÃ§Ã£o; misturar indentaÃ§Ãµes diferentes causa um erro.',
        alternativas: [
          { texto: 'O Python ajusta automaticamente', correta: false },
          { texto: 'Causa um erro', correta: true },
          { texto: 'Ã‰ ignorado sem qualquer efeito', correta: false },
          { texto: 'SÃ³ funciona se usares tabs, nunca espaÃ§os', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 2,
    titulo: 'Quiz: VariÃ¡veis em Python',
    perguntas: [
      {
        enunciado: 'Como se cria uma variÃ¡vel em Python?',
        explicacao: 'Em Python basta atribuir um valor a um nome â€” nÃ£o Ã© preciso usar `let`, `const` ou `var` como em JavaScript.',
        alternativas: [
          { texto: 'let idade = 25', correta: false },
          { texto: 'var idade = 25', correta: false },
          { texto: 'idade = 25', correta: true },
          { texto: 'int idade = 25', correta: false },
        ],
      },
      {
        enunciado: 'Qual Ã© a convenÃ§Ã£o de nomenclatura mais usada para variÃ¡veis em Python?',
        explicacao: 'A convenÃ§Ã£o Python para nomes de variÃ¡veis Ã© snake_case (palavras separadas por underscore), ao contrÃ¡rio do camelCase do JavaScript.',
        alternativas: [
          { texto: 'camelCase (nomeCompleto)', correta: false },
          { texto: 'snake_case (nome_completo)', correta: true },
          { texto: 'PascalCase (NomeCompleto)', correta: false },
          { texto: 'kebab-case (nome-completo)', correta: false },
        ],
      },
      {
        enunciado: 'O que faz `x, y, z = 1, 2, 3` em Python?',
        explicacao: 'Esta Ã© a atribuiÃ§Ã£o mÃºltipla: atribui 1 a x, 2 a y e 3 a z, tudo numa sÃ³ linha.',
        alternativas: [
          { texto: 'Cria uma lista [1, 2, 3]', correta: false },
          { texto: 'DÃ¡ erro de sintaxe', correta: false },
          { texto: 'Atribui 1 a x, 2 a y e 3 a z', correta: true },
          { texto: 'Atribui a mesma soma (6) Ã s trÃªs variÃ¡veis', correta: false },
        ],
      },
      {
        enunciado: 'Como se sinaliza, por convenÃ§Ã£o, que uma variÃ¡vel nÃ£o devia ser alterada?',
        explicacao: 'Python nÃ£o tem `const`; por convenÃ§Ã£o usa-se o nome todo em maiÃºsculas para sinalizar que nÃ£o devia mudar, mas isso nÃ£o Ã© imposto pela linguagem.',
        alternativas: [
          { texto: 'Com a palavra-chave const', correta: false },
          { texto: 'Escrevendo o nome todo em maiÃºsculas', correta: true },
          { texto: 'NÃ£o Ã© possÃ­vel sinalizar isso de forma alguma', correta: false },
          { texto: 'Com a palavra-chave final', correta: false },
        ],
      },
      {
        enunciado: 'Python Ã© sensÃ­vel a maiÃºsculas/minÃºsculas nos nomes de variÃ¡veis?',
        explicacao: '`idade` e `Idade` sÃ£o consideradas duas variÃ¡veis diferentes em Python, tal como em JavaScript.',
        alternativas: [
          { texto: 'Sim, "idade" e "Idade" sÃ£o variÃ¡veis diferentes', correta: true },
          { texto: 'NÃ£o, maiÃºsculas e minÃºsculas sÃ£o tratadas da mesma forma', correta: false },
          { texto: 'SÃ³ Ã© sensÃ­vel dentro de funÃ§Ãµes', correta: false },
          { texto: 'Depende da versÃ£o do Python', correta: false },
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
        explicacao: 'NÃºmeros com casas decimais sÃ£o do tipo `float` em Python, diferente de `int` (nÃºmeros inteiros).',
        alternativas: [
          { texto: "<class 'int'>", correta: false },
          { texto: "<class 'float'>", correta: true },
          { texto: "<class 'number'>", correta: false },
          { texto: "<class 'decimal'>", correta: false },
        ],
      },
      {
        enunciado: 'Qual destas Ã© uma f-string vÃ¡lida que insere uma variÃ¡vel num texto?',
        explicacao: 'As f-strings (com "f" antes das aspas) permitem inserir variÃ¡veis diretamente com `{}`.',
        alternativas: [
          { texto: '"OlÃ¡, " + nome + "!"', correta: false },
          { texto: 'f"OlÃ¡, {nome}!"', correta: true },
          { texto: '"OlÃ¡, %nome%!"', correta: false },
          { texto: 'string.format("OlÃ¡, nome!")', correta: false },
        ],
      },
      {
        enunciado: 'O que acontece ao tentar correr `5 + "3"` em Python?',
        explicacao: 'Ao contrÃ¡rio do JavaScript, o Python nÃ£o converte tipos automaticamente ao somar um nÃºmero com uma string â€” dÃ¡ erro (TypeError).',
        alternativas: [
          { texto: 'Devolve 8', correta: false },
          { texto: 'Devolve "53"', correta: false },
          { texto: 'DÃ¡ erro (TypeError)', correta: true },
          { texto: 'Devolve None', correta: false },
        ],
      },
      {
        enunciado: 'Qual Ã© o valor usado em Python para representar "sem valor" (equivalente a null/undefined)?',
        explicacao: 'Python usa apenas `None` para representar ausÃªncia de valor, sem distinguir null de undefined como o JavaScript.',
        alternativas: [
          { texto: 'null', correta: false },
          { texto: 'undefined', correta: false },
          { texto: 'None', correta: true },
          { texto: 'empty', correta: false },
        ],
      },
      {
        enunciado: 'Como se converte a string "25" para o nÃºmero 25 em Python?',
        explicacao: '`int()` converte um valor compatÃ­vel para o tipo inteiro.',
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
        explicacao: 'O operador `//` Ã© a divisÃ£o inteira: arredonda sempre para baixo, por isso 10 // 3 dÃ¡ 3.',
        alternativas: [
          { texto: '3.33', correta: false },
          { texto: '3', correta: true },
          { texto: '1', correta: false },
          { texto: '4', correta: false },
        ],
      },
      {
        enunciado: 'Como se escreve o operador lÃ³gico "E" (AND) em Python?',
        explicacao: 'Em Python, os operadores lÃ³gicos escrevem-se por extenso: `and`, `or` e `not`, em vez de sÃ­mbolos como `&&`.',
        alternativas: [
          { texto: '&&', correta: false },
          { texto: 'and', correta: true },
          { texto: 'AND', correta: false },
          { texto: '&', correta: false },
        ],
      },
      {
        enunciado: 'O que acontece com `5 == "5"` em Python?',
        explicacao: 'Ao contrÃ¡rio do `==` em JavaScript, o `==` do Python nÃ£o converte tipos: um int nunca Ã© igual a uma string com o mesmo dÃ­gito.',
        alternativas: [
          { texto: 'True, porque o valor Ã© o mesmo', correta: false },
          { texto: 'False, porque os tipos sÃ£o diferentes', correta: true },
          { texto: 'DÃ¡ erro de sintaxe', correta: false },
          { texto: 'Depende da versÃ£o do Python', correta: false },
        ],
      },
      {
        enunciado: 'Qual Ã© o resultado de `pontos += 5` se `pontos` valia 10?',
        explicacao: '`+=` Ã© um atalho para `pontos = pontos + 5`, logo o novo valor Ã© 15, tal como em JavaScript.',
        alternativas: [
          { texto: '5', correta: false },
          { texto: '10', correta: false },
          { texto: '15', correta: true },
          { texto: '50', correta: false },
        ],
      },
      {
        enunciado: 'Python tem um operador equivalente ao `===` do JavaScript?',
        explicacao: 'NÃ£o Ã© necessÃ¡rio: o `==` do Python jÃ¡ compara sempre valor e tipo, sem conversÃµes implÃ­citas, por isso nÃ£o existe uma versÃ£o "estrita" separada.',
        alternativas: [
          { texto: 'Sim, chama-se ===', correta: false },
          { texto: 'Sim, chama-se is', correta: false },
          { texto: 'NÃ£o Ã© necessÃ¡rio, o == jÃ¡ compara valor e tipo', correta: true },
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
        enunciado: 'Como se escreve "senÃ£o se" em Python?',
        explicacao: 'Python usa a palavra-chave `elif`, contraÃ§Ã£o de "else if".',
        alternativas: [
          { texto: 'else if', correta: false },
          { texto: 'elseif', correta: false },
          { texto: 'elif', correta: true },
          { texto: 'elsif', correta: false },
        ],
      },
      {
        enunciado: 'O que Ã© obrigatÃ³rio no final da linha de um `if` em Python?',
        explicacao: 'A linha do `if` (e de `elif`, `else`, `for`, `while`, `def`) termina sempre com dois pontos `:`.',
        alternativas: [
          { texto: 'Uma chaveta {', correta: false },
          { texto: 'Um ponto e vÃ­rgula ;', correta: false },
          { texto: 'Dois pontos :', correta: true },
          { texto: 'Nada, a linha termina sem sÃ­mbolo', correta: false },
        ],
      },
      {
        enunciado: 'Python tem uma instruÃ§Ã£o `switch` tradicional?',
        explicacao: 'Nas versÃµes mais usadas em contexto de aprendizagem, o Python nÃ£o tem `switch` â€” usa-se uma sequÃªncia de `if/elif` como alternativa.',
        alternativas: [
          { texto: 'Sim, igual ao JavaScript', correta: false },
          { texto: 'NÃ£o, usa-se if/elif como alternativa', correta: true },
          { texto: 'Sim, mas chama-se case', correta: false },
          { texto: 'SÃ³ existe dentro de funÃ§Ãµes', correta: false },
        ],
      },
      {
        enunciado: 'O que devolve `"adulto" if idade >= 18 else "menor"` se `idade = 20`?',
        explicacao: 'Esta Ã© a expressÃ£o condicional numa linha do Python; como 20 >= 18 Ã© verdadeiro, devolve "adulto".',
        alternativas: [
          { texto: '"menor"', correta: false },
          { texto: '"adulto"', correta: true },
          { texto: 'True', correta: false },
          { texto: 'DÃ¡ erro de sintaxe', correta: false },
        ],
      },
      {
        enunciado: 'Quantos blocos de um `if/elif/elif/else` podem ser executados numa sÃ³ verificaÃ§Ã£o?',
        explicacao: 'Tal como no JavaScript, apenas o primeiro bloco cuja condiÃ§Ã£o for verdadeira Ã© executado; os restantes sÃ£o ignorados.',
        alternativas: [
          { texto: 'Todos os blocos cuja condiÃ§Ã£o seja verdadeira', correta: false },
          { texto: 'Apenas o primeiro bloco cuja condiÃ§Ã£o for verdadeira', correta: true },
          { texto: 'Sempre todos os blocos, um a seguir ao outro', correta: false },
          { texto: 'Nenhum, Ã© preciso usar match para isso', correta: false },
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
        explicacao: '`range(5)` gera os nÃºmeros de 0 a 4 (5 nÃºmeros, comeÃ§ando em 0).',
        alternativas: [
          { texto: 'Os nÃºmeros de 1 a 5', correta: false },
          { texto: 'Os nÃºmeros de 0 a 4', correta: true },
          { texto: 'Os nÃºmeros de 0 a 5', correta: false },
          { texto: 'Uma lista vazia', correta: false },
        ],
      },
      {
        enunciado: 'Python tem uma instruÃ§Ã£o `do...while` nativa?',
        explicacao: 'Python nÃ£o tem `do...while` â€” para simular "executa pelo menos uma vez", usa-se `while True` com um `break` condicional.',
        alternativas: [
          { texto: 'Sim, igual ao JavaScript', correta: false },
          { texto: 'NÃ£o, simula-se com while True e break', correta: true },
          { texto: 'Sim, mas chama-se repeat', correta: false },
          { texto: 'SÃ³ existe em versÃµes antigas do Python', correta: false },
        ],
      },
      {
        enunciado: 'Como se percorre diretamente cada elemento de uma lista em Python?',
        explicacao: '`for elemento in lista` dÃ¡ acesso direto a cada valor, sem precisares de um Ã­ndice.',
        alternativas: [
          { texto: 'for (let i = 0; i < lista.length; i++)', correta: false },
          { texto: 'for elemento in lista:', correta: true },
          { texto: 'foreach elemento in lista:', correta: false },
          { texto: 'loop elemento in lista:', correta: false },
        ],
      },
      {
        enunciado: 'O que faz `continue` dentro de um ciclo em Python?',
        explicacao: '`continue` salta o resto do cÃ³digo dessa iteraÃ§Ã£o e avanÃ§a diretamente para a prÃ³xima, tal como em JavaScript.',
        alternativas: [
          { texto: 'Termina o ciclo por completo', correta: false },
          { texto: 'Salta para a prÃ³xima iteraÃ§Ã£o', correta: true },
          { texto: 'Reinicia a variÃ¡vel de controlo', correta: false },
          { texto: 'SÃ³ funciona dentro de uma funÃ§Ã£o', correta: false },
        ],
      },
      {
        enunciado: 'O que gera `range(0, 10, 2)`?',
        explicacao: 'O terceiro argumento de `range()` Ã© o "passo" â€” aqui gera 0, 2, 4, 6, 8 (de 2 em 2, atÃ© antes de 10).',
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
    titulo: 'Quiz: FunÃ§Ãµes em Python',
    perguntas: [
      {
        enunciado: 'Qual palavra-chave define uma funÃ§Ã£o em Python?',
        explicacao: '`def` Ã© a palavra-chave usada para definir uma funÃ§Ã£o em Python.',
        alternativas: [
          { texto: 'function', correta: false },
          { texto: 'def', correta: true },
          { texto: 'func', correta: false },
          { texto: 'fn', correta: false },
        ],
      },
      {
        enunciado: 'O que devolve uma funÃ§Ã£o Python que nÃ£o tem `return`?',
        explicacao: 'Sem `return`, uma funÃ§Ã£o em Python devolve `None`, o equivalente ao `undefined` do JavaScript.',
        alternativas: [
          { texto: 'DÃ¡ sempre erro', correta: false },
          { texto: 'None', correta: true },
          { texto: '0', correta: false },
          { texto: 'Uma string vazia', correta: false },
        ],
      },
      {
        enunciado: 'O que sÃ£o "keyword arguments" em Python?',
        explicacao: 'Keyword arguments permitem passar argumentos indicando o nome do parÃ¢metro, em qualquer ordem â€” algo sem equivalente direto no JavaScript.',
        alternativas: [
          { texto: 'Argumentos passados por nome, em qualquer ordem', correta: true },
          { texto: 'Palavras reservadas que nÃ£o podem ser parÃ¢metros', correta: false },
          { texto: 'Argumentos que sÃ³ aceitam texto', correta: false },
          { texto: 'Um tipo de erro de sintaxe', correta: false },
        ],
      },
      {
        enunciado: 'Qual destas Ã© uma funÃ§Ã£o lambda vÃ¡lida que soma dois nÃºmeros?',
        explicacao: 'As funÃ§Ãµes lambda usam a sintaxe `lambda parametros: expressao`, sem `def` nem `return`.',
        alternativas: [
          { texto: 'lambda a, b: a + b', correta: true },
          { texto: 'lambda(a, b) => a + b', correta: false },
          { texto: 'def lambda(a, b): return a + b', correta: false },
          { texto: 'function(a, b) = a + b', correta: false },
        ],
      },
      {
        enunciado: 'Qual Ã© uma limitaÃ§Ã£o das funÃ§Ãµes lambda em Python?',
        explicacao: 'Uma lambda sÃ³ pode conter uma Ãºnica expressÃ£o â€” para lÃ³gica mais complexa (vÃ¡rias linhas, condiÃ§Ãµes, ciclos), tens de usar `def`.',
        alternativas: [
          { texto: 'NÃ£o podem receber parÃ¢metros', correta: false },
          { texto: 'SÃ³ podem ter uma expressÃ£o', correta: true },
          { texto: 'NÃ£o podem ser guardadas numa variÃ¡vel', correta: false },
          { texto: 'SÃ³ funcionam com nÃºmeros', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 8,
    titulo: 'Quiz: Listas em Python',
    perguntas: [
      {
        enunciado: 'O que devolve `frutas[-1]` se `frutas = ["maÃ§Ã£", "banana", "pera"]`?',
        explicacao: 'Ãndices negativos contam a partir do fim da lista; `-1` Ã© sempre o Ãºltimo elemento, neste caso "pera".',
        alternativas: [
          { texto: '"maÃ§Ã£"', correta: false },
          { texto: '"banana"', correta: false },
          { texto: '"pera"', correta: true },
          { texto: 'DÃ¡ erro', correta: false },
        ],
      },
      {
        enunciado: 'Qual mÃ©todo adiciona um elemento ao FIM de uma lista em Python?',
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
        explicacao: 'Isto Ã© uma list comprehension, equivalente ao `.map()` do JavaScript: devolve uma nova lista com cada elemento multiplicado por 2.',
        alternativas: [
          { texto: '[1, 2, 3]', correta: false },
          { texto: '[2, 4, 6]', correta: true },
          { texto: '6', correta: false },
          { texto: 'DÃ¡ erro de sintaxe', correta: false },
        ],
      },
      {
        enunciado: 'O que devolve `numeros[1:4]` se `numeros = [0, 1, 2, 3, 4, 5]`?',
        explicacao: 'O "slicing" `[1:4]` devolve os elementos do Ã­ndice 1 atÃ© ao 3 (sem incluir o Ã­ndice 4): [1, 2, 3].',
        alternativas: [
          { texto: '[1, 2, 3]', correta: true },
          { texto: '[1, 2, 3, 4]', correta: false },
          { texto: '[0, 1, 2, 3]', correta: false },
          { texto: '[4]', correta: false },
        ],
      },
      {
        enunciado: 'Qual a diferenÃ§a entre `.remove(2)` e `.pop(2)` numa lista?',
        explicacao: '`.remove(valor)` remove a primeira ocorrÃªncia desse VALOR; `.pop(indice)` remove o elemento nessa POSIÃ‡ÃƒO.',
        alternativas: [
          { texto: 'NÃ£o hÃ¡ diferenÃ§a nenhuma', correta: false },
          { texto: '.remove() apaga por valor; .pop() apaga por Ã­ndice', correta: true },
          { texto: '.remove() sÃ³ funciona com nÃºmeros', correta: false },
          { texto: '.pop() apaga a lista toda', correta: false },
        ],
      },
    ],
  },
  {
    moduloOrdem: 9,
    titulo: 'Quiz: DicionÃ¡rios em Python',
    perguntas: [
      {
        enunciado: 'Como se organiza a informaÃ§Ã£o dentro de um dicionÃ¡rio em Python?',
        explicacao: 'Um dicionÃ¡rio organiza dados em pares chave: valor, tal como um objeto em JavaScript.',
        alternativas: [
          { texto: 'Em pares chave: valor', correta: true },
          { texto: 'SÃ³ por posiÃ§Ã£o, como uma lista', correta: false },
          { texto: 'SÃ³ pode guardar nÃºmeros', correta: false },
          { texto: 'Em linhas e colunas, como uma tabela', correta: false },
        ],
      },
      {
        enunciado: 'Dado `pessoa = {"nome": "Rui"}`, como acedemos ao nome?',
        explicacao: 'Em Python, acede-se sempre a um dicionÃ¡rio com parÃªnteses retos: `pessoa["nome"]`.',
        alternativas: [
          { texto: 'pessoa.nome', correta: false },
          { texto: 'pessoa["nome"]', correta: true },
          { texto: 'pessoa->nome', correta: false },
          { texto: 'pessoa::nome', correta: false },
        ],
      },
      {
        enunciado: 'Qual a vantagem de usar `.get("idade")` em vez de `["idade"]` num dicionÃ¡rio?',
        explicacao: '`.get()` nÃ£o gera erro se a chave nÃ£o existir (devolve None por omissÃ£o); aceder com `[]` a uma chave inexistente causa um erro (KeyError).',
        alternativas: [
          { texto: 'NÃ£o hÃ¡ vantagem nenhuma, sÃ£o idÃªnticos', correta: false },
          { texto: '.get() nÃ£o dÃ¡ erro se a chave nÃ£o existir', correta: true },
          { texto: '.get() sÃ³ funciona com nÃºmeros', correta: false },
          { texto: '.get() Ã© mais lento mas mais seguro', correta: false },
        ],
      },
      {
        enunciado: 'O que faz `.items()` num dicionÃ¡rio?',
        explicacao: '`.items()` devolve pares (chave, valor), permitindo percorrer ambos ao mesmo tempo num `for`.',
        alternativas: [
          { texto: 'Devolve sÃ³ as chaves', correta: false },
          { texto: 'Devolve sÃ³ os valores', correta: false },
          { texto: 'Devolve pares (chave, valor)', correta: true },
          { texto: 'Apaga todas as entradas', correta: false },
        ],
      },
      {
        enunciado: 'Como se remove uma entrada de um dicionÃ¡rio em Python?',
        explicacao: 'A palavra-chave `del` remove uma entrada especÃ­fica de um dicionÃ¡rio pela sua chave.',
        alternativas: [
          { texto: 'dicionario.remove("chave")', correta: false },
          { texto: 'del dicionario["chave"]', correta: true },
          { texto: 'dicionario["chave"] = remove', correta: false },
          { texto: 'NÃ£o Ã© possÃ­vel remover entradas', correta: false },
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
        explicacao: 'Sem um bloco try/except, um erro (exceÃ§Ã£o) interrompe o programa por completo.',
        alternativas: [
          { texto: 'O programa continua normalmente, ignorando o erro', correta: false },
          { texto: 'O programa Ã© interrompido', correta: true },
          { texto: 'O erro Ã© corrigido automaticamente', correta: false },
          { texto: 'O Python reinicia o script sozinho', correta: false },
        ],
      },
      {
        enunciado: 'Qual bloco contÃ©m o cÃ³digo que pode gerar um erro, em Python?',
        explicacao: 'O cÃ³digo que pode falhar Ã© colocado dentro do bloco `try`; se ocorrer um erro do tipo indicado, salta para o `except` correspondente.',
        alternativas: [
          { texto: 'except', correta: false },
          { texto: 'try', correta: true },
          { texto: 'catch', correta: false },
          { texto: 'error', correta: false },
        ],
      },
      {
        enunciado: 'Quando Ã© que o bloco `else` de um try/except/else Ã© executado?',
        explicacao: 'O bloco `else` sÃ³ corre se o `try` terminar SEM nenhum erro.',
        alternativas: [
          { texto: 'Sempre, independentemente de haver erro ou nÃ£o', correta: false },
          { texto: 'SÃ³ se NÃƒO ocorrer nenhum erro no try', correta: true },
          { texto: 'SÃ³ se ocorrer um erro no try', correta: false },
          { texto: 'Nunca Ã© executado automaticamente', correta: false },
        ],
      },
      {
        enunciado: 'O que faz o bloco `finally` num try/except?',
        explicacao: '`finally` executa sempre, quer tenha havido erro quer nÃ£o â€” Ã© usado tipicamente para libertar recursos.',
        alternativas: [
          { texto: 'SÃ³ corre se houver erro', correta: false },
          { texto: 'SÃ³ corre se NÃƒO houver erro', correta: false },
          { texto: 'Corre sempre, com ou sem erro', correta: true },
          { texto: 'Substitui o bloco try', correta: false },
        ],
      },
      {
        enunciado: 'Qual palavra-chave usas para lanÃ§ar um erro propositadamente em Python?',
        explicacao: '`raise` Ã© o equivalente Python ao `throw` do JavaScript, usado para lanÃ§ar exceÃ§Ãµes manualmente.',
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
    console.log('A criar/atualizar mÃ³dulos de Python...');
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
      console.log(`  âœ“ ${modulo.titulo} (id=${modulo.id})`);
    }

    console.log('A recriar quizzes de Python (5 perguntas cada)...');
    for (const quiz of quizzes) {
      const modulo = modulos.find((m) => m.ordem === quiz.moduloOrdem);
      if (!modulo) {
        console.warn(`MÃ³dulo Python com ordem ${quiz.moduloOrdem} nÃ£o encontrado, a saltar.`);
        continue;
      }
      const moduloId = modulo.id;

      // Remove quiz(zes) antigo(s) deste mÃ³dulo (cascata apaga perguntas/alternativas)
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
      console.log(`  âœ“ ${quiz.titulo} (${quiz.perguntas.length} perguntas)`);
    }

    console.log('ConcluÃ­do com sucesso.');
  } finally {
    conn.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error('Erro ao popular conteÃºdo Python:', err);
  process.exit(1);
});

