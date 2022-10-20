import _ from 'lodash'
import Emoji from '../components/Common/Emoji'
import { Reactions } from '../types/issueType'

export const turnReactionsToArray = (obj: Reactions) => {
  const array = []
  for (const [key, value] of Object.entries(obj)) {
    if (key !== 'url' && key !== 'total_count' && value !== 0) {
      array.push(
        <Emoji
          type={key}
          number={value.toString()}
          key={key + _.toString(value)}
        />
      )
    }
  }
  return array
}
