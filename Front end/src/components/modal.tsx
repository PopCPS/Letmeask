import { useAppDispatch } from "../store/hooks"
import { set_isModalOpen } from "../store/reducers/dataReducer"
import { Button } from "./button"

interface ModalProps  {
  errorMessage: string | null
}

export const Modal = ({ errorMessage }: ModalProps) => {

  const dispatch = useAppDispatch()

  const closeModal = () => {
    dispatch(set_isModalOpen(false))
  }

  return (
    <div className="fixed flex z-10 items-center justify-center inset-0 bg-grayDark/60">
      <div className="flex flex-col items-center justify-center w-[590px] h-[362px] bg-white rounded-lg">
        <p>{errorMessage}</p>
        <Button
          onClick={closeModal}
        >
          voltar
        </Button>
      </div>
    </div>
  )
}