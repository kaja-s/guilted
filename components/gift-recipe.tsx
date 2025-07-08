"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, DollarSign, List, ChevronLeft } from "lucide-react";

// Setting up the rules on how the recipe should look like.
export interface GiftRecipe {
  title: string;
  estimatedPrice: string;
  estimatedDuration: string;
  materials: string[];
  steps: string[];
}

// Show the actual recipe. Option to go back to the previous page. A boolean to show when the page is being generated.
interface GiftRecipeProps {
  recipe: GiftRecipe | null;
  onBack: () => void;
  isLoading: boolean;
}

export function GiftRecipe({ recipe, onBack, isLoading }: GiftRecipeProps) {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">
              Generating recipe...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!recipe) {
    return null;
  }
  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-4">
        <Button
          variant="ghost"
          size="sm"
          className="mb-3 w-fit -ml-2 flex items-center gap-2 h-10 text-purple"
          onClick={onBack}
        >
          <ChevronLeft className="h-4 w-4 text-purple" />
          Back to gift ideas
        </Button>
        <CardTitle className="text-lg sm:text-2xl leading-tight pr-4">
          {recipe.title}
        </CardTitle>
        <CardDescription className="flex flex-wrap gap-3 sm:gap-4 mt-3">
          <span className="flex items-center gap-1 text-xs sm:text-sm">
            <DollarSign className="h-3 w-3 sm:h-4 sm:w-4" />
            {recipe.estimatedPrice}
          </span>
          <span className="flex items-center gap-1 text-xs sm:text-sm">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
            {recipe.estimatedDuration}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
            <List className="h-4 w-4 sm:h-5 sm:w-5" />
            Materials Needed
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            {recipe.materials.map((material: string, index: number) => (
              <li key={index} className="text-sm sm:text-base leading-relaxed">
                {material}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-3">
            Step-by-Step Instructions
          </h3>
          <ol className="list-decimal pl-5 space-y-3">
            {recipe.steps.map((step: string, index: number) => (
              <li
                key={index}
                className="pl-1 text-sm sm:text-base leading-relaxed"
              >
                {step}
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
