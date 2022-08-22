import { FC, memo } from "react";
import { Route, Routes } from "react-router-dom";
import { CallBack } from "./pages/cb";
import { Home } from "./pages/home";
import { UserProfile } from "./pages/user/profile";
import { Welcome } from "./pages/welcome";
import { useLocalStorage } from "./store/auth";


export const Router: FC = memo(() => {
  const storage = useLocalStorage()
    return (
        <Routes>
            <Route path="/" element={storage.i && storage.host ? <Home />: <Welcome />} />
            <Route path="/@:username" element={<UserProfile />} />
            <Route path="/cb" element={<CallBack />} />
        </Routes>
    )
})
