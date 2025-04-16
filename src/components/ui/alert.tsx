
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: 
          "border-green-200 bg-gradient-to-br from-green-50 to-white text-green-800 [&>svg]:text-green-600",
        warning: 
          "border-amber-200 bg-gradient-to-br from-amber-50 to-white text-amber-800 [&>svg]:text-amber-600",
        info: 
          "border-blue-200 bg-gradient-to-br from-blue-50 to-white text-blue-800 [&>svg]:text-blue-600",
        blue: 
          "border-blue-200 bg-gradient-to-br from-blue-50 to-white text-blue-800 [&>svg]:text-unidoc-primary-blue",
        action: 
          "border-unidoc-primary-blue/30 bg-gradient-to-br from-blue-50 to-white text-unidoc-primary-blue [&>svg]:text-unidoc-primary-blue",
        neutral: 
          "border-gray-200 bg-gradient-to-br from-gray-50 to-white text-gray-800 [&>svg]:text-gray-500",
        error:
          "border-red-200 bg-gradient-to-br from-red-50 to-white text-red-800 [&>svg]:text-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
