import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";

import LayOut from "./components/LayOut/LayOut";
import Login from "./pages/Login/Login";
import Signup from "./pages/Register/Signup";

import Dashboard from "./pages/Admin/Dashboard";
import Mentors from "./pages/Admin/Mentors";
import Users from "./pages/Admin/Users";
import Reviews from "./pages/Admin/Reviews";
import FindMentors from "./pages/FindMentors/FindMentors";
import MentorDetails from "./pages/MentorDetails/MentorDetails";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";


import AdminWorkshops from "./pages/Admin/AdminWorkshops";
import Workshops from "./pages/Workshops/Workshops";
import Profile from "./pages/Profile/Profile";
import Booking from "./pages/booking/Booking";
import Checkout from "./pages/Checkout/Checkout";


function App() {
  return (
    <>
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Home />} />

          <Route path="/findMentors" element={<FindMentors />} />
          <Route path="/mentorDetails/:id" element={<MentorDetails />} />
          <Route path="/workshops" element={<Workshops />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/FindMentors" element={<FindMentors />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/mentors" element={<Mentors />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/workshops" element={<AdminWorkshops />} />
        <Route path="/admin/reviews" element={<Reviews />} />
        <Route path="/mentor/booking" element={<Booking />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
