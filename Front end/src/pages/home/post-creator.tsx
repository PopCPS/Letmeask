import { api } from "../../utils/lib/axios"
import { Button } from "../../components/button"
import { FormEvent, useState } from "react"
import { X } from "lucide-react"

interface PostCreatorProps {
  isModal?: boolean
  handleCreatePostModal?: () => void
}

export const PostCreator = ({ 
  isModal,
  handleCreatePostModal
}: PostCreatorProps) => {

  const [ title, setTitle ] = useState<string | null>(null)
  const [ question, setQuestion ] = useState<string | null>(null)
  const [ titleError, setTitleError ] = useState(false)
  const [ questionError, setQuestionError ] = useState(false)

  if(handleCreatePostModal == null) {
    handleCreatePostModal = () => {}
  } 

  const createPost = async (event: FormEvent<HTMLFormElement>) => {
    if(!title) {
      event.preventDefault()
      setTitleError(true)
    }

    if(!question) {
      event.preventDefault()
      setQuestionError(true)
    }

    if(questionError || titleError) {
      return
    }

    await api.post('/post', {
      title,
      question,
    }, {
      withCredentials: true
    })
    .then(response => {
      handleCreatePostModal()
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <>
      <div className="w-full">
        <form 
          onSubmit={createPost}
          className="flex flex-col items-end gap-3"
        >
          <div className="flex justify-between w-full self-start">
            <input
              onChange={e => {setTitle(e.target.value)}}
              onFocus={() => {setTitleError(false)}}
              className="w-2/5 p-3 font-semibold rounded-lg focus:outline-none" 
              type="text"
              placeholder="Título"
              style={titleError ? ({border: '1px solid red'}) : ({border: '1px solid transparent'})}
            />
            {isModal && (
              <button 
                className="p-3"
                onClick={(event) => {
                  event.preventDefault()
                  handleCreatePostModal()
                }}
              >
                <X />
              </button>
            )}
          </div>
          <textarea 
            onChange={e => {setQuestion(e.target.value)}}
            onFocus={() => {setQuestionError(false)}}
            className="w-full p-3 h-36 resize-none rounded-lg focus:outline-none"
            style={questionError ? ({border: '1px solid red'}) : ({border: '1px solid transparent'})}
          />
          <Button>
            Postar
          </Button>
        </form>
      </div>
    </>
  )
}