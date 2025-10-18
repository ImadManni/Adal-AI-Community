"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserAvatar({ name, src, size = 64 }: { name?: string | null; src?: string | null; size?: number }) {
  const initials = (name || "User")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const dimension = `${size}px`

  return (
    <Avatar style={{ width: dimension, height: dimension }}>
      <AvatarImage src={src || undefined} alt={name || "User"} referrerPolicy="no-referrer" />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}


