import { User } from "ayuskey.js/built/entities";
import { CSSProperties, FC } from "react";
import { MFM } from "../../utils/mfm";

interface Props {
  style?: CSSProperties
  user: User
}

export const UserName: FC<Props> = ({user, style}) => {
  return (
    <MFM text={user.name || user.username} plain={true} emojis={user.emojis} style={style}/>
  )
}
