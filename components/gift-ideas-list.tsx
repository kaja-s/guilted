"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Gift, RefreshCw } from "lucide-react";

// Each gift idea should have three things - an id, title, and description.
export interface GiftIdea {
  id: number;
  title: string;
  description: string;
}

// The GiftIdeasList component expects two things. A list of gift ideas and a function that gets called when a user clicks a gift button.
interface GiftIdeasListProps {
  giftIdeas: GiftIdea[];
  onSelectGift: (gift: GiftIdea) => void;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
  canRegenerate?: boolean;
}

export function GiftIdeasList({
  giftIdeas,
  onSelectGift,
  onRegenerate,
  isRegenerating = false,
  canRegenerate = false,
}: GiftIdeasListProps) {
  if (!giftIdeas.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Gift Ideas</h2>

        {canRegenerate && onRegenerate && (
          <Button
            variant="outline"
            onClick={() => {
              console.log("Regenerate button clicked");
              onRegenerate();
            }}
            disabled={isRegenerating}
            className="flex items-center gap-2 h-10 px-4 bg-transparent"
          >
            {isRegenerating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-b-2 border-current"></div>
                <span className="text-sm">Regenerating...</span>
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                <span className="text-sm">Try Different Ideas</span>
              </>
            )}
          </Button>
        )}
      </div>
      {/*  Loops through all the gifts and for each one builds a card. */}
      <div className="grid gap-4 md:grid-cols-3">
        {giftIdeas.map((gift) => (
          <Card
            key={gift.id}
            className="flex flex-col h-full gift-card-hover bg-white"
          >
            <CardHeader>
              <CardTitle className="flex items-start gap-2 text-base sm:text-lg leading-tight">
                <Gift className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-2">{gift.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-xs sm:text-sm">
                {gift.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full h-10 text-sm bg-transparent"
                onClick={() => onSelectGift(gift)}
              >
                View Recipe
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

{
  /*  
  Summary:
  - Takes a list of ideas
  - Shows each one inside a card with an icon, title and description.
  - Gives users a button to say "Yes, I want this one."
  */
}
