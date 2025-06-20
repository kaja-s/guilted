// openai: This lets us talk to GPT-4o.
// streamText: Like a helper that sends your message to GPT-4o and listens to its reply.
// NextResponse: A helper from Next.js that makes it easy to reply to whoever called our API.

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { cleanJSON } from "@/lib/utils";

export const runtime = "nodejs"; //This tells the system to run the code on the server using Node.js and not the browser.

// POST handles form submissions. We use await req.json() to read the message. friendPreferences includes the friend’s interests, love language, and budget.
export async function POST(req: Request) {
  try {
    const {
      interests,
      loveLanguage,
      budget,
      occasion,
      gifterPreferences,
      timeAvailable,
      giftType,
    } = await req.json();

    // Validate input parameters
    if (
      !interests ||
      !loveLanguage ||
      !budget ||
      !occasion ||
      !gifterPreferences ||
      !timeAvailable ||
      !giftType
    ) {
      console.error("Missing required parameters:", {
        interests,
        loveLanguage,
        budget,
        occasion,
        gifterPreferences,
        timeAvailable,
        giftType,
      });
      return Response.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const prompt = `
            Generate 3 personalized, creative, and mostly homemade gift ideas for a friend with the following preferences:

            Interests: ${interests}
            Love Language: ${loveLanguage}
            Budget: ${budget}
            Occasion: ${occasion}
            Gifter Preferences: ${gifterPreferences}
            Time Available: ${timeAvailable}
            Gift Type: ${giftType}

            For each gift idea, provide:
            1. A title
            2. A one sentence description
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
    console.log("Prompt:", prompt);

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    });

    console.log("Raw response from OpenAI:", text);

    // Validate and parse the JSON response
    let giftIdeas;

    // The backticks and the word json are indicators that the respons should be rendereded as markdown
    // but need to be removed if the response is to be processed as json. :)

    try {
      giftIdeas = JSON.parse(cleanJSON(text));

      // Validate the structure of the response
      if (!Array.isArray(giftIdeas)) {
        throw new Error("Response is not an array");
      }

      // Validate each gift idea has the required fields
      giftIdeas.forEach((gift, index) => {
        if (!gift.id || !gift.title || !gift.description) {
          throw new Error(`Invalid gift idea at index ${index}`);
        }
      });
    } catch (parseError: unknown) {
      console.error("Error parsing OpenAI response:", parseError);
      console.error("Raw response:", text);
      return Response.json(
        { error: "Invalid response format from OpenAI" },
        { status: 500 }
      );
    }
    return Response.json({ giftIdeas });
  } catch (error: unknown) {
    console.error("Error generating gift ideas:", error);
    // Log the full error object for debugging
    console.error("Full error details:", {
      name: error instanceof Error ? error.name : "Unknown",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return Response.json(
      {
        error: "Failed to generate gift ideas",
        details: error instanceof Error ? error.message : String(error),
      },
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
