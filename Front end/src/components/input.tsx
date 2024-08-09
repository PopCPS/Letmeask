import { ComponentProps } from "react"

interface InputProps extends ComponentProps<'input'> {
  nameId: string,
  placeholder?: string | undefined,
  type?: string | undefined  
}

export const Input = ({ placeholder, nameId, type, ...props }: InputProps) => {

  type = type || "text"

  return (
    <input
      {...props}
      className="flex items-center w-full h-12 px-4 rounded-lg border border-grayDark placeholder-grayDark focus:outline-none " 
      placeholder={placeholder ? placeholder : ''}
      type={type} 
      name={nameId} 
      id={nameId} 
    />
  )
}