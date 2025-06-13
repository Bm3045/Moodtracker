import { NextResponse } from "next/server";
import { moodStore, MoodEntry } from "../utils/moods";

export async function GET() {
  return NextResponse.json(moodStore);
}

export async function POST(req: Request) {
  try {
    const { selectedMood, comment } = await req.json();

    if (!selectedMood) {
      return NextResponse.json({ error: "Mood is required." }, { status: 400 });
    }

    const entry: MoodEntry = {
      mood: selectedMood,
      comment,
      timestamp: Date.now(),
    };

    moodStore.unshift(entry); 
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 500 });
  }
}
