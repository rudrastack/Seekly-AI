import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import dotenv from 'dotenv';
dotenv.config();
import { HumanMessage, SystemMessage, AIMessage } from "langchain";

const genimiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRALAI_API_KEY
});

export async function generateResponse(messages) {
  const response = await genimiModel.invoke(messages.map(msg=>{
    if (msg.role === 'user') {
      return new HumanMessage(msg.content)
    } 
    else if (msg.role === 'ai') {
      return new AIMessage(msg.content)
    }}
  ))
  return response.text
}

export async function generatChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(`Your are helpful assistant that generates concise and descriptive titles for chat conversation
user will provide you the first message of the conversation and you will generate a title that capture the essence of the conversation in 2-3 words. The title should be clear, relevant, and engaging.
giving user a quick understanding of the chat's topic `),
    new HumanMessage(`Generate a title for this conversation based on the following message:" ${message}"`)
  ]);
  return response.text
}

