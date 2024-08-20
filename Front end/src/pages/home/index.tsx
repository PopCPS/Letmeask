import { Button } from "../../components/button"
import { api } from "../../utils/lib/axios"
import { Header } from "../../components/header"
import { Timeline } from "./timeline"

export const Home = () => {

  const postPost = async () => {
    await api.post('/post', {
      title: 'asdfavgrbgrfgrhthfa',
      question: 'fvsnjqo'
    }, {
      withCredentials: true
    }).then(response => {
      console.log(response)
    })
  }

  return (
    <div className="flex flex-col items-center bg-whiteBg min-h-screen">
      <Header />    
      <div className="flex flex-col items-center justify-center py-16 w-[800px]">
        <Timeline />
      </div>
      <Button onClick={postPost}>
        teste
      </Button>
    </div> 
  )
}