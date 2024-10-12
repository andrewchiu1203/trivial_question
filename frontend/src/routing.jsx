import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/about";
import Main from "./pages/main";
import Error from "./pages/error";
import Contact from "./pages/contact";

function Routing(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element = {<Main />} path = "main" />
                <Route element = {<About />} path = "/about" />
                <Route element = {<Contact />} path = "/contact" />
                <Route element = {<Error />} path="*" />
            </Routes>
        </BrowserRouter>
    )
}

export default Routing;