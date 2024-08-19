import { MessageSquare, ThumbsDown, ThumbsUp, User } from "lucide-react"
import { api } from "../../utils/lib/axios"
import { useEffect, useState } from "react"

interface Post {
  title: string
  question: string
  reply: Post[] | null
  created_at: string
  created_by: User
  question_id: string
}[]

interface User {
  name: string
}

export const Timeline = () => {

  const [ postsList, setPostsList ] = useState<Post[]>([])

  const getPosts = async () => {
    await api.get('/getPosts')
    .catch(error => {
      console.log(error)
    })
    .then(response => {
      console.log(response.data)
      setPostsList(response.data)
    })
  }

  useEffect(() => {
    getPosts()
  }, [])
  
  return (
    <>
      {postsList.map((post, index) => {
        return (
          <div key={index} className="flex flex-col p-6 w-full gap-4 rounded-lg shadow-postShadow bg-white">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm max-h-20 text-wrap break-all truncate">{post.question}</p>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <button className="bg-grayLight p-2 rounded-3xl">
                  <User size={25} className="text-grayDark" />
                </button>
                <h3 className="text-grayDark h-fit">{post.created_by.name}</h3>
              </div>    
              <div className="flex items-center gap-2">
                <button>
                  <ThumbsUp strokeWidth="1" className="text-grayDark" />  
                </button>  
                <button>
                  <ThumbsDown strokeWidth="1" className="text-grayDark" />
                </button>
                <button>
                  <MessageSquare strokeWidth="1" className="text-grayDark" />
                </button>
              </div>      
            </div>    
          </div>
        )
      })}
    </>
  )
}