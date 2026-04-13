  import axios from "axios";

  export class AIService {
  private static apiKey = process.env.OPENROUTER_API_KEY;
  private static baseUrl = "https://openrouter.ai/api/v1";

  static async generateCompletion(prompt: string, system?: string) {
  try {
  // ✅ correct place (inside function, before request)
  console.log("KEY VALUE:", process.env.OPENROUTER_API_KEY);

  const response = await axios.post(
  `${this.baseUrl}/chat/completions`,
  {
  model: "openai/gpt-4o-mini",
  messages: [
  {
  role: "system",
  content: system || "You are helpful.",
  },
  {
  role: "user",
  content: prompt,
  },
  ],
  },
  {
  headers: {
  Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
  "Content-Type": "application/json",
  },
  }
  );

  return response.data.choices[0].message.content;

  } catch (err: any) {
  console.error("🔥 REAL ERROR:", err.response?.data || err.message);
  throw err;
  }
  }
  }