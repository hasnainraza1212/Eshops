import SideBar from "./../../SideBar"
import { Outlet, Navigate } from "react-router-dom"
const Layout = () => {
  const accessToken = localStorage.getItem("fireBaseAccessToken")
  return (
    <div>
      {accessToken?
      <div>
      <SideBar />
      <div className="app">
      <Outlet />
      </div> 
      </div>
      :<Navigate to="/login"/>}
    </div>
  )
}
export default Layout