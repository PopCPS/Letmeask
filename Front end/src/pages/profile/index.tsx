import { useEffect, useState } from "react"
import { Button } from "../../components/button"
import { Header } from "../../components/header"
import { api } from "../../utils/lib/axios"
import { Input } from "../../components/input"

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
    await api.get('/getUser')
    .catch(error => {
      console.log(error)
    })
    .then(response => {
      console.log(response)
    })
  }

  useEffect(() => {
    getUserData()
  })

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex flex-col items-center justify-center gap-20 flex-1">
        <div className="flex items-center justify-center gap-16">
          <img className="size-40 rounded-3xl" src="" alt="" />
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