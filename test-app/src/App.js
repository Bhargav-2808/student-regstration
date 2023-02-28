import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Admin from "./Components/Admin";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Loader from "./Components/Loader";
import Profile from "./Components/Profile";
import { AdminProtected, WelcomeProtected } from "./Components/Protected";
import Welcome from "./Components/Welcome";
import appContext from "./Context/context";

const App = () => {
  const { getUserData } = useContext(appContext);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/welcome"
          element={<WelcomeProtected Component={Welcome} />}
        />
        <Route
          path="/profile"
          element={<WelcomeProtected Component={Profile} />}
        />
        <Route path="/admin" element={<AdminProtected Component={Admin} />} />
      </Routes>

      <ToastContainer autoClose={1000} />
      <Footer />
    </>
  );
};

export default App;
