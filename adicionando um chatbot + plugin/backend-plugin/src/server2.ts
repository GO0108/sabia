import OpenAI from 'openai';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3333;
app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (request, response) => {
    const { messages } = request.body;
    console.log(request.body);


  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        "role": "system",
        "content": "Você se chama sabIA, um assistente para responder perguntas gerais com eficiência e pontualidade.",
      },
      ...messages,
    ],
  });

  response.json({
    message: result.choices[0].message,
  });
  console.log(result.choices[0].message);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});