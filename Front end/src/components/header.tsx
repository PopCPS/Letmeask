import { User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../utils/lib/axios"

export const Header = () => {

  const navigate = useNavigate()

  const [ userProfilePic, setUserProfilePic ] = useState<string | null>(null) 
  const [ userProfileUrl, setUserProfileUrl ] = useState<string | null>(null) 

  const navigateHome = () => {
    navigate('/')
  }

  const getUserData = async () => {
    await api.get('/user')
    .then(response => {
      setUserProfilePic(response.data.image)
      setUserProfileUrl(response.data.url)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const profileRedirect = () => {
    if(userProfileUrl) {
      navigate(`/profile/${userProfileUrl}`)
    } else {
      navigate('/auth')
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <header className="flex items-center justify-between h-20 w-full px-40 border-b-2 border-grayLight">
      <img onClick={navigateHome} src="/Logo.svg" alt="logo" className="h-12" />
        <button onClick={profileRedirect}>
          {userProfilePic ? (
            <div className="size-12 rounded-3xl">
              <img
                className="h-full w-full object-cover block rounded-3xl" 
                src={userProfilePic} 
                alt={`Sua foto de perfil`} 
              />
            </div>
          ) : (
            <div className="flex items-center justify-center size-12 bg-grayLight p-2 rounded-3xl">
              <User size={30} className="text-grayDark" />
            </div>
          )}
        </button>
    </header>
  )
}