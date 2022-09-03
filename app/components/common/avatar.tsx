import type { UserLite } from "ayuskey.js/built/entities"
import type { CSSProperties, FC } from "react"
import styled from "styled-components"

interface Props {
  user: UserLite
  style: CSSProperties
}

const AvatarContainer = styled.span`
position: relative;
display: inline-block;
vertical-align: bottom;
flex-shrink: 0;
border-radius: 100%;
line-height: 16px;
`

const AvatarInner = styled.img`
position: absolute;
bottom: 0;
left: 0;
right: 0;
top: 0;
border-radius: 100%;
z-index: 1;
overflow: hidden;
object-fit: cover;
width: 100%;
height: 100%;
`

export const Avatar: FC<Props> = ({user, style}) => {
  return (
    <AvatarContainer style={style}>
      <AvatarInner src={user.avatarUrl}/>
    </AvatarContainer>
  )
}
