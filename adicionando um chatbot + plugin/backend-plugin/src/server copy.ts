import { fastify } from "fastify";
import { gptSendMessage } from "./routes/gpt-send"
const app = fastify()

app.register(gptSendMessage)
app.get('/', () => {
    return 'hello world'
})

app.listen({
    port: 3333,
}).then(() => {
    console.log('listening on port 3333')
})