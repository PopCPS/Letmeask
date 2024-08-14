import { LogIn, Plus } from "lucide-react"
import { Button } from "../../components/button"

import { LoginSideContent } from "../../components/login-side-content"
import { SignInForm } from "./sign-in-form"
import { useState } from "react"
import { SignUpForm } from "./sign-up-form"

export const AuthPage = () => {

  const [ isSignIn, setIsSignIn ] = useState(true)

  return(
    <div className="flex w-screen bg-whiteBg">

      <LoginSideContent />

      <div className="flex flex-col items-center justify-center gap-14 w-full">
        <img src="/Logo.svg" alt="logo letmeask" />
        <div className="flex flex-col gap-4">
        
          {isSignIn  ? (
            <SignInForm />
          ) : (
            <SignUpForm />
          )}

          <div className="flex h-5 justify-center items-center relative">
            <div className="absolute inset-y-0 px-4 border-none text-sm text-grayDark bg-whiteBg">ou</div>
            <div className="h-px w-full bg-grayDark" />
          </div>
          {isSignIn ? (
            <Button 
              onClick={() => setIsSignIn(false)}  
            >
              <Plus />
              Criar conta
            </Button>
          ) : (
            <Button
              onClick={() => setIsSignIn(true)}
            >
              <LogIn />
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}