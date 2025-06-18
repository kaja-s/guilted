"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, DollarSign, List, ArrowLeft } from "lucide-react";

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
            <p>Generating recipe...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!recipe) {
    return null;
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <Button
          variant="ghost"
          size="sm"
          className="mb-2 w-fit -ml-2 flex items-center gap-1"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to gift ideas
        </Button>
        <CardTitle className="text-2xl">{recipe.title}</CardTitle>
        <CardDescription className="flex flex-wrap gap-4 mt-2">
          <span className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            {recipe.estimatedPrice}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {recipe.estimatedDuration}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <List className="h-5 w-5" />
            Materials Needed
          </h3>
          <ul className="list-disc pl-5 space-y-1">
            {recipe.materials.map((material: string, index: number) => (
              <li key={index}>{material}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">
            Step-by-Step Instructions
          </h3>
          <ol className="list-decimal pl-5 space-y-3">
            {recipe.steps.map((step: string, index: number) => (
              <li key={index} className="pl-1">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
