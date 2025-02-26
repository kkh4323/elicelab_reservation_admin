import React from "react"
import Cookies from "js-cookie"
import { Navigate, Outlet } from "react-router-dom"

const PublicRoute = () => {
  const accessToken = Cookies.get("accessToken")
  return accessToken ? <Navigate to="/dashboard" replace /> : <Outlet />
}

export default PublicRoute
