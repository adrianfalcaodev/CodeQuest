import Card from "../components/card";
import Button from "../components/button";
import "../style/App.css"

export default function LinguagensPage() {
  return (
    <>
      <h1>Selecione uma das categorias para começar sua jornada</h1>
      <br />
      <Card title="HTML e CSS" subtitle="Aprenda a criar a estrutura de uma página web com HTML e como modificar sua aparencia visual com o CSS.">
        <Button clickFunction>Iniciar</Button>
      </Card>

      <Card title="Javascript" subtitle="Javascript é uma linguagem muito utilizada para a criação de páginas web.">
        <Button clickFunction>Iniciar</Button>
      </Card>

      <Card
        title="Banco de Dados Relacional"
        subtitle="Aprenda a criar um sistema que guarda e organiza a informação em tabelas com linhas e colunas, ligadas entre si por relações lógicas."
      >
        <Button clickFunction>Iniciar</Button>
      </Card>
      <Card
        title="Backend"
        subtitle="Aprenda a criar o backend que é a parte de um sistema ou site que opera nos bastidores. Ele é responsável por gerenciar a lógica de negócios, o processamento de dados e a comunicação com bases de dados"
      >
        <Button clickFunction>Iniciar</Button>
      </Card>
    </>
  );
}
