import { Route, Routes } from "react-router";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import LayOut from "./components/LayOut/LayOut";
import Login from "./pages/Login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
