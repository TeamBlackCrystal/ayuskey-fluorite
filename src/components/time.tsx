import { FC, memo, useEffect, useState } from "react"

interface Props {
  originalTime: string | Date
  style?: React.CSSProperties
}

export const Time: FC<Props> = memo(({originalTime, style}) => {
  const [now] = useState<Date>(new Date())
  const [time, setTime] = useState('')
  const _time = (): Date => {
    return typeof originalTime === 'string' ? new Date(originalTime) : originalTime
  }


  const relative = () => {
    const __time = _time()
    const ago = (new Date().getTime() - __time.getTime()) / 1000
    // console.log(__time, ago)

    const newTime =
      ago >= 31536000 ? '{}年前'  .replace('{}', (~~(ago / 31536000)).toString()) :
      ago >= 2592000  ? '{}ヵ月前' .replace('{}', (~~(ago / 2592000)).toString()) :
      ago >= 604800   ? '{}週間前'  .replace('{}', (~~(ago / 604800)).toString()) :
      ago >= 86400    ? '{}日前'   .replace('{}', (~~(ago / 86400)).toString()) :
      ago >= 3600     ? '{}時間前'  .replace('{}', (~~(ago / 3600)).toString()) :
      ago >= 60       ? '{}分前'.replace('{}', (~~(ago / 60)).toString()) :
      ago >= 10       ? '{}秒前'.replace('{}', (~~(ago % 60)).toString()) :
      ago >= -1       ? '{}たった今' :
      ago <  -1       ? '{}未来' : '謎'
      setTime(newTime)


  }

  useEffect(() => {
    relative()
    setTimeout(() => {
      relative()
      // window.requestAnimationFrame(relative)
    }, 10000)
  }, [])



  return (
    <div style={style}>
    <span>{time}</span>
    </div>
  )
}
)
