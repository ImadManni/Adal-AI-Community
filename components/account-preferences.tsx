"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function AccountPreferences() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">Dark mode</p>
          <p className="text-sm text-muted-foreground">Toggle the site theme</p>
        </div>
        <Switch checked={isDark} onCheckedChange={(c) => setTheme(c ? "dark" : "light")} />
      </div>
      <div className="pt-2 border-t">
        <Button variant="outline" onClick={() => setTheme("system")}>Use system theme</Button>
      </div>
    </div>
  )
}


