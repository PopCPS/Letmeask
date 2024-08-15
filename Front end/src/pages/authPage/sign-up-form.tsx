import { Plus } from "lucide-react"
import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { FormEvent, useState } from "react"
import { auth } from "../../utils/lib/axios"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { set_isModalOpen } from "../../store/reducers/dataReducer"
import { Modal } from "../../components/modal"
import { useNavigate } from "react-router-dom"

export const SignUpForm = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  
  const isModalOpen = useAppSelector(state => state.apiData.isModalOpen)

  const [ name, setName ] = useState<string | null>(null)
  const [ isNameError, setIsNameError ] = useState<boolean>(false)
  const [ email, setEmail ] = useState<string | null>(null)
  const [ isEmailError, setIsEmailError ] = useState<boolean>(false)
  const [ password, setPassword ] = useState<string | null>(null)
  const [ isPasswordError, setIsPasswordError ] = useState<boolean>(false)
  const [ repeatPassword, setRepeatPassword ] = useState<string | null>(null)
  const [ isRepeatPasswordError, setIsRepeatPasswordError ] = useState<boolean>(false)
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null)

  let hasAnyError = false
  
  const formSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    hasAnyError = false

    if(!name) {
      setIsNameError(true)
      hasAnyError = true
    }

    if(!email) {
      setIsEmailError(true)
      hasAnyError = true
    }

    if(!password) {
      setIsPasswordError(true)
      hasAnyError = true
    }

    if(!repeatPassword) {
      setIsRepeatPasswordError(true)
      hasAnyError = true
    }

    if(name){
      if(name.length < 3 && name.length > 25) {
        setIsNameError(true)
        hasAnyError = true
      }
    }

    if(password) {
      if(password.length < 8) {
        setIsPasswordError(true)
        hasAnyError = true
      }
    }

    if(password !== repeatPassword) {
      setIsPasswordError(true)
      setIsRepeatPasswordError(true)
      hasAnyError = true
    }

    if(hasAnyError) {
      return
    }

    await auth.post('/auth/register', {
      name,
      email,
      password
    }).catch(error => {
      setErrorMessage(error.response.data.message)
      dispatch(set_isModalOpen(true))
    }).then(() => {
      navigate('/home')
    })

    await auth.post('/auth/login', {
      email,
      password
    }).catch(error => {
      setErrorMessage(error.response.data.message)
      dispatch(set_isModalOpen(true)) 
      throw Error(error)
    })
  }

  return (
    <>
      <form 
        className="flex flex-col items-center justify-center gap-4"
        onSubmit={formSignUp}
      >
        <label htmlFor="name" className="w-full">
          Node de usuário
          <Input 
            nameId="name" 
            type="name" 
            hasError={isNameError}
            onFocus={() => setIsNameError(false)}
            onChange={event => setName(event.target.value)}
          />
        </label>
        <label htmlFor="email" className="w-full">
          E-mail
          <Input 
            nameId="email" 
            type="email" 
            hasError={isEmailError}
            onFocus={() => setIsEmailError(false)}
            onChange={event => setEmail(event.target.value)}
          />
        </label>
        <label htmlFor="password" className="w-full">
          Senha
          <Input 
            nameId="password" 
            type="password" 
            hasError={isPasswordError}
            onFocus={() => setIsPasswordError(false)}
            onChange={event => setPassword(event.target.value)}
          />
        </label>
        <label htmlFor="repeatPassword" className="w-full">
          Repita a senha
          <Input 
            nameId="repeatPassword" 
            type="password" 
            hasError={isRepeatPasswordError}
            onFocus={() => setIsRepeatPasswordError(false)}
            onChange={event => setRepeatPassword(event.target.value)}
          />
        </label>
        <Button>
          <Plus />
          Criar conta
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