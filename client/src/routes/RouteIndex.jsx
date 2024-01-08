import { Route, Routes, BrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage.jsx";
import Authen from "../pages/authen/Authen.jsx";
export default function RouterIndex() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/authen" element={<Authen />} />
            </Routes>
        </BrowserRouter>
    )
}