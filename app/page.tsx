"use client";

import { useState } from "react";
import {
  FriendPreferencesForm,
  type FriendPreferences,
} from "@/components/friend-preferences-form";
import { GiftIdeasList, type GiftIdea } from "@/components/gift-ideas-list";
import { GiftRecipe } from "@/components/gift-recipe";

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
        body: JSON.stringify({ friendPreferences: preferences }), // Conversts a JS object containing user's preferences into a JSON string.
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
      setRecipe(data.recipe);
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

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Guilted</h1>
        <p className="text-lg text-center text-muted-foreground">
          Find personalized, creative, and homemade gift ideas for your friends
        </p>
      </div>

      <div className="flex flex-col items-center space-y-8 max-w-4xl mx-auto">
        {!selectedGift ? (
          <>
            <FriendPreferencesForm
              onSubmit={handlePreferenceSubmit}
              isLoading={isLoadingIdeas}
            />

            {isLoadingIdeas && (
              <div className="flex flex-col items-center justify-center space-y-4 mt-8">
                <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-primary"></div>
                <p>Generating gift ideas...</p>
              </div>
            )}

            <GiftIdeasList
              giftIdeas={giftIdeas}
              onSelectGift={handleSelectGift}
            />
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
