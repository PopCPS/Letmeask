import { Heart, MessageSquare } from "lucide-react"
import { useEffect, useState } from "react"
import { api } from "../../utils/lib/axios"

interface Like {
  post_id: string;
}

interface ResponseData {
  likes: Like[];
  didUserLike: boolean;
}

interface PostControlsProps {
  postId: string,
}

export const PostControls = ({ postId }: PostControlsProps) => {

  const [ isLiked, setIsLiked ] = useState<boolean>(false)
  const [ postLikeData, setPostLikeData ] = useState<ResponseData | null>(null)

  const checkUserLike = async () => {
    await api.get('/post/like', {
      params: {
        post_id: postId
      },
      withCredentials: true
    })
    .then(response => {
      setPostLikeData(response.data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const likeComment = async () => {
    await api.post('/post/like', {
      post_id: postId
    }, {
      withCredentials: true
    })
    .then(() => {
      setIsLiked(true)  
    })
    .catch(error => {
      console.log(error)
    })
  }

  const unlikeComment  = async () => {
    await api.delete('/post/like', {
      params: {
        post_id: postId
      },
      withCredentials: true
    })
    .then(() => {
      setIsLiked(false)  
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    checkUserLike()
  }, [ isLiked ])

  useEffect(() => {
    if(postLikeData) {
      setIsLiked(postLikeData.didUserLike)
    }
  }, [ postLikeData ])

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span>{postLikeData ? postLikeData.likes.length : '0'}</span>
        {isLiked ? (
          <button onClick={unlikeComment}>
            <Heart fill="#835AFD" strokeWidth="1.5" className="text-purple" />  
          </button>
        ) : (
          <button onClick={likeComment}>
            <Heart strokeWidth="1.5" className="text-grayDark hover:text-purple" />  
          </button>  
        )}
      </div>
      <div className="flex items-center gap-2">
        <span>{}</span>
        <button>
          <MessageSquare strokeWidth="1.5" className="text-grayDark" />  
        </button>  
      </div>
    </div>   
  )
}