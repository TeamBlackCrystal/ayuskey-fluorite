import { json, LoaderFunction, MetaFunction } from "@remix-run/node"
import { useParams } from "@remix-run/react"
import type { UserDetailed } from "ayuskey.js/built/entities"
import { serverSideAPI } from "~/utils/api"
import { getUsername } from "~/utils/username"

export const meta: MetaFunction = ({data}) => {

    if (!data) {
        return {
            title: "ユーザーが見つかりません"
        }
    }
    const user = data.user as UserDetailed
    return {
        title: user.name ? `${user.name} (@${user.username})` : `@${user.username}`,
        description: user.description,
        'og:title': `${getUsername(user)}`,
        'og:description': user.description,
        'og:image': `${user.avatarUrl}`,
        'og:url': `${data.url}`
    }
}


export const loader: LoaderFunction = async ({params, request}) => {
    if (!params.name) throw new Error('NotFound User')
    const user = await serverSideAPI.request('users/show', {username: params.name})
    return json({user, url: request.url})
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
