//Library
import React from 'react'
import { CheckIcon } from '@primer/octicons-react'
import { useDispatch, useSelector } from 'react-redux'

//custom
import { RootState } from '../../redux/store'
import { handleFilters } from '../../redux/querySlice'

type PropsType = {
  text: string
  index: number
  currentCheck: number
  display: string
  setCurrentCheckFn: React.Dispatch<React.SetStateAction<number>>
  setFilterListOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function MobileFilterDown({
  text,
  index,
  currentCheck,
  display,
  setCurrentCheckFn,
  setFilterListOpen
}: PropsType) {
  const dispatch = useDispatch()
  const { queryReducer } = useSelector((store: RootState) => store)
  return (
    <button
      className=' flex w-full items-center border-0 border-b-[1px] border-solid border-borderGray py-2 pr-3 pl-2 last:rounded-br-lg last:rounded-bl-lg last:border-b-0 hover:bg-commonBgGray '
      onClick={() => {
        dispatch(
          handleFilters(
            text === 'Your issues'
              ? queryReducer.filters === 'allIssue'
                ? ''
                : 'allIssue'
              : text === 'Everything assigned to you'
              ? queryReducer.filters === 'assign'
                ? ''
                : 'assign'
              : queryReducer.filters === 'mention'
              ? ''
              : 'mention'
          )
        )
        if (currentCheck === index) {
          setCurrentCheckFn(-1)
        } else {
          setCurrentCheckFn(index)
        }
        setFilterListOpen(false)
      }}>
      <div className={`mr-2 ${display}`}>
        <CheckIcon />
      </div>

      {text}
    </button>
  )
}

export default MobileFilterDown
