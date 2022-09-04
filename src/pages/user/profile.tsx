import { FC, useEffect } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import parseAcct from '../../utils/acct/parse';

// import { fetchUser } from "../../middlewares/user"


export const UserProfile = () => {
  const {acct} = useParams()
  if (acct) {
    console.log(parseAcct(acct))
  }
  // const userProfile = useQuery(`userProfile_${username}`, fetchUser(String(username)))

  return (
    <></>
    // <>{userProfile.data?.name}</>
  )
}
