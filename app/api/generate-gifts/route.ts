// openai: This lets us talk to GPT-4o.
// streamText: Like a helper that sends your message to GPT-4o and listens to its reply.
// NextResponse: A helper from Next.js that makes it easy to reply to whoever called our API.

import { streamText } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs"; //This tells the system to run the code on the server using Node.js and not the browser.

const openaiApiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: openaiApiKey,
});

// POST handles form submissions. We use await req.json() to read the message. friendPreferences includes the friend’s interests, love language, and budget.
export async function POST(req: Request) {
  try {
    if (!openaiApiKey) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const { interests, loveLanguage, budget } = await req.json();

    if (!interests || !loveLanguage || !budget) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const prompt = `
            Generate 3 personalized, creative, and mostly homemade gift ideas for a friend with the following preferences:

            Interests: ${interests}
            Love Language: ${loveLanguage}
            Budget: ${budget}

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

    // Send the prompt to GPT-4o.
    // streamText(...): This sends the message and listens for the AI’s full response.
    // GPT returns a big text blob like: [ { "id": 1, "title": "Gift Title", "description": "Short description of the gift"}, ...]

    console.log("Sending request to OpenAI...");

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      response_format: { type: "json_object" },
    });
    const responseText = completion.choices[0].message.content;

    if (!responseText) {
      return NextResponse.json(
        { error: "Failed to generate gift ideas" },
        { status: 500 }
      );
    }

    try {
      const parsedResponse = JSON.parse(responseText);
      return NextResponse.json(parsedResponse);
    } catch (e) {
      console.error("Failed to parse OpenAI response:", e);
      return NextResponse.json(
        {
          error: "Failed to parse gift ideas",
          rawResponse: responseText,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate gift ideas" },
      { status: 500 }
    );
  }
}

{
  /* 
    What's going on?
    - The form sends the user's answers to the agent.
    - The agent builds a very clear question to GPT-4o.
    - GPT-4o thinks and replies with creative gift ideas.
    - Agent sends gift ideas back to the app to show on the screen.
  
    What's next:
    1. Connect the API the a Gift Ideas List page.
    */
}
