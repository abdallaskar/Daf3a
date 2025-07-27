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
import CreateWorkshop from "./pages/CreateWorkshop/CreateWorkshop";
import WorkshopDetails from "./pages/WorkshopDetails/WorkshopDetails";

import MentorDashboard from "./pages/MentorDashboard/MentorDashboard";

import Checkout from "./pages/Checkout/Checkout";

import StudentProfile from "./pages/StudentProfile/StudentProfile";

import ResetPassword from "./pages/ResetPassword/ResetPassword";

import LoginSuccess from "./pages/Login/LoginSuccess";
import ChooseRole from "./pages/Login/ChooseRole";

import Chat from "./pages/Chat/Chat";
import VideoCall from "./pages/Video/VideoCall";

import { ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RmdgG09P07SloujIB7Lr6qnAmEyfMxyhJBaVRrJLyreuQV7x7BKoi6xBf6jV5NGWLTUvadB2soL0cM4Jy0hCo2A00YihpmLBu"
);

import Reports from "./pages/Admin/Reports";
import AdminProtect from "./components/Protect/AdminProtect";

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Home />} />

          <Route path="/findMentors" element={<FindMentors />} />
          <Route path="/mentorDetails/:id" element={<MentorDetails />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/workshops/:id" element={<WorkshopDetails />} />
          <Route path="/createworkshop" element={<CreateWorkshop />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/FindMentors" element={<FindMentors />} />

          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Route>
        <Route path="/chat" element={<Chat />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route
          path="/admin"
          element={
            <AdminProtect>
              <Dashboard />
            </AdminProtect>
          }
        />
        <Route
          path="/admin/mentors"
          element={
            <AdminProtect>
              <Mentors />
            </AdminProtect>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminProtect>
              <Users />
            </AdminProtect>
          }
        />
        <Route
          path="/admin/workshops"
          element={
            <AdminProtect>
              <AdminWorkshops />
            </AdminProtect>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <AdminProtect>
              <Reviews />
            </AdminProtect>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <AdminProtect>
              <Reports />
            </AdminProtect>
          }
        />
        <Route path="/mentor/booking" element={<Booking />} />
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          }
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />{" "}
        <Route path="/videocall" element={<VideoCall />} />
        <Route path="/login/success" element={<LoginSuccess />} />
        <Route path="/choose-role" element={<ChooseRole />} />
        <Route path="/mentordashboard" element={<MentorDashboard />} />
      </Routes>
    </>
  );
}

export default App;
