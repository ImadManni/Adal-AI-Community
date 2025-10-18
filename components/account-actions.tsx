"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function AccountActions() {
  return (
    <div className="flex gap-3">
      <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>Sign out</Button>
    </div>
  )
}


