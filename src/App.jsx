import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UpdatePassword from "./pages/UpdatePassword";
import Character from "./pages/Details";
import './styles/App.css';

const App = () => {
  return (
    <>
      <NavBar />
      <div className="separator"></div>
      <Container fluid id="app-wrapper" className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <Routes>
          {/* Protected endpoints */}
          <Route element={<AuthRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/character/:id" element={<Character />} />
          </Route>
          {/* Unprotected endpoints */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passwordreset" element={<PasswordReset />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
