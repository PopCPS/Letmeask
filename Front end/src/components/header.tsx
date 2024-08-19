import { User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../store/hooks"

export const Header = () => {

  const navigate = useNavigate()

  const isAuth = useAppSelector(state => state.apiData.isAuth)

  const navigateHome = () => {
    navigate('/')
  }

  const profileRedirect = () => {
    if(isAuth) {
      navigate('/profile')
    } else {
      navigate('/auth')
    }
  }

  return (
    <header className="flex items-center justify-between h-20 w-full px-40 border-b-2 border-grayLight">
      <img onClick={navigateHome} src="/Logo.svg" alt="logo" className="h-12" />
      <div>
        <button onClick={profileRedirect} className="bg-grayLight p-2 rounded-3xl">
          <User size={25} className="text-grayDark" />
        </button>
      </div>
    </header>
  )
}