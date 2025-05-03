"use client";

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

export interface FriendPreferences {
  interests: string;
  loveLanguage: string;
  budget: string;
}

export function FriendPreferencesForm() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">{"Friend's Preferences"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
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

          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              name="budget"
              placeholder="e.g., $20, $50, $100"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {"Generate Gift Ideas"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
