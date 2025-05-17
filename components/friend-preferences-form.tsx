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

// This tells your code exactly what kind of information you're collecting. Each answer will be a string, which means a line of text like "reading" or "$50".

export interface FriendPreferences {
  interests: string;
  loveLanguage: string;
  budget: string;
}

// This describes what the component expects from the outside (its "props").
// onSubmit: This is a function someone else (probably a page) gives you.
// isLoading: A true or false flag — to show a spinner or say “Generating…” instead of “Submit” while waiting.

interface FriendPreferencesFormProps {
  onSubmit: (preferences: FriendPreferences) => void;
  isLoading: boolean;
}

export function FriendPreferencesForm({
  onSubmit,
  isLoading,
}: FriendPreferencesFormProps) {
  // useState is like a notebook where we store answers as the user types them. We start with everything blank ("") — like an empty form.

  const [preferences, setPreferences] = useState<FriendPreferences>({
    interests: "",
    loveLanguage: "",
    budget: "",
  });

  // e.preventDefault() says: “Don’t refresh the page like a regular form.” Instead, we call the onSubmit function we got from the parent, and give it the current answers.
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

  // Takes the previous state (prev), spreads all its properties into a new object, and then updates the loveLanguage property to a new value.
  // This makes sure that only loveLanguage field is changed, while all other fields in the rpefereneces remain the same.
  const handleSelectChange = (value: string) => {
    setPreferences((prev) => ({ ...prev, loveLanguage: value }));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">{"Friend's Preferences"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          {/* Interests */}
          <div className="space-y-2">
            <Label htmlFor="interests">Interests & Hobbies</Label>
            <Textarea
              id="interests"
              name="interests"
              placeholder="What does your friend enjoy? (e.g., cooking, reading, hiking, art)"
              required
              className="min-h-[100px]"
            />
          </div>

          {/* Love Language */}
          <div className="space-y-2">
            <Label htmlFor="loveLanguage">Love Language</Label>
            <Select>
              <SelectTrigger id="loveLanguage">
                <SelectValue placeholder="Select love language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Words of Affirmation">
                  Words of Affirmation
                </SelectItem>
                <SelectItem value="Acts of Service">Acts of Service</SelectItem>
                <SelectItem value="Receiving Gifts">Receiving Gifts</SelectItem>
                <SelectItem value="Quality Time">Quality Time</SelectItem>
                <SelectItem value="Physical Touch">Physical Touch</SelectItem>
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
              required
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isLoading}>
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
