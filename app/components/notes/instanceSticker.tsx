import type { Note } from "ayuskey.js/built/entities"
import type { FC } from "react"

interface Props {
  note: Note
}

const instanceTextShadow =
"1px 0 1px #000, 0.866px 0.5px 1px #000, 0.5px 0.866px 1px #000, 0 1px 1px #000, -0.5px 0.866px 1px #000, -0.866px 0.5px 1px #000, -1px 0 1px #000, -0.866px -0.5px 1px #000, -0.5px -0.866px 1px #000, 0 -1px 1px #000, 0.5px -0.866px 1px #000, 0.866px -0.5px 1px #000";


export const InstanceSticker: FC<Props> = ({note}) => {
  return (
    <>
    				{note.user.instance && (
					<div
						style={{
							background: `linear-gradient(90deg, ${note.user.instance
								.themeColor}, rgba(134, 179, 0, 0))`,
							display: "flex",
							height: "1.1rem",
							overflow: "hidden",
							borderRadius: "4px 0 0 4px",
							color: "#fff",
							textShadow: instanceTextShadow,
						}}
					>
						<img
							src={note.user.instance.iconUrl}
							height="100%"
							style={{
								margin: "0px !important",
								marginRight: ".2em",
							}}
						/>
						<span
							style={{
								marginLeft: "4px",
								lineHeight: "1.1rem",
								fontSize: ".9em",
								verticalAlign: "top",
								fontWeight: 700,
							}}
						>
							{note.user.instance.name}
						</span>
					</div>
				)}
    </>
  )
}
