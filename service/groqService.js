import Groq from "groq-sdk";
import 'dotenv/config';
import * as dotenv from "dotenv";
dotenv.config();
const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

async function generateConfig(config) {

    const prompt = `Generate a simple Dockerfile for a ${config.language} application using the ${config.framework} framework. It should: use the official ${config.language} LTS image; copy all necessary files; install dependencies; expose port 3000; and use CMD to start the application. Only return the final Dockerfile with no explanations, markdown, or code fencing.`;



    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });
    return(completion.choices[0]?.message?.content);
}
export {generateConfig}