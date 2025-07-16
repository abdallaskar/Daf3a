import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";

import LayOut from "./components/LayOut/LayOut";
import Login from "./pages/Login/Login";
import Signup from "./pages/Register/Signup";
import FindMentors from "./pages/FindMentors/FindMentors";
import MentorDetails from "./pages/MentorDetails/MentorDetails";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

function App() {
  return (
    <>
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Home />} />
          <Route path="/findMentors" element={<FindMentors />} />
          <Route path="/mentorDetails/:id" element={<MentorDetails />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
