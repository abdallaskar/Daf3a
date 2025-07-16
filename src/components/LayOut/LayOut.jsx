import { Outlet } from "react-router"
import NavBar from "../NavBar/NavBar"
import Footer from "../Footer/Footer"

function LayOut() {
    return <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
}

export default LayOut
