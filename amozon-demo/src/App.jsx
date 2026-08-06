import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SignIn from "./components2/SignIn";
import SignUp from "./components2/SignUp";
import Addcart from "./components3/Addcart";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Addcart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;