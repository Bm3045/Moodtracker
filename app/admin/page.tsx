'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

type MoodEntry = {
  mood: 'happy' | 'neutral' | 'sad'
  comment?: string
  timestamp: number
}

const moodEmojis = {
  happy: '😄',
  neutral: '😐',
  sad: '😞'
}

const moodColors = {
  happy: 'bg-green-100 text-green-700',
  neutral: 'bg-yellow-100 text-yellow-700',
  sad: 'bg-red-100 text-red-700'
}

export default function AdminPage() {
  const [moods, setMoods] = useState<MoodEntry[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMoods = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/mood')
      const data = await res.json()
      setMoods(data)
    } catch (error) {
      console.error('Failed to fetch moods:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMoods()
  }, [])

  const stats = moods.reduce(
    (acc, m) => {
      acc[m.mood] += 1
      acc.total += 1
      return acc
    },
    { happy: 0, neutral: 0, sad: 0, total: 0 }
  )

  return (
    <div className="min-h-full bg-muted/20 px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={fetchMoods} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          <Card className="col-span-3 sm:col-span-1">
            <CardContent className="sm:p-2 text-center">
              <div className="text-4xl font-bold">{stats.total}</div>
              <p className="text-sm text-muted-foreground">Total Entries</p>
            </CardContent>
          </Card>

          {(['happy', 'neutral', 'sad'] as const).map(mood => (
            <Card
              key={mood}
              className={`col-span-1 sm:col-span-1 ${moodColors[mood]}`}
            >
              <CardContent className="sm:p-2 text-center">
                <div className="text-xl">{moodEmojis[mood]}</div>
                <div className="text-xl font-semibold">{stats[mood]}</div>
                <p className="text-xs capitalize">{mood}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <p className="text-xl font-bold mb-2">Mood Submissions</p>
          <Card>
            <CardContent>
              {moods.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">No mood entries yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mood</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead className="text-right">Timestamp</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {moods.map((entry, idx) => (
                        <TableRow key={idx}>
                          <TableCell>
                            <span
                              className="inline-flex items-center gap-1 py-1 rounded-full text-sm font-medium"
                            >
                              {moodEmojis[entry.mood]} {entry.mood}
                            </span>
                          </TableCell>
                          <TableCell>
                            {entry.comment || <span className="text-muted-foreground italic">No comment</span>}
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground whitespace-normal sm:whitespace-nowrap text-sm">
                            {new Date(entry.timestamp).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
