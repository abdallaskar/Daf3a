import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";

import LayOut from "./components/LayOut/LayOut";
import Login from "./pages/Login/Login";
import Signup from "./pages/Register/Signup";
import FindMentors from "./pages/FindMentors/FindMentors";
import MentorDetails from "./pages/MentorDetails/MentorDetails";
import Workshops from "./pages/Workshops";
import Profile from "./pages/Profile/Profile";

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
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  );
}

export default App;
