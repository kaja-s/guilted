"use client";

import { useState } from "react";
import {
  FriendPreferencesForm,
  type FriendPreferences,
} from "@/components/friend-preferences-form";
import { GiftIdeasList, type GiftIdea } from "@/components/gift-ideas-list";
import { GiftRecipe } from "@/components/gift-recipe";

export default function Home() {
  const [friendPreferences, setFriendPreferences] =
    useState<FriendPreferences | null>(null);
  const [giftIdeas, setGiftIdeas] = useState<GiftIdea[]>([]);
  const [selectedGift, setSelectedGift] = useState<GiftIdea | null>(null);
  const [recipe, setRecipe] = useState<any | null>(null);
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(false);
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(false);

  const handlePreferencesSubmit = async (preferences: FriendPreferences) => {
    setFriendPreferences(preferences);
    setIsLoadingIdeas(true);
    setGiftIdeas([]);
    setSelectedGift(null);
    setRecipe(null);

    try {
      const response = await fetch("/api/generate-gifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendPreferences: preferences }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate gift ideas");
      }

      const data = await response.json();
      setGiftIdeas(data.giftIdeas);
    } catch (error) {
      console.error("Error:", error);
      // Handle error state here
    } finally {
      setIsLoadingIdeas(false);
    }
  };

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
              onSubmit={handlePreferencesSubmit}
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
