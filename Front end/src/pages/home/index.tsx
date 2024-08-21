import { Header } from "../../components/header"
import { Timeline } from "./timeline"
import { PostCreator } from "./post-creator"
import { useCallback, useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { set_isCreatePostModalOpen } from "../../store/reducers/dataReducer"

export const Home = () => {

  const dispatch = useAppDispatch()

  const isCreatePostModalOpen = useAppSelector(state => state.apiData.isCreatePostModalOpen)

  const [ scrollYPosition, setScrollYPosition ] = useState<number>(0)

  const handleCreatePostModal = () => {
    dispatch(set_isCreatePostModalOpen(!isCreatePostModalOpen))
  }

  const handleScroll = useCallback(() => {
    setScrollYPosition(window.scrollY)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [ handleScroll ])
  
  return (
    <>
      <div 
        className="flex flex-col items-center bg-whiteBg min-h-screen"
      >
        <Header />    
        <div className="flex flex-col items-center justify-center py-6 w-[800px] gap-6 relative">
          <PostCreator />
          <Timeline />
          {scrollYPosition >= 500 && (
            <button 
              className="flex items-center justify-center fixed size-16 bottom-12 mr-12 self-end rounded-[50%] bg-purple"
              onClick={handleCreatePostModal}
            >
              <Plus size={40} className="text-white" />
            </button>
          )}
        </div>
      </div> 
      {isCreatePostModalOpen && (
        <div className="fixed flex z-10 items-center justify-center inset-0 bg-grayDark/60">
          <div className="flex flex-col items-end w-[650px] p-8 rounded-3xl bg-whiteBg">
            <PostCreator
              isModal={true}
              handleCreatePostModal={handleCreatePostModal}
            />
          </div>
        </div>
      )}
    </>
  )
}