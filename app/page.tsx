"use client";

import { useState } from "react";
import {
  FriendPreferencesForm,
  type FriendPreferences,
} from "@/components/friend-preferences-form";
import { GiftIdeasList, type GiftIdea } from "@/components/gift-ideas-list";
import { GiftRecipe } from "@/components/gift-recipe";
import { Button } from "@/components/ui/button";

export default function Home() {
  // friendPreferences – stores the answers from the form (e.g., hobbies, love language)
  const [friendPreferences, setFriendPreferences] =
    useState<FriendPreferences | null>(null);
  const [giftIdeas, setGiftIdeas] = useState<GiftIdea[]>([]);
  const [selectedGift, setSelectedGift] = useState<GiftIdea | null>(null);
  const [recipe, setRecipe] = useState<{
    title: string;
    estimatedPrice: string;
    estimatedDuration: string;
    materials: string[];
    steps: string[];
  } | null>(null);
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(false);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  {
    /*  
    When the form is submitted:
    - setFriendPreferences(preferences) Updates  the state variable holding the user's friend preferences with the new preferences.
    - setIsLoadingIdeas(true) Sets loading state to true (Show a loading spinner.)
    - setGiftIdeas([]) The API responds with gift ideas → saved to giftIdeas
    - setSelectedGift(null) Resets the currently selected gift(if any) to null.
    - setRecipe(null) Resets the currently displayed recipe (if any) to null.
    */
  }
  const handlePreferenceSubmit = async (preferences: FriendPreferences) => {
    setFriendPreferences(preferences);
    setIsLoadingIdeas(true);
    setGiftIdeas([]);
    setSelectedGift(null);
    setRecipe(null);

    // We use try {} to put the code inside a safety net if something goes wrong (internet fails). The program won't crash and instead jump to catch{} block and show the error.
    // await means that this line will pause execution until the request completes and a response is received.
    try {
      const response = await fetch("/api/generate-gifts", {
        method: "POST", // POST request
        headers: {
          "Content-Type": "application/json", // Tells the server that it's sending JSON data.
        },
        body: JSON.stringify(preferences), // Send preferences directly
      });
      if (!response.ok) {
        throw new Error("Failed to generate gift ideas.");
      }

      const data = await response.json(); // If the response successfully came, parse it into JSOn format and store it in the data variable.
      setGiftIdeas(data.giftIdeas); // Update the state with the new list of gift ideas received from the server.
    } catch (error) {
      // If error occurs during the fetch, this block will run.
      console.error("Error:", error);
    } finally {
      setIsLoadingIdeas(false); // The loading state stops, indicating that the process of fetching gift ideas is complete.
    }
  };

  {
    /*  
    When the user selects a gift idea:
    - Updates the state to mark the selected gift. Store the gift that the user picked.
    - Clears any currenlty displayed recipe by setting it to null.
    - Show the loadig status. Set the loading state to true for generating ideas.
    */
  }
  const handleSelectGift = async (gift: GiftIdea) => {
    setSelectedGift(gift);
    setRecipe(null);
    setIsLoadingRecipe(true);

    try {
      const response = await fetch("/api/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          giftTitle: gift.title,
          friendPreferences: friendPreferences,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate recipe");
      }

      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error("Error:", error);
      // Handle error state here
    } finally {
      setIsLoadingRecipe(false);
    }
  };

  const handleBackToGifts = () => {
    setSelectedGift(null);
    setRecipe(null);
  };

  {
    /* Regenerate the gift ideas*/
  }
  const handleRegenerate = async () => {
    if (!friendPreferences) return;

    setIsRegenerating(true);
    setGiftIdeas([]);
    setSelectedGift(null);
    setRecipe(null);

    try {
      console.log(
        "Regenerating gift ideas with preferences:",
        friendPreferences
      );

      const response = await fetch("/api/generate-gifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendPreferences: friendPreferences }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate gift ideas");
      }

      console.log("Received new gift ideas:", data);

      if (
        !data.giftIdeas ||
        !Array.isArray(data.giftIdeas) ||
        data.giftIdeas.length === 0
      ) {
        throw new Error("No gift ideas were generated. Please try again.");
      }

      setGiftIdeas(data.giftIdeas);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-background px-4">
      <div className="text-center px-4 py-6 sm:py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-purple">
          Guilted
        </h1>
        <p className="text-sm sm:text-lg text-muted-foreground">
          Find personalized, creative, and homemade gift ideas for your friends
        </p>
      </div>

      <div className="flex flex-col items-center space-y-8 max-w-4xl mx-auto">
        {!selectedGift ? (
          <>
            <FriendPreferencesForm
              onSubmit={handlePreferenceSubmit}
              isLoading={isLoadingIdeas || isRegenerating}
            />

            {(isLoadingIdeas || isRegenerating) && (
              <div className="flex flex-col items-center justify-center space-y-4 mt-8">
                <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-primary"></div>
                <p className="text-sm text-muted-foreground">
                  {isRegenerating
                    ? "Regenerating gift ideas..."
                    : "Generating gift ideas..."}
                </p>
              </div>
            )}

            <GiftIdeasList
              giftIdeas={giftIdeas}
              onSelectGift={handleSelectGift}
            />
            {giftIdeas.length > 0 && (
              <Button
                variant="default"
                size="sm"
                className="mt-4 px-4 py-2 bg-purple text-white"
                onClick={handleRegenerate}
                disabled={isRegenerating || isLoadingIdeas}
              >
                {isRegenerating ? "Regenerating..." : "Regenerate Ideas"}
              </Button>
            )}
          </>
        ) : (
          <GiftRecipe
            recipe={recipe}
            onBack={handleBackToGifts}
            isLoading={isLoadingRecipe}
          />
        )}
      </div>
    </main>
  );
}
