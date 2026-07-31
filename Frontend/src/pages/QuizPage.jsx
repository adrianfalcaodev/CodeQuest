import Button from "../components/button";
import Card from "../components/card";
import "../style/Page.css";

export default function QuizPage() {
  return (
    <>
      <h1>Pagina dos Quizzes</h1>
      <Card></Card>
      <div className="page">
        <div className="centerboard">
          <div className="modulo">
            <Card title="Quiz" subtitle="Pergunta">
              <div className="container">
                <div>
                  <Button className="alternativa">Alternativa1</Button>
                  <Button className="alternativa">Alternativa2</Button>
                </div>
                <div>
                  <Button className="alternativa">Alternativa3</Button>
                  <Button className="alternativa">Alternativa4</Button>
                    <br />
                    <br />
                  <div><Button>Próximo</Button></div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
