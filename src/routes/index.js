import React from "react"
import { Navigate } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
import { AdminList, UserList } from "../pages/User"
import { AddSpace, SpaceList } from "../pages/Space"
import { ReservationList } from "../pages/Reservation"
import { BlogGrid, BlogList } from "../pages/Blog"
import ChangePassword from "../pages/Authentication/ChangePassword"
import FindEmail from "../pages/Authentication/FindEmail"
import SpaceDetail from "../pages/Space/SpaceDetail"

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name

  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  {
    path: "/users",
    exact: true,
    component: <UserList />,
  },
  {
    path: "/admins",
    exact: true,
    component: <AdminList />,
  },
  {
    path: "/spaces",
    exact: true,
    component: <SpaceList />,
  },
  {
    path: "/spaces/:spaceId",
    exact: true,
    component: <SpaceDetail />,
  },

  {
    path: "/add/space",
    exact: true,
    component: <AddSpace />,
  },
  {
    path: "/reservations",
    exact: true,
    component: <ReservationList />,
  },
  {
    path: "/blogs/list",
    exact: true,
    component: <BlogList />,
  },
  {
    path: "/blogs/grid",
    exact: true,
    component: <BlogGrid />,
  },
]

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/find-email", component: <FindEmail /> },
  { path: "/register", component: <Register /> },
  { path: "/change/password", component: <ChangePassword /> },
]

export { authProtectedRoutes, publicRoutes }
