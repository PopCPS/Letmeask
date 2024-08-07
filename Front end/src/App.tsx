import { LogIn } from "lucide-react";
import { Button } from "./components/button";

export function App() {
  return (
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
        <div className="space-y-8">
          <Button google={true} variant="secondary">
            Crie sua sala com o Google
          </Button>
          <div className="flex h-5 justify-center items-center relative">
            <button className="absolute inset-y-0 px-4 border-none text-sm text-grayDark bg-whiteBg">ou entre em uma sala</button>
            <div className="h-px w-full bg-grayDark" />
          </div>
          <form className="flex flex-col items-center justify-center gap-4">
            <input
              className="flex items-center w-full h-12 px-4 rounded-lg border border-grayDark placeholder-grayDark focus:outline-none " 
              placeholder="Digite o código da sala"
              type="text" 
              name="" 
              id="" 
            />
            <Button>
              <LogIn />
              Entrar na sala
            </Button>
          </form>
        </div>
      </div>

    </div>
  )
}