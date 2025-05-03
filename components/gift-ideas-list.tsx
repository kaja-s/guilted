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

export interface GiftIdea {
  id: number;
  title: string;
  description: string;
}

interface GiftIdeasListProps {
  giftIdeas: GiftIdea[];
  onSelectGift: (gift: GiftIdea) => void;
}

export function GiftIdeasList({ giftIdeas, onSelectGift }: GiftIdeasListProps) {
  if (!giftIdeas.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Gift Ideas</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {giftIdeas.map((gift) => (
          <Card key={gift.id} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5" />
                {gift.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-sm">
                {gift.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
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
