import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Register from "../pages/Registes";
import Admin from "../pages/Admin";
import Private from "./private";

function RoutesPage(){

    return(
        <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="/registro" element={ <Register/> }/>
            <Route path="/admin" element={ <Private> <Admin/> </Private>  }/>
        </Routes>
    )
}

export default RoutesPage;