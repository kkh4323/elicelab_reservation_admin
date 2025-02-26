import PropTypes from "prop-types"
import React from "react"
// import { useSelector } from "react-redux";
// import { createSelector } from "reselect";
import {
  Routes,
  Route,
  createBrowserRouter,
  Link,
  Navigate,
  RouterProvider,
} from "react-router-dom"
import { layoutTypes } from "./constants/layout"
// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes"

// Import all middleware
import Authmiddleware from "./routes/route"

// layouts Format
import VerticalLayout from "./components/VerticalLayout/"
import HorizontalLayout from "./components/HorizontalLayout/"
import NonAuthLayout from "./components/NonAuthLayout"

// Import scss
import "./assets/scss/theme.scss"
import PublicRoute from "./components/PublicRoute"
import Login from "./pages/Authentication/Login"
import Logout from "./pages/Authentication/Logout"
import ForgetPwd from "./pages/Authentication/ForgetPassword"
import FindEmail from "./pages/Authentication/FindEmail"
import Register from "./pages/Authentication/Register"
import ChangePassword from "./pages/Authentication/ChangePassword"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./pages/Dashboard"
import { UserList } from "./pages/User"
import { AddSpace, SpaceList } from "./pages/Space"
import SpaceDetail from "./pages/Space/SpaceDetail"
import { ReservationList } from "./pages/Reservation"
import { BlogGrid, BlogList } from "./pages/Blog"
import { AuthProvider } from "./context/AuthContext"
import Layout from "./components/Layout"

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

// import fakeBackend from "./helpers/AuthType/fakeBackend";

// Activating fake backend
// fakeBackend();

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASEURL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig);

// const getLayout = layoutType => {
//   let Layout = VerticalLayout
//   switch (layoutType) {
//     case layoutTypes.VERTICAL:
//       Layout = VerticalLayout
//       break
//     case layoutTypes.HORIZONTAL:
//       Layout = HorizontalLayout
//       break
//     default:
//       break
//   }
//   return Layout
// }
//
// const Layout = getLayout()

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/logout", element: <Logout /> },
          { path: "/forgot-password", element: <ForgetPwd /> },
          { path: "/find-email", element: <FindEmail /> },
          { path: "/register", element: <Register /> },
          { path: "/change/password", element: <ChangePassword /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          {
            path: "/",
            exact: true,
            element: <Navigate to="/dashboard" />,
          },
          {
            path: "/users",
            exact: true,
            element: <UserList />,
          },
          {
            path: "/spaces",
            exact: true,
            element: <SpaceList />,
          },
          {
            path: "/spaces/:spaceId",
            exact: true,
            element: <SpaceDetail />,
          },

          {
            path: "/add/space",
            exact: true,
            element: <AddSpace />,
          },
          {
            path: "/reservations",
            exact: true,
            element: <ReservationList />,
          },
          {
            path: "/blogs/list",
            exact: true,
            element: <BlogList />,
          },
          {
            path: "/blogs/grid",
            exact: true,
            element: <BlogGrid />,
          },
        ],
      },
    ],
  },
])

const App = () => {
  // const LayoutProperties = createSelector(
  //   (state) => state.Layout,
  //   (layout) => ({
  //     layoutType: layout.layoutType,
  //   })
  // );

  // const {
  //   layoutType
  // } = useSelector(LayoutProperties);

  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
    // <React.Fragment>
    //   <Routes>
    //     {publicRoutes.map((route, idx) => (
    //       <Route
    //         path={route.path}
    //         element={<NonAuthLayout>{route.component}</NonAuthLayout>}
    //         key={idx}
    //         exact={true}
    //       />
    //     ))}
    //
    //     {authProtectedRoutes.map((route, idx) => (
    //       <Route
    //         path={route.path}
    //         element={
    //           <Authmiddleware>
    //             <Layout>{route.component}</Layout>
    //           </Authmiddleware>
    //         }
    //         key={idx}
    //         exact={true}
    //       />
    //     ))}
    //   </Routes>
    // </React.Fragment>
  )
}

App.propTypes = {
  layout: PropTypes.any,
}

export default App
