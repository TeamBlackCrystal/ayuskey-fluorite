import { theme } from "../theme"

export const Divider = () => {
  return (
    <div style={{margin: "10px 0", borderTop: `solid .5px ${theme.props.divider}`}}/>
  )
}
