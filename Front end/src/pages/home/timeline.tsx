import { MessageSquare, ThumbsDown, ThumbsUp, User } from "lucide-react"
import { api } from "../../utils/lib/axios"
import { useEffect, useState } from "react"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { useAppSelector } from "../../store/hooks"
import { useNavigate } from "react-router-dom"
 
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
  image: string
}

export const Timeline = () => {

  dayjs.locale('pt-br')
  dayjs.extend(relativeTime)

  const isAuth = useAppSelector(state => state.apiData.isAuth)

  const navigate = useNavigate()

  const [ postsList, setPostsList ] = useState<Post[]>([])
  
  const profileRedirect = () => {
    if(isAuth) {
      navigate('/profile')
    } else {
      navigate('/auth')
    }
  }

  const getPosts = async () => {
    await api.get('/getPosts', {
      params: {
        page: 1
      }
    })
    .then(response => {
      setPostsList(response.data)
    })
    .catch(error => {
      console.log(error)
    })

  }

  useEffect(() => {
    getPosts()
  }, [])
  
  return (
    <>
      {postsList.map((post, index) => {

        const timeFromNow = dayjs(post.created_at).fromNow()

        return (
          <div key={index} className="flex flex-col p-6 w-full gap-4 rounded-lg shadow-postShadow bg-white">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm max-h-20 text-wrap break-all truncate">{post.question}</p>
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <button onClick={profileRedirect}>
                  {post.created_by.image ? (
                    <div className="size-12 rounded-3xl">
                      <img
                        className="h-full w-full object-cover block rounded-3xl" 
                        src={post.created_by.image} 
                        alt={`foto de ${post.created_by.name}`} 
                      />
                    </div>
                  ) : (
                    <button className="flex items-center justify-center size-12 bg-grayLight p-2 rounded-3xl">
                      <User size={30} className="text-grayDark" />
                    </button>
                  )}
                </button>
                <h3 className="text-grayDark h-fit">{post.created_by.name}</h3>
                <span className="text-grayDark text-sm h-fit ">{timeFromNow}</span>
              </div>    
              <div className="flex items-center gap-2">
                <div>
                  <span>{}</span>
                  <button>
                    <ThumbsUp strokeWidth="1" className="text-grayDark" />  
                  </button>  
                </div>
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