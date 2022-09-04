import { useContext } from "react"
import { streamingContext } from "../App"

export const useStreaming = () => {
  return useContext(streamingContext)
}
