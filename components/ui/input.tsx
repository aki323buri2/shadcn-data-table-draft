import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label="label", placeholder, id=Math.random().toString(), ...props }, ref) => {
    return (
      <div className="relative mt-2">
        <input
          type={type}
          className={cn(
            cn(
              "flex h-10 w-full rounded-md border border-input bg-background", 
              "px-3 py-2 text-sm ring-offset-background", 
              "file:border-0", 
              "file:bg-transparent", 
              "file:text-sm file:font-medium", 
              "placeholder:text-muted-foreground", 
              "focus-visible:outline-none", 
              "focus-visible:ring-2", 
              "focus-visible:ring-ring", 
              "focus-visible:ring-offset-2", 
              "disabled:cursor-not-allowed", 
              "disabled:opacity-50", 
            ),
            cn(
              "peer", 
            ), 
            className
          )}
          ref={ref}
          id={id}
          placeholder={" "}
          {...props}
        />
        <label 
          className={cn(
            "absolute left-0 -top-3 scale-75 px-1", 
            "bg-white",   
            "transition-all", 
            "peer-focus:scale-75", 
            "peer-focus:left-0", 
            "peer-focus:-top-3", 
            "peer-placeholder-shown:scale-100", 
            "peer-placeholder-shown:left-2", 
            "peer-placeholder-shown:top-2", 
            "peer-placeholder-shown:text-slate-400", 
          )}
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }