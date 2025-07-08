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
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl text-center sm:text-left">
          {"Friend's Preferences"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interests */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="interests" className="text-sm font-medium">
                Interests & Hobbies
              </Label>
              <Textarea
                id="interests"
                name="interests"
                placeholder="What does your friend enjoy? (e.g., cooking, reading, hiking, art)"
                onChange={handleChange}
                required
                className="min-h-[80px] text-sm"
              />
            </div>

            {/* Time Available */}
            <div className="space-y-2">
              <Label htmlFor="timeAvailable" className="text-sm font-medium">
                Time Available to Create
              </Label>
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

            {/* Solo or Group Gift */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Gift Type</Label>
              <RadioGroup
                value={preferences.giftType}
                onValueChange={handleSelectChange("giftType")}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solo" id="solo" />
                  <Label htmlFor="solo" className="text-sm font-normal">
                    Solo gift
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="group" id="group" />
                  <Label htmlFor="group" className="text-sm font-normal">
                    Group gift
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Occasion */}
            <div className="space-y-2">
              <Label htmlFor="occasion" className="text-sm font-medium">
                Occasion
              </Label>
              <Select
                value={preferences.occasion}
                onValueChange={handleSelectChange("occasion")}
              >
                <SelectTrigger id="occasion" className="h-11">
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
              <Label htmlFor="budget" className="text-sm font-medium">
                Budget
              </Label>
              <Input
                id="budget"
                name="budget"
                placeholder="e.g., $20, $50, $100"
                value={preferences.budget}
                onChange={handleChange}
                required
                className="text-sm"
              />
            </div>

            {/* Love Language */}
            <div className="space-y-3 md:col-span-2">
              <Label className="text-sm font-medium">
                Love Languages (Select all that apply)
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {LOVE_LANGUAGES.map((loveLanguage) => (
                  <div
                    key={loveLanguage}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={loveLanguage}
                      checked={preferences.loveLanguage.includes(loveLanguage)}
                      onCheckedChange={(checked) =>
                        handleLoveLanguageChange(
                          loveLanguage,
                          checked as boolean
                        )
                      }
                      className="flex-shrink-0"
                    />
                    <Label
                      htmlFor={loveLanguage}
                      className="text-sm font-normal cursor-pointer flex-1 leading-5"
                    >
                      {loveLanguage}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
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
