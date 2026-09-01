# Conteúdo da base de dados

Depois de importar `schema.sql` e `seed.sql`, executa o comando seguinte para
adicionar ou atualizar os 10 módulos de Python e os respetivos quizzes:

```bash
npm run seed:python
```

O script é idempotente: pode ser executado novamente sem duplicar módulos ou
quizzes. Usa as credenciais configuradas no ficheiro `.env` do Backend.
