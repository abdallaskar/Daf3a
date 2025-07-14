import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";

import LayOut from "./components/LayOut/LayOut";
import Login from "./pages/Login/Login";
import Signup from "./pages/Register/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
