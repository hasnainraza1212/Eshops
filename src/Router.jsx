import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home/Home'
import AddUser from './pages/AddUser/AddUser'
import AddBanner from './pages/AddBanner/AddBanner'
import Login from './pages/Login/Login'
import Create_Ad from './pages/Add_Ad/Add_Ad'
import Banners from './pages/Banners/Banners'
import Ads from './pages/Ads/Ads'
import AddCategory from './pages/AddCategory/AddCategory'
import Category from './pages/Category/Category'
import HandleCategory from './pages/HandleCategory/HandleCategory'
import SideBar from "./SideBar";
import Layout from "./pages/Layout/Layout";
import NotFound from "./pages/NotFound/NotFound"
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/login" element={<Login />} />
        <Route
          path="/"
          element={<Layout/>}>
              <Route index element={<Home />} />
              <Route path="add-user" element={<AddUser />} />
              <Route path="add-banner" element={<AddBanner />} />
              <Route path="add-ad" element={<Create_Ad />} />
              <Route path="add-category" element={<AddCategory />} />
              <Route path="Ads" element={<Ads />} />
              <Route path="banners" element={<Banners />} />
              <Route path="all-category" element={<Category />} />
              <Route path="handle-category" element={<HandleCategory />} />
              </Route>
              <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default Router