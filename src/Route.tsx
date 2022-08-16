import { FC, memo } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";

export const Router: FC = memo(() => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    )
})