import { LogIn, Plus } from "lucide-react"
import { Button } from "../components/button"
import { Input } from "../components/input"

// import useSignIn from "react-auth-kit/hooks/useSignIn"
import { FormEvent, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { api } from "../utils/lib/axios"

export const SignIn = () => {
  
  // const navigate = useNavigate()
  // const signIn = useSignIn()

  const [ email, setEmail ] = useState<string | null>()
  const [ password, setPassword ] = useState<string | null>()

  const formSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(!email) {
      return
    }

    if(!password) {
      return
    }

    // const response = await api.post('/auth/signin', {
    //   email,
    //   password
    // })

    console.log(email, password)

    // if(signIn({
    //   auth: {
    //     token: '',
    //     type: 'Bearer'
    //   },
    //   userState: {
    //     name: '',
    //     email: '',
    //   }
    // })) {
    //   navigate('/home')
    // }

  }

  return(
    <div className="flex w-screen bg-whiteBg">

      <div className="flex flex-col gap-2 justify-center w-3/5 h-screen p-20 bg-purple">
        <img className="w-[313px]" src="/Illustration.png" alt="image" />
        <div className="flex flex-col gap-4 w-[440px]">
          <h2 className="text-4xl font-bold text-white">Toda pergunta tem uma resposta.</h2>
          <span className="text-2xl text-whiteBg">Aprenda e compartilhe conhecimento com outras pessoas</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-14 w-full">
        <img src="/Logo.svg" alt="logo letmeask" />
        <div className="space-y-4">
          <form 
            className="flex flex-col items-center justify-center gap-4"
            onSubmit={formSignIn}
          >
            <label htmlFor="email" className="w-full">
              E-mail
              <Input 
                nameId="email" 
                type="email" 
                onChange={event => setEmail(event.target.value)}
              />
            </label>
            <label htmlFor="password" className="w-full">
              Password
              <Input 
                nameId="password" 
                type="password" 
                onChange={event => setPassword(event.target.value)}
              />
            </label>
            <Button>
              <LogIn />
              Login
            </Button>
          </form>
          <div className="flex h-5 justify-center items-center relative">
            <div className="absolute inset-y-0 px-4 border-none text-sm text-grayDark bg-whiteBg">ou</div>
            <div className="h-px w-full bg-grayDark" />
          </div>
          <Button variant="primary">
            <Plus />
            Criar conta
          </Button>
        </div>
      </div>

    </div>
  )
}