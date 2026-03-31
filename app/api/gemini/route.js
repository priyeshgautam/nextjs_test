import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    if (response?.error) {
      const { code = 500, message = "Unknown error", status = "ERROR" } = response.error;
      return Response.json(
        { error: { code, message, status } },
        { status: code }
      );
    }

    // May need to extract text from response depending on SDK structure:
    // Here assuming response.text carries answer as per original code
    return Response.json({ text: response.text });
  } catch (error) {
    // Catch JavaScript/Network/Parsing errors as well
    // Standardize response format for client
    return Response.json(
      {
        error: {
          code: error?.code || 500,
          message:
            error?.message ||
            "An unexpected error occurred while communicating with the Gemini API.",
          status: error?.status || "INTERNAL_ERROR",
        },
      },
      { status: error?.code || 500 }
    );
  }
}

