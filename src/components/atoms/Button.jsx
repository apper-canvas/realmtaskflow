import React from "react"
import { cn } from "@/utils/cn"

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg hover:shadow-xl hover:from-primary-700 hover:to-primary-600 focus:ring-primary-500 active:transform active:scale-[0.98]",
    secondary: "bg-gradient-to-r from-secondary-100 to-secondary-50 text-secondary-700 border border-secondary-200 hover:shadow-md hover:from-secondary-200 hover:to-secondary-100 focus:ring-secondary-500 active:transform active:scale-[0.98]",
    ghost: "text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900 focus:ring-secondary-500",
    danger: "bg-gradient-to-r from-error-600 to-error-500 text-white shadow-lg hover:shadow-xl hover:from-error-700 hover:to-error-600 focus:ring-error-500 active:transform active:scale-[0.98]"
  }
  
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base"
  }
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button