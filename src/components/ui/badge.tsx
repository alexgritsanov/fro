
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-gradient text-primary-foreground shadow-sm",
        secondary:
          "border-transparent bg-secondary-gradient text-white shadow-sm",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-sm",
        success:
          "border-transparent bg-success-gradient text-white shadow-sm",
        warning:
          "border-transparent bg-warning-gradient text-white shadow-sm",
        info:
          "border-transparent bg-info-gradient text-white shadow-sm",
        outline: "text-foreground",
        blue: "border-transparent bg-blue-teal-gradient text-white shadow-sm",
        cyan: "border-transparent bg-cyan-sky-gradient text-white shadow-sm",
        // Soft variants with improved contrast for better readability
        softBlue: "bg-blue-100 text-blue-700 border-blue-200",
        softGreen: "bg-green-100 text-green-700 border-green-200",
        softAmber: "bg-amber-100 text-amber-700 border-amber-200",
        softRed: "bg-red-100 text-red-700 border-red-200",
        softGray: "bg-gray-100 text-gray-700 border-gray-200",
        softPurple: "bg-purple-100 text-purple-700 border-purple-200",
        softCyan: "bg-cyan-100 text-cyan-700 border-cyan-200",
        softIndigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
        // Count badges with gradient styles
        countBadge: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full",
        // Enhanced gradient count badges with improved visibility
        countRed: "border-0 bg-gradient-to-r from-red-600 to-red-500 text-white font-medium shadow-sm px-2 py-0.5 min-w-[20px] text-center flex items-center justify-center rounded-full",
        countBlue: "border-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium shadow-sm px-2 py-0.5 min-w-[20px] text-center flex items-center justify-center rounded-full",
        countAmber: "border-0 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-medium shadow-sm px-2 py-0.5 min-w-[20px] text-center flex items-center justify-center rounded-full",
        countGreen: "border-0 bg-gradient-to-r from-green-600 to-green-500 text-white font-medium shadow-sm px-2 py-0.5 min-w-[20px] text-center flex items-center justify-center rounded-full",
        countOrange: "border-0 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-medium shadow-sm px-2 py-0.5 min-w-[20px] text-center flex items-center justify-center rounded-full",
        countPurple: "border-0 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-medium shadow-sm px-2 py-0.5 min-w-[20px] text-center flex items-center justify-center rounded-full",
        countGray: "border-0 bg-gradient-to-r from-gray-600 to-gray-500 text-white font-medium shadow-sm px-2 py-0.5 min-w-[20px] text-center flex items-center justify-center rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
