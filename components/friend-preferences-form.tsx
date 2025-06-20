// This is like telling Next.js, "Hey, this code needs to run in the browser, not just on the server."
"use client";

// This brings in tools or building blocks from other parts of your code.

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radiogroup";

// This tells your code exactly what kind of information you're collecting. Each answer will be a string, which means a line of text like "reading" or "$50".

export interface FriendPreferences {
  interests: string;
  loveLanguage: string[];
  budget: string;
  occasion: string;
  gifterPreferences: string;
  timeAvailable: string;
  giftType: string;
}

// This describes what the component expects from the outside (its "props").
// onSubmit: This is a function someone else (probably a page) gives you.
// isLoading: A true or false flag — to show a spinner or say "Generating…" instead of "Submit" while waiting.

interface FriendPreferencesFormProps {
  onSubmit: (preferences: FriendPreferences) => void;
  isLoading: boolean;
}

const LOVE_LANGUAGES = [
  "Words of Affirmation",
  "Acts of Service",
  "Receiving Gifts",
  "Quality Time",
  "Physical Touch",
];

export function FriendPreferencesForm({
  onSubmit,
  isLoading,
}: FriendPreferencesFormProps) {
  // useState is like a notebook where we store answers as the user types them. We start with everything blank ("") — like an empty form.

  const [preferences, setPreferences] = useState<FriendPreferences>({
    interests: "",
    loveLanguage: [],
    budget: "",
    occasion: "",
    gifterPreferences: "",
    timeAvailable: "",
    giftType: "",
  });

  // e.preventDefault() says: "Don't refresh the page like a regular form." Instead, we call the onSubmit function we got from the parent, and give it the current answers.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  //Then it updates our notebook (preferences) with the new answer. The name of the field (like "budget") and the new value (like "$50").
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  // Takes the previous state (prev), spreads all its properties into a new object, and then updates the correct property based on the field being changed.
  // This makes sure that only the intended field is changed, while all other fields in the preferences remain the same.
  const handleSelectChange =
    (field: keyof FriendPreferences) => (value: string) => {
      setPreferences((prev) => ({ ...prev, [field]: value }));
    };

  const handleLoveLanguageChange = (loveLanguage: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      loveLanguage: checked
        ? [...prev.loveLanguage, loveLanguage]
        : prev.loveLanguage.filter((lang) => lang !== loveLanguage),
    }));
  };

  return (
    <Card className="w-full max-w-md bg-white">
      <CardHeader>
        <CardTitle className="text-xl">{"Friend's Preferences"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Interests */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="interests">Interests & Hobbies</Label>
            <Textarea
              id="interests"
              name="interests"
              placeholder="What does your friend enjoy? (e.g., cooking, reading, hiking, art)"
              onChange={handleChange}
              required
              className="min-h-[100px]"
            />
          </div>

          {/* Love Language */}
          <div className="space-y-3 md:col-span-2">
            <Label>Love Languages (Select all that apply)</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LOVE_LANGUAGES.map((loveLanguage) => (
                <div key={loveLanguage} className="flex items-center space-x-2">
                  <Checkbox
                    id={loveLanguage}
                    checked={preferences.loveLanguage.includes(loveLanguage)}
                    onCheckedChange={(checked) =>
                      handleLoveLanguageChange(loveLanguage, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={loveLanguage}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {loveLanguage}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Occasion */}
          <div className="space-y-2">
            <Label htmlFor="occasion">Occasion</Label>
            <Select
              value={preferences.occasion}
              onValueChange={handleSelectChange("occasion")}
            >
              <SelectTrigger id="occasion">
                <SelectValue placeholder="Select occasion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Birthday">Birthday</SelectItem>
                <SelectItem value="Anniversary">Anniversary</SelectItem>
                <SelectItem value="Christmas">Christmas</SelectItem>
                <SelectItem value="Graduation">Graduation</SelectItem>
                <SelectItem value="Housewarming">Housewarming</SelectItem>
                <SelectItem value="Thank You">Thank You</SelectItem>
                <SelectItem value="Just because">Just Because</SelectItem>
                <SelectItem value="Apology">Apology</SelectItem>
                <SelectItem value="Get well soon">Get Well Soon</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              name="budget"
              placeholder="e.g., $20, $50, $100"
              value={preferences.budget}
              onChange={handleChange}
              required
            />
          </div>

          {/* Time Available */}
          <div className="space-y-2">
            <Label htmlFor="timeAvailable">Time Available to Create</Label>
            <Select
              value={preferences.timeAvailable}
              onValueChange={handleSelectChange("timeAvailable")}
            >
              <SelectTrigger id="timeAvailable">
                <SelectValue placeholder="Select time available" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2 hours">1-2 hours</SelectItem>
                <SelectItem value="Half a day">Half a day</SelectItem>
                <SelectItem value="1 day">1 day</SelectItem>
                <SelectItem value="2-3 days">2-3 days</SelectItem>
                <SelectItem value="1 week">1 week</SelectItem>
                <SelectItem value="2+ weeks">2+ weeks</SelectItem>
                <SelectItem value="No time limit">No time limit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gifter Preferences */}
          <div className="space-y-2">
            <Label htmlFor="gifterPreferences">
              Your Preferences & Skills (Keywords)
            </Label>
            <Textarea
              id="gifterPreferences"
              name="gifterPreferences"
              placeholder="What are you good at or enjoy doing? (e.g., baking, crafting, photography, writing, sewing)"
              value={preferences.gifterPreferences}
              onChange={handleChange}
              required
              className="min-h-[80px]"
            />
          </div>

          {/* Solo or Group Gift */}
          <div className="space-y-3">
            <Label>Gift Type</Label>
            <RadioGroup
              value={preferences.giftType}
              onValueChange={handleSelectChange("giftType")}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="solo" id="solo" />
                <Label htmlFor="solo" className="font-normal">
                  Solo gift (just from me)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="group" id="group" />
                <Label htmlFor="group" className="font-normal">
                  Group gift (coordinating with others)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            variant="destructive"
            disabled={isLoading}
          >
            {isLoading ? "Generating ideas ..." : "Generate Gift Ideas"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

{
  /* 
  What's going on?
  - Each form field is connected to the state (preferences)
  - Uses value and onChange to keep track of user input
  - Is grouped and styled

  What's next:
  1. Build a page that uses this form 
  2. Sends the data to our api/generate-gifts route
  3. Shows the returned gift ideas
  */
}
