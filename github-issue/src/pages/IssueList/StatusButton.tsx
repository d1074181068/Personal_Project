import { useDispatch, useSelector } from 'react-redux'

//custom
import { handleStateFilter } from '../../redux/querySlice'
import { RootState } from '../../redux/store'

type PropsType = {
  icon: JSX.Element
  text: string
}

function StatusButton({ icon, text }: PropsType) {
  const dispatch = useDispatch()
  const { queryReducer } = useSelector((store: RootState) => store)
  return (
    <button
      className={`${
        queryReducer.issueState === text
          ? 'font-medium'
          : 'font-normal text-textGray'
      } mr-1 flex items-center`}
      onClick={() => dispatch(handleStateFilter(text))}>
      <span className='mr-[5px]'>{icon}</span>
      <span>{text}</span>
    </button>
  )
}

export default StatusButton
