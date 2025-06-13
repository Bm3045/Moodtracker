"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

const moods = [
  { value: "happy", emoji: "😄", label: "Happy", color: "bg-green-100 hover:bg-green-200 border-green-300" },
  { value: "neutral", emoji: "😐", label: "Neutral", color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300" },
  { value: "sad", emoji: "😢", label: "Sad", color: "bg-blue-100 hover:bg-blue-200 border-blue-300" },
];

const MoodPage = () => {
  const [moodData, setMoodData] = useState({ selectedMood: "", comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleMoodSelection = (value: string) => setMoodData((prev) => ({ ...prev, selectedMood: value }));
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMoodData((prev) => ({ ...prev, comment: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moodData.selectedMood) return alert("Please select a mood before submitting!");

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(moodData),
      });

      if (!response.ok) throw new Error("Failed to submit mood!");

      setSubmitted(true);
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      console.error("Error submitting mood:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
            <p className="text-lg">Your mood has been recorded successfully.</p>
          </CardContent>
        </Card>
        <p className="text-sm text-muted-foreground mt-2">Redirecting back to home...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center min-h-full px-4">
      <div className="space-y-6 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold">How are you feeling today?</h2>

        {/* Mood Selection */}
        <div>
          <label className="text-lg font-semibold block mb-2">Select Your Mood</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {moods.map((mood) => (
              <button
                key={mood.value}
                type="button"
                onClick={() => handleMoodSelection(mood.value)}
                className={`p-6 rounded-lg border-2 transition-all ${
                  moodData.selectedMood === mood.value
                    ? `${mood.color} border-opacity-100 scale-105`
                    : "bg-white hover:bg-gray-50 border-gray-200"
                }`}
              >
                <div className="text-4xl mb-2">{mood.emoji}</div>
                <div className="font-medium dark:text-black">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Optional Comment Section */}
        <div>
          <label className="text-lg font-medium mb-2 block">Want to say more?</label>
          <Textarea placeholder="Share your thoughts..." value={moodData.comment} onChange={handleCommentChange} rows={3} />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" size="lg" disabled={!moodData.selectedMood || isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? "Submitting..." : "Submit Mood"}
        </Button>
      </div>
    </div>
  );
};

export default MoodPage;
