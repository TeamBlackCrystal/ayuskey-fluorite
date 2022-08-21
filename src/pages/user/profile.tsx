import { FC, useEffect } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
// import { fetchUser } from "../../middlewares/user"


export const UserProfile = () => {
  const {username} = useParams()
  // const userProfile = useQuery(`userProfile_${username}`, fetchUser(String(username)))

  return (
    <></>
    // <>{userProfile.data?.name}</>
  )
}
