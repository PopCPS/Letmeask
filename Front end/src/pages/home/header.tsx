import { User } from "lucide-react"

export const Header = () => {
  return (
    <header className="flex items-center justify-between h-20 w-full px-40 border-b-2 border-grayLight">
      <img src="/Logo.svg" alt="logo" className="h-12" />
      <div>
        <button className="bg-grayLight p-2 rounded-3xl">
          <User size={25} className="text-grayDark" />
        </button>
      </div>
    </header>
  )
}