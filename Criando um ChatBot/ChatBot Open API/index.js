import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const configuration = new Configuration({
    organization: "org-3PJCH0Rk1V7Ha7x9MKTGhxWV",
    apiKey: "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"
});

const openai = new OpenAIApi(configuration);

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

userInterface.prompt();

userInterface.on("line", async (input) => {
    await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: input}],
    })
    .then((res) => {
        console.log(res.data.choices[0].message.content);
        userInterface.prompt();
    })
    .catch((e) => {
        console.log(e);
    })
});