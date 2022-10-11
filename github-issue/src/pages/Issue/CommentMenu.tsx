import React from 'react'

type PropsType = {
  menuContent: string[][]
  actionMenuToggle: boolean
}
function CommentMenu({ menuContent, actionMenuToggle }: PropsType) {
  return (
    <div
      className={`${
        actionMenuToggle ? 'block' : 'hidden'
      } absolute top-[25px] right-[-10px] z-199 w-[185px] rounded border border-solid border-borderGray bg-white text-[14px]`}>
      {menuContent.map((item, index) => {
        return (
          <ul
            key={index}
            className={`py-[4px] ${
              index === 1 ? 'border-y border-solid border-borderGray' : ''
            }`}>
            {item.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`cursor-pointer py-1 pl-2 pr-1 ${
                    item === 'Delete'
                      ? 'text-danger hover:bg-danger hover:text-white'
                      : 'text-textBlack hover:bg-hoverBlue hover:text-white'
                  }`}>
                  <button>{item}</button>
                </li>
              )
            })}
          </ul>
        )
      })}
    </div>
  )
}

export default CommentMenu
