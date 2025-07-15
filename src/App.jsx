import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";

import LayOut from "./components/LayOut/LayOut";
import Login from "./pages/Login/Login";
import Signup from "./pages/Register/Signup";
import Dashboard from "./pages/Admin/Dashboard";
import Mentors from "./pages/Admin/Mentors";
import Users from "./pages/Admin/Users";
import Workshops from "./pages/Admin/Workshops";
import Reviews from "./pages/Admin/Reviews";


function App() {
  return (
    <>
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/mentors" element={<Mentors />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/workshops" element={<Workshops />} />
        <Route path="/admin/reviews" element={<Reviews />} />
        
      </Routes>
    </>
  );
}

export default App;
