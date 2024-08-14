import { FormEvent, useState } from "react"
import { Input } from "../../components/input"
import { useNavigate } from "react-router-dom"
import { api } from "../../utils/lib/axios"
import { LogIn } from "lucide-react"
import { Button } from "../../components/button"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { set_isModalOpen } from "../../store/reducers/dataReducer"
import { Modal } from "../../components/modal"

export const SignInForm = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isModalOpen = useAppSelector(state => state.apiData.isModalOpen)

  const [ loggedInName, setLoggedInName ] = useState<string | null>(null)
  const [ loggedInEmail, setLoggedInEmail ] = useState<string | null>(null)
  const [ token, setToken ] = useState<string | null>()

  const [ email, setEmail ] = useState<string | null>(null)
  const [ isEmailError, setIsEmailError ] = useState<boolean>(false)
  const [ password, setPassword ] = useState<string | null>(null)
  const [ isPasswordError, setIsPasswordError ] = useState<boolean>(false)
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null)

  let hasAnyError = false

  const formSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    hasAnyError = false

    if(!email) {
      setIsEmailError(true)
      hasAnyError = true
    }

    if(!password) {
      setIsPasswordError(true)
      hasAnyError = true
    }

    if(email) {
      if(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i.test(email)){
        setIsEmailError(true)
        hasAnyError = true
      }
    }

    if(hasAnyError) {
      return
    }
    
    await api.post('/auth/login', {
      email,
      password
    }).catch(error => {
      setErrorMessage(error.response.data.message)
      dispatch(set_isModalOpen(true)) 
      throw Error(error)
    }).then(response => {
      setLoggedInName(response.data.name)
      setLoggedInEmail(response.data.email)
      setToken(response.data.token)
    }).then(() => {
      navigate('/home')
    })
  }

  return (
    <>
      <form 
        className="flex flex-col items-center justify-center gap-4"
        onSubmit={formSignIn}
      >
        <label htmlFor="email" className="w-full">
          E-mail
          <Input 
            hasError={isEmailError}
            nameId="email" 
            type="email" 
            onFocus={() => setIsEmailError(false)}
            onChange={event => setEmail(event.target.value)}
          />
        </label>
        <label htmlFor="password" className="w-full">
          Password
          <Input 
            hasError={isPasswordError}
            nameId="password" 
            type="password" 
            onFocus={() => setIsPasswordError(false)}
            onChange={event => setPassword(event.target.value)}
          />
        </label>
        <Button>
          <LogIn />
          Login
        </Button>
      </form>
      {isModalOpen && (
        <Modal
          errorMessage={errorMessage}
        />
      )}
    </>
  )
}