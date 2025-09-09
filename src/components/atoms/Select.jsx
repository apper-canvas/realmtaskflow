import React from "react"
import { cn } from "@/utils/cn"

const Select = React.forwardRef(({ 
  className, 
  children,
  error,
  ...props 
}, ref) => {
  return (
    <select
      className={cn(
        "flex h-12 w-full rounded-lg border bg-white px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
        error 
          ? "border-error-300 text-error-900 focus:border-error-500 focus:ring-error-500/20" 
          : "border-secondary-200 text-secondary-900 focus:border-primary-500 focus:ring-primary-500/20 hover:border-secondary-300",
        "transition-all duration-200 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEyIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDFMNiA2TDExIDEiIHN0cm9rZT0iIzk0QTNCOCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==')] bg-no-repeat bg-right-3 bg-center pr-10",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  )
})

Select.displayName = "Select"

export default Select