import OpenAI from "openai"
import 'dotenv/config'

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

function getWeatherDetails(city = "") {
  if (city.toLowerCase() === "surat") return "10°c";
  if (city.toLowerCase() === "rajasthan") return "14°c";
  if (city.toLowerCase() === "gova") return "12°c";
  if (city.toLowerCase() === "kashnir") return "8°c";
  if (city.toLowerCase() === "himachal") return "6°c";
  if (city.toLowerCase() === "kerala") return "9°c";
}

const SYSTEM_PROMPT = `
  You are an AI Assistant with START, PLAN, ACTION, Obeservaation ans Output State.
  Wait for the use prompt and first PLAN using available tools.
  After Planning, Take the action with appropriate tools and wait for Obeservaation based on Action.
  Once you get the Obeservaation, Return the AI response based on START propmt and Obeservaation

  Example:


  `


const user = "Hey, What is the weather of surat?";

client.chat.completions.create({
  model: "openai/gpt-oss-120b",
  messages: [{ role: "user", content: user }],
})
  .then((e) => {
    console.log(e.choices[0].message.content);
  });
