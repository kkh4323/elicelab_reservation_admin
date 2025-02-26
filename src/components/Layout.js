import React from "react"
import { Outlet } from "react-router-dom"
import Header from "./HorizontalLayout/Header"

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout
