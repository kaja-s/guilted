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
import { Gift } from "lucide-react";

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
}

export function GiftIdeasList({ giftIdeas, onSelectGift }: GiftIdeasListProps) {
  // If there are no gift ideas, show nothing.

  if (!giftIdeas.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Gift Ideas</h2>
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
