import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Otp from "../pages/Otp/Otp";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/EditProfile/EditProfile";
import CreatePost from "../pages/AddPost/CreatePost";
import EditPost from "../pages/EditPost/EditPost";
import UserProfile from "../pages/UserProfile/UserProfile";
import Suggestions from "../pages/Suggestions/Suggestions";
import Followers from "../pages/Followers/Followers";
import Following from "../pages/Following/Following";
import Prime from "../pages/Payment/Prime";
import SearchUsers from "../pages/SearchUsers/SearchUsers";
import NotFound from "../pages/NotFound/NotFound";

import ProtectedRoute from "../components/auth/ProtectedRoute";

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Navbar />
      <Outlet />
    </ProtectedRoute>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/verify-otp/:userId" element={<Otp />} />

      {/* ================= PROTECTED ROUTES ================= */}

      <Route element={<ProtectedLayout />}>
        <Route path="/home" element={<Home />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/create-post" element={<CreatePost />} />

        <Route path="/posts/edit/:id" element={<EditPost />} />

        <Route path="/users/:id" element={<UserProfile />} />

        <Route path="/suggestions" element={<Suggestions />} />

        <Route path="/followers" element={<Followers />} />

        <Route path="/following" element={<Following />} />

        <Route path="/prime" element={<Prime />} />

        <Route path="/search" element={<SearchUsers />} />

        <Route path="/users/:id" element={<UserProfile />} />
      </Route>

      {/* ================= 404 ================= */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
