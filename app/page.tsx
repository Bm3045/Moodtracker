import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 min-h-full items-center justify-center px-4 text-center">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to MoodTracker</h1>
        <p className="text-lg text-muted-foreground">
          Track how you are feeling each day and share your thoughts. Start by submitting your mood!
        </p>
        <Link href="/mood">
          <Button className="text-lg px-6 py-4">Submit Your Mood</Button>
        </Link>
      </div>
    </div>
  );
}
