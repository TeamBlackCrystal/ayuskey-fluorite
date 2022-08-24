import { UserDetailed } from "@ayuskey/misskey.js/built/entities";
import { FC, memo, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { PageTransition } from "./components/PageTransition";
import { CallBack } from "./pages/cb";
import { Home } from "./pages/home";
import { UserProfile } from "./pages/user/profile";
import { Welcome } from "./pages/welcome";
import { useLogin } from "./hooks/useLogin";
import { useAsync } from "react-async"


export const Router: FC = memo(() => {
  const login = useAsync({promiseFn: useLogin})
    return (
      <PageTransition>
        <Routes>
            <Route path="/" element={login.data ? <Home />: <Welcome />} />
            <Route path="/@:username" element={<UserProfile />} />
            <Route path="/cb" element={<CallBack />} />
        </Routes>
        </PageTransition>
    )
})
