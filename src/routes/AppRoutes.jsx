import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/layout/Navbar";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/EditProfile/EditProfile";
import CreatePost from "../pages/AddPost/CreatePost";
import EditPost from "../pages/EditPost/EditPost";
import UserProfile from "../pages/UserProfile/UserProfile";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts/edit/:id" element={<EditPost />} />
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
