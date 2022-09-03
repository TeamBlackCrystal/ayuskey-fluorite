import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { serverSideAPI } from "~/utils/api";

export async function loader({params}: LoaderArgs) {
    if (!params.name) throw 'name is not found'
    const api = serverSideAPI
    const user = await api.request('users/show', {username: params.name, host: params.host})
    return json(user)
}

const UserProfile = () => {
    const user = useLoaderData<typeof loader>()
    return (
        <div>{user.name}@{user.host}</div>
    )
}

export default UserProfile
