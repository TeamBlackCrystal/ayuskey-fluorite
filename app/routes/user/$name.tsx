import type { LoaderFunction, MetaFunction } from "@remix-run/node"
import { useParams } from "@remix-run/react"
import type { UserDetailed } from "ayuskey.js/built/entities"
import { json } from "remix-utils"
import { AyuskeyClient } from "~/hooks/useAyuskeyClient"

export const meta: MetaFunction = ({data}) => {
    if (!data) {
        return {
            title: "ユーザーが見つかりません"
        }
    }
    const user = JSON.parse(data) as UserDetailed
    console.log('ここ', user)
    return {
        title: user.name ? `${user.name} (@${user.username})` : `@${user.username}`,
        description: user.description
    }
}


export const loader: LoaderFunction = async ({params}) => {
    console.log(params)
    if (!params.name) throw new Error('NotFound User')
    const api = AyuskeyClient()
    const user = await api.request('users/show', {username: params.name})
    console.log(user)
    return json(user)
}

export const ErrorBoundary = ({error}: {error: Error}) => {
    return <div>
        ユーザーが見つかりません
    </div>
}

const UserProfile = () => {
    const params = useParams()
    return (
        <div>{params.name}@{params.host}</div>
    )
}

export default UserProfile
