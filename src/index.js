import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import "./i18n"
import ReactQueryWrapper from "./hooks"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ReactQueryWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReactQueryWrapper>
)

serviceWorker.unregister()
