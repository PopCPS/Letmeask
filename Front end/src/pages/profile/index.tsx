import { useEffect, useState } from "react"
import { Button } from "../../components/button"
import { Header } from "../../components/header"
import { api } from "../../utils/lib/axios"
import { Input } from "../../components/input"
import { User } from "lucide-react"

interface UserData {
  name: string,
  email: string,
  image: string,
}

export const ProfilePage = () => {

  const [ userData, setUserData ] = useState<UserData | null>(null)

  const logout = async () => {
    api.post('/auth/logout')
  }

  const getUserData = async () => {
    await api.get('/user')
    .then(response => {
      setUserData(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center gap-20 flex-1">
        <div className="flex items-center justify-center gap-16">
          {userData && userData.image ? (
            <div className="size-40 rounded-3xl">
            <img
              className="h-full w-full object-cover block rounded-3xl" 
              src={userData.image} 
              alt={`Foto de perfil`} 
            />
          </div>
          ) : (
            <div className="flex items-center justify-center size-40 bg-grayLight p-2 rounded-3xl">
              <User size={40} className="text-grayDark" />
            </div>
          )}
          <div className="flex flex-col gap-4">
            <Input type="text" readOnly />
            <Input type="text" readOnly />
          </div>
        </div>
        <div className="flex gap-4">
          <Button size="fit" variant='danger' onClick={logout}>
            Logout
          </Button>
          <Button size="fit">
            Alterar dados
          </Button>
        </div>
      </main>
    </div>
  )
}