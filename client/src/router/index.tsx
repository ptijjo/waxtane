import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connection from "../pages/Connection";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Connection />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={""} />
                <Route path="/" element={""} />
                <Route path="/" element={""} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router


