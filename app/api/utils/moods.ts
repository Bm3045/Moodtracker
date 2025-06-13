export type MoodEntry = {
  mood: string;
  comment?: string;
  timestamp: number;
};

export const moodStore: MoodEntry[] = [];
