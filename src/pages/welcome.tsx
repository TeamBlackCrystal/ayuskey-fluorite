import { Text } from "@nextui-org/react"
import { useQuery } from "react-query"
import { useAyuskeyClient } from "../hooks/useAyuskeyClient"

export const Welcome = () => {
  const api = useAyuskeyClient()
  const {data, isLoading} = useQuery('meta', () => api.request('meta'))
  return (
    <div style={{height: "100vh", width: "100vw"}}>
      <Text>test</Text>
    </div>
  )
}
