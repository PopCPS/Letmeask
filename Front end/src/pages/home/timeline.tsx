import { MessageSquare, ThumbsDown, ThumbsUp, User } from "lucide-react"

export const Timeline = () => {
  
  return (
    <>
      <div className="flex flex-col p-6 w-full gap-4 rounded-lg shadow-postShadow bg-white">
        <h2 className="text-xl font-semibold">Title</h2>
        <p className="text-sm max-h-20 text-wrap break-all truncate">QuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestion QuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestio nQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestion QuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestionQuestion</p>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <button className="bg-grayLight p-2 rounded-3xl">
              <User size={25} className="text-grayDark" />
            </button>
            {/* <img src="/" alt="" className="rounded-3xl" /> */}
            <h3 className="text-grayDark h-fit">Name</h3>
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
    </>
  )
}