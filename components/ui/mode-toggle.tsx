'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/ui/theme-provider'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(nextTheme)}
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] dark:hidden" />
      <Moon className="h-[1.2rem] w-[1.2rem] hidden dark:inline" />
    </Button>
  )
}
