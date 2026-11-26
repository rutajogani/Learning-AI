import OpenAI from "openai"
import reaslinesync from "readlinesycn"
// import 'dotenv/config'

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

  Avaliable Tools:
  - function getWeatherDetails(city = string) : string
  getWeatherDetails is a function that accepts city name as string and retuen the wearther details
  
  Example:
  START
  {"type": "user","user": "what is the sum of weather of surat and gova"}
  {"type": "plan","plan": "i will call the getWeatherDetails for surat"}
  {"type": "action","function": "getWeatherDetails", "input": "surat"}
  {"type": "obeservaation","obeservaation": 10°c}
  {"type": "plan","plan": "i will call the getWeatherDetails for gova"}
  {"type": "action","function": "getWeatherDetails", "input": "gova"}
  {"type": "obeservaation","obeservaation": 12°c}
  {"type": "output","output": "The sum of weather of surat and gova is 22°c"}
`

// const user = "Hey, What is the weather of surat?";
// async function chat() {
//   const result = await client.chat.completions.create({
//     model: "openai/gpt-oss-120b",
//     messages:
//       [{role: "system", content: SYSTEM_PROMPT}]
//       [{ role: "user", content: user }],
//   });
//   console.log(result.choices[0].message.content);
// }
// 
// chat();

const messages = [{ role: 'system', content : SYSTEM_PROMPT}]

while (true) {
  const query = reaslinesync.question('>> ');
}

