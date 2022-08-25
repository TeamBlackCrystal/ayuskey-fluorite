import { FC } from "react";
import type  {CustomEmojiLite} from "ayuskey.js/built/entities";
import { useSession } from "../../store/session";
import {useSnapshot} from "valtio"

interface Props {
  emoji: string
  customEmojis?: CustomEmojiLite[]
  normal?: boolean
}

const EmojiIMG: FC<{url: string}> = ({url}) => {
  return (
    <img style={{height: "1.25em", verticalAlign: "-.25em"}} src={url}/>
  )
}

export const CustomEmoji: FC<Props> = ({emoji, customEmojis, normal}) => {
  const {meta} = useSnapshot(useSession)
  if (!meta) return <span>{emoji}</span>
  const emojis = [...(customEmojis ?? []), ...meta.emojis]
  const hitEmoji = emojis.find(e => e.name === emoji.substring(1, emoji.length - 1))
  if (hitEmoji) {
    return <EmojiIMG url={hitEmoji.url} />
  } else {
    return <span>{emoji}</span>
  }

}

export const Emoji: FC<Props> = (p) => {
  return p.emoji.startsWith(':') ? <CustomEmoji {...p} /> : <></>
}
