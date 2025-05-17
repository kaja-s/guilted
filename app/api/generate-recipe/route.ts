import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

// Telling Next.js which environment we want to use (Node.js).
export const runtime = "nodejs";

// POST function
export async function POST(req: Request) {
  try {
    // Getting the data (gift title and user's preferences) from the request.
    const { giftTitle, friendPreferences } = await req.json();

    const prompt = `
      Generate a detailed recipe for creating a homemade gift titled "${giftTitle}" for a friend with these preferences:
      
      Interests: ${friendPreferences.interests}
      Love Language: ${friendPreferences.loveLanguage}
      Budget: ${friendPreferences.budget}
      
      The recipe should include:
      1. Estimated price (within the budget)
      2. Estimated duration to create
      3. Materials needed
      4. Step-by-step instructions
      
      Format the response as a JSON object with the following structure:
      {
        "title": "${giftTitle}",
        "estimatedPrice": "$XX",
        "estimatedDuration": "X hours/days",
        "materials": ["item1", "item2", ...],
        "steps": ["step1", "step2", ...]
      }
    `;

    const { text } = await streamText({
      model: openai("gpt-4o"),
      prompt,
    });

    // Parse the response as JSON
    const recipe = JSON.parse(await text);

    return NextResponse.json({ recipe });
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json(
      { error: "Failed to generate recipe" },
      { status: 500 }
    );
  }
}

{
  /* 
      What's going on?
      - Agent accepts the gift title and friend preferences.
      - Crafts a GPT-4o prompt to generate a personalized recipe.
      - Get's a recipe back in JSON format.
      - Sends it to the front end to show it to the user.
    
      What's next:
      1. Create a gift recipe page that, so that the user sees the information.
      */
}
