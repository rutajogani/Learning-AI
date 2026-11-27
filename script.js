import OpenAI from "openai";
import readlineSync from "readline-sync";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

function getWeatherDetails(city = "") {
  const name = city.trim().toLowerCase();

  if (name === "surat") return "10°C";
  if (name === "rajasthan") return "14°C";
  if (name === "goa" || name === "gova") return "12°C";
  if (name === "kashmir" || name === "kashnir") return "8°C";
  if (name === "himachal") return "6°C";
  if (name === "kerala") return "9°C";

  return `I don't have weather data for ${city}.`;
}

const availableTools = {
  getWeatherDetails,
};

const toolDefinitions = [
  {
    type: "function",
    function: {
      name: "getWeatherDetails",
      description: "Get weather details for a city",
      parameters: {
        type: "object",
        properties: {
          city: {
            type: "string",
            description: "The city or region to check",
          },
        },
        required: ["city"],
        additionalProperties: false,
      },
    },
  },
];

const messages = [
  {
    role: "system",
    content:
      "You are a helpful assistant. For weather questions, use getWeatherDetails, then answer the user clearly using the tool result.",
  },
];

async function main() {
  while (true) {
    const query = readlineSync.question(">> ").trim();

    if (!query) continue;
    if (query.toLowerCase() === "exit") break;

    messages.push({ role: "user", content: query });

    while (true) {
      const completion = await client.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages,
        tools: toolDefinitions,
        tool_choice: "auto",
      });

      const assistantMessage = completion.choices[0].message;
      messages.push(assistantMessage);

      if (assistantMessage.tool_calls?.length) {
        for (const toolCall of assistantMessage.tool_calls) {
          const functionName = toolCall.function.name;
          const args = JSON.parse(toolCall.function.arguments);
          const fn = availableTools[functionName];

          const result = fn
            ? fn(args.city)
            : `Unknown tool: ${functionName}`;

          messages.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: String(result),
          });
        }

        // Send the tool result back to the model for its answer.
        continue;
      }

      console.log(`🤖: ${assistantMessage.content ?? ""}`);
      break;
    }
  }
}

main().catch((error) => {
  console.error("Error:", error.message);
});