import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { friendPreferences } = await req.json();

    const prompt = `
      Generate 3 personalized, creative, and mostly homemade gift ideas for a friend with the following preferences:
      
      Interests: ${friendPreferences.interests}
      Love Language: ${friendPreferences.loveLanguage}
      Budget: ${friendPreferences.budget}
      
      For each gift idea, provide:
      1. A title
      2. A short description
      3. A unique ID (numeric)
      
      Format the response as a JSON array of objects with the following structure:
      [
        {
          "id": 1,
          "title": "Gift Title",
          "description": "Short description of the gift"
        }
      ]
    `;

    const { text } = await streamText({
      model: openai("gpt-4o"),
      prompt,
    });

    // Parse the response as JSON
    const giftIdeas = JSON.parse(await text);

    return NextResponse.json({ giftIdeas });
  } catch (error) {
    console.error("Error generating gift ideas:", error);
    return NextResponse.json(
      { error: "Failed to generate gift ideas" },
      { status: 500 }
    );
  }
}
