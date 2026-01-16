import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "md", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variants = {
    default: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300",
    ghost: "hover:bg-slate-100 text-slate-900",
    destructive: "bg-red-600 text-white hover:bg-red-700",
  }

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg",
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = "Button"

export { Button }
