import { SHA256 } from "crypto-js";
import { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { apiClient } from "strictcat";
import { getLocalStorage, removeLocalStorage, useLocalStorage } from "../store/auth";

export const CallBack: FC = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const token = query.get("token")
  const secret = getLocalStorage("_auth_secret", null)
  const storage = useLocalStorage()
  removeLocalStorage("_auth_secret")

  useEffect(() => {
    if (!(secret && token)) return
    apiClient(`${storage.host}`).call("POST", "/api/auth/session/userkey", {}, {appSecret: secret, token: token}).then((res) => {
      if (res.type === 'failed') throw res.type, res.data
      storage.setI(SHA256(res.data.accessToken+secret).toString())
    })
  }, [])

  return (
    <div>

    </div>
  )
}
