import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Array of less saturated gradient combinations
export const userGradients = [
  "from-pink-200 to-purple-300",
  "from-orange-200 to-amber-300",
  "from-blue-200 to-indigo-300",
  "from-violet-200 to-fuchsia-300",
  "from-amber-200 to-yellow-300",
  "from-emerald-200 to-teal-300",
  "from-rose-200 to-red-300",
  "from-fuchsia-200 to-pink-300",
  "from-indigo-200 to-purple-300",
  "from-blue-200 to-sky-300",
  "from-yellow-200 to-orange-300",
  "from-red-200 to-rose-300",
  "from-teal-200 to-cyan-300",
  "from-purple-200 to-violet-300",
]

// Get a consistent gradient for a user based on their ID
export function getUserGradient(userId: string): string {
  // Use the sum of character codes as a simple hash
  const hash = userId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return userGradients[hash % userGradients.length]
}
