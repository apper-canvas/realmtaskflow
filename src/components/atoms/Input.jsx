import React from "react"
import { cn } from "@/utils/cn"

const Input = React.forwardRef(({ 
  className, 
  type = "text",
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-lg border bg-white px-4 py-3 text-sm font-medium placeholder:text-secondary-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
        error 
          ? "border-error-300 text-error-900 focus:border-error-500 focus:ring-error-500/20" 
          : "border-secondary-200 text-secondary-900 focus:border-primary-500 focus:ring-primary-500/20 hover:border-secondary-300",
        "transition-all duration-200",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input