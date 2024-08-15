import { Button } from "../../components/button"
import { api } from "../../utils/lib/axios"

export const ProfilePage = () => {

  const logout = async () => {
    api.post('/auth/logout')
  }

  return (
    <Button onClick={logout}>
      Teste
    </Button>
  )
}