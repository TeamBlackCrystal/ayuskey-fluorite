import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node"
import { useParams } from "@remix-run/react"
import { AyuskeyClient } from "~/hooks/useAyuskeyClient"

export const loader: LoaderFunction = async ({params}) => {
    if (!params.name) throw 'name is not found'
    const api = AyuskeyClient()
    const user = await api.request('users/show', {username: params.name, host: params.host})
    return json(params)
}

const UserProfile = () => {
    const params = useParams()
    return (
        <div>{params.name}@{params.host}</div>
    )
}

export default UserProfile
