import { Header } from "./header"
import { Timeline } from "./timeline"

export const Home = () => {
  return (
    <div className="flex flex-col items-center bg-whiteBg min-h-screen">
      <Header />    
      <div className="flex flex-col items-center justify-center py-16 w-[800px]">
        <Timeline></Timeline>
      </div>
    </div> 
  )
}