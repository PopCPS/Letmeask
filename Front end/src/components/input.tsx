import { ComponentProps } from "react"
import { VariantProps, tv } from "tailwind-variants"

const inputVariants = tv({
  base: 'flex items-center w-full h-12 px-4 rounded-lg border  focus:outline-none',
  
  variants: {
    hasError: {
      true: 'border-red placeholder-red',
      false: 'border-grayDark placeholder-grayDark'
    }
  }
})

interface InputProps extends ComponentProps<'input'>, VariantProps<typeof inputVariants> {
  nameId: string,
  placeholder?: string | undefined,
  type?: string | undefined  
}

export const Input = ({ placeholder, nameId, type, hasError, ...props }: InputProps) => {

  type = type || "text"

  return (
    <input
      {...props}
      className={inputVariants({ hasError })} 
      placeholder={placeholder ? placeholder : ''}
      type={type} 
      name={nameId} 
      id={nameId} 
    />
  )
}