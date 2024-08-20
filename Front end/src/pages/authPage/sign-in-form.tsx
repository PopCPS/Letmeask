import { FormEvent, useState } from "react"
import { Input } from "../../components/input"
import { useNavigate } from "react-router-dom"
import { api } from "../../utils/lib/axios"
import { LogIn } from "lucide-react"
import { Button } from "../../components/button"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { set_isAuth, set_isModalOpen, set_userProfilePic } from "../../store/reducers/dataReducer"
import { Modal } from "../../components/modal"

export const SignInForm = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const isModalOpen = useAppSelector(state => state.apiData.isModalOpen)

  // const [ loggedInName, setLoggedInName ] = useState<string | null>(null)
  // const [ loggedInEmail, setLoggedInEmail ] = useState<string | null>(null)
  // const [ token, setToken ] = useState<string | null>()

  const [ email, setEmail ] = useState<string | null>(null)
  const [ isEmailError, setIsEmailError ] = useState<boolean>(false)
  const [ password, setPassword ] = useState<string | null>(null)
  const [ isPasswordError, setIsPasswordError ] = useState<boolean>(false)

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

    if(hasAnyError) {
      return
    }
    
    await api.post('/auth/login', {
      email,
      password
    }, { 
      withCredentials: true
    }).then(response => {
      const status = response.status
      if(status == 200) {
        dispatch(set_isAuth(true))
        dispatch(set_userProfilePic(response.data))
        navigate('/')
      }
    }).catch(error => {
      dispatch(set_isModalOpen(true)) 
      dispatch(set_isAuth(false))
      throw Error(error)
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
          errorMessage={'erro'}
        />
      )}
    </>
  )
}