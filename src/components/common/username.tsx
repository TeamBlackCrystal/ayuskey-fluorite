import { User } from "ayuskey.js/built/entities";
import { FC } from "react";
import { MFM } from "../../utils/mfm";

export const UserName: FC<{user: User}> = ({user}) => {
  return (
    <MFM text={user.name || user.username} plain={true} emojis={user.emojis}/>
  )
}
