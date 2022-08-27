import { FC, useMemo } from "react";
import type  {CustomEmojiLite} from "ayuskey.js/built/entities";
import { useSession } from "../../store/session";
import {useSnapshot} from "valtio"
import { TWEMOJI_BASE } from "../../const";
import styled from "styled-components";

interface Props {
  emoji: string
  customEmojis?: CustomEmojiLite[]
  normal?: boolean
}


const EmojiIMG = styled.img`
  height: 1.25em;
	vertical-align: -0.25em;
`;

export const UnicodeEmojiView = ({emoji}: Props) => {
  const url = useMemo(() => {
    let codes = Array.from(emoji).map(x => x.codePointAt(0)?.toString(16));
    if (!codes.includes('200d')) codes = codes.filter(x => x != 'fe0f');
    codes = codes.filter(x => x && x.length);

    return `${TWEMOJI_BASE}/${codes.join('-')}.svg`;
  }, [emoji]);

  return <EmojiIMG src={url} alt={emoji} title={emoji} decoding="async" />;
}

export const CustomEmoji: FC<Props> = ({emoji, customEmojis, normal}) => {
  const {meta} = useSnapshot(useSession)
  if (!meta) return <span>{emoji}</span>
  const emojis = [...(customEmojis ?? []), ...meta.emojis]
  const hitEmoji = emojis.find(e => e.name === emoji.substring(1, emoji.length - 1))
  if (hitEmoji) {
    return <EmojiIMG src={hitEmoji.url} />
  } else {
    return <span>{emoji}</span>
  }

}

export const Emoji: FC<Props> = (p) => {
  return p.emoji.startsWith(':') ? <CustomEmoji {...p} /> : <UnicodeEmojiView {...p} />
}
