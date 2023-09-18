import axios from 'axios';
import { FastifyInstance } from 'fastify'

export async function gptSendMessage(app: FastifyInstance) {
    app.post('/chatbot', async (request, reply) => {
        const prompt = (request.body as any).prompt;

        try{
            const response = await
            axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
                prompt,
                max_tokens: 60
            }, {
                headers: {
                    'Authorization': `Bearer YOUR_OPEN_AI_KEY`
                }
            })
            reply.send(response.data.choices[0].text.trim());
        }catch(err){
            reply.status(500).send({err: err.toString() })
        }
    })
}