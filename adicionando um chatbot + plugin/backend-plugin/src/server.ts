// backend/src/server.ts
import fastify, { FastifyRequest, FastifyReply } from 'fastify';
import axios from 'axios';
import fastifyCors from '@fastify/cors';

const API_KEY = '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';

const systemMessage = {
  role: 'system',
  content: 'Explain things like you\'re talking to a software professional with 2 years of experience.'
};

const server = fastify({ logger: true });

server.register(fastifyCors, {
    origin: 'http://localhost:3000', // Especifique a origem permitida (o frontend)
    methods: ['GET', 'POST'], // Especifique os métodos permitidos
  });

server.post('/api/chat', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { messages } = request.body as { messages: Array<any> };

    if (!Array.isArray(messages)) {
      throw new Error('Messages should be an array');
    }

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...messages],
    };

    const response = await axios.post('https://api.openai.com/v1/chat/completions', apiRequestBody, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = response.data;
    const chatResponse = data.choices[0].message.content;

    reply.send({ message: chatResponse });
  } catch (error) {
    console.error('Error:', error);
    reply.status(500).send({ error: 'An error occurred' });
  }
});

server.listen(3333, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
