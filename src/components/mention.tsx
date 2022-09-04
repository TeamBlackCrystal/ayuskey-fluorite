import { FC } from "react"
import { useSnapshot } from "valtio"
import { useCommon } from "~/state/common"
import { styled } from "~/stitches.config"

const Avatar = styled('img', {
  width: '1.5em',
  height: '1.5em',
  objectFit: 'cover',
  margin: '0 0.2em 0 0',
  verticalAlign: 'bottom',
  borderRadius: '100%'
})

interface Props {
  username: string
  host?: string
}

export const Mention: FC<Props> = ({host, username}) => {
  const {host: instance} = useSnapshot(useCommon)

  return (
    <div>
      <div>
        <Avatar src={`${instance}/avatar/${username}@${host}`} alt={username}/>
      </div>
    </div>
  )
}
