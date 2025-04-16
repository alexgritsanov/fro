
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-[#0EA5E9] to-[#0891B2] text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        destructive: "bg-error-gradient text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary-gradient text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-unidoc-primary-blue underline-offset-4 hover:underline",
        success: "bg-success-gradient text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        warning: "bg-warning-gradient text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        info: "bg-info-gradient text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        error: "bg-error-gradient text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        blueTeal: "bg-gradient-to-r from-[#0EA5E9] to-[#0891B2] text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        blueCyan: "bg-blue-cyan-gradient text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        cyanSky: "bg-cyan-sky-gradient text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        deepOcean: "bg-deep-ocean-gradient text-white hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
        // Flat variants for secondary actions with improved contrast
        flat: "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98]",
        flatBlue: "bg-blue-50 text-blue-700 hover:bg-blue-100 hover:scale-[1.02] active:scale-[0.98]",
        flatGreen: "bg-green-50 text-green-700 hover:bg-green-100 hover:scale-[1.02] active:scale-[0.98]",
        flatAmber: "bg-amber-50 text-amber-700 hover:bg-amber-100 hover:scale-[1.02] active:scale-[0.98]",
        flatRed: "bg-red-50 text-red-700 hover:bg-red-100 hover:scale-[1.02] active:scale-[0.98]",
        back: "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        xs: "h-8 rounded-md px-2.5 text-xs",
        // Special sizes
        pill: "h-8 rounded-full px-4",
        fab: "h-14 w-14 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
