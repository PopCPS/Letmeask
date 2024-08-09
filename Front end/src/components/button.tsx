import { ComponentProps, ReactNode } from "react"
import { VariantProps, tv } from "tailwind-variants"
const buttonVariants = tv({
  base: 'flex items-center justify-center gap-2 h-12 rounded-lg font-medium',

  variants: {
    variant: {
      primary: 'bg-purple text-white hover:bg-purpleHover',
      secondary: 'bg-white text-black border border-grayDark hover:border-black',
      danger: 'bg-red text-white hover:bg-redHover',
      cancel: 'bg-grayLight text-grayDark hover:bg-grayLightHover',
      border: 'border border-purple text-purple hover:text-purpleHover hover:border-purpleHover',
      copy: 'border border-purple text-black hover:border-purpleHover',
    },
    size: {
      wide: 'w-80',
      fit: 'px-8',
      small: 'text-sm h-10 px-6',
      copy: 'text-sm p-4'
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'wide'
  }
  
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  children: ReactNode
}

export const Button = ({
  children,
  variant,
  size,
  ...props
}: ButtonProps) => {
  return (
    <button {...props} className={buttonVariants({ variant, size })}>
      {children}
    </button>
  )
}