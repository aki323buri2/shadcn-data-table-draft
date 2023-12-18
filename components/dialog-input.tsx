import { PictureInPicture2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react"
import { Button, ButtonProps } from "./ui/button";

const IconButton = (props: ButtonProps) => (
  <Button size="icon" variant="ghost" {...props} />
)
type Props = {
  label: string 
  value: string 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
  onOpen?: () => void
  onReset?: () => void
}
export default function DialogInput({
  label, 
  value, 
  onChange, 
  onOpen, 
  onReset, 
}: Props) {
  const ref = React.useRef<HTMLInputElement>(null)
  const handleReset = () => {
    if (ref.current) {
      ref.current.value = ""
    }
    onReset?.()
    ref.current?.focus()
  }
  return (
    <div className="relative w-full">
        <Input label={label} value={value} onChange={onChange} ref={ref} />
        <IconButton 
          onClick={onOpen}
          className="absolute top-2 right-2"
        >
          <PictureInPicture2 />
        </IconButton>
        <IconButton 
          onClick={handleReset}
          className="absolute top-2 right-12"
        >
          <X className="text-slate-300 hover:text-slate-400"/>
        </IconButton>
      </div>
  )
}