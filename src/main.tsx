import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { CssBaseline } from "@mui/material"
import NavigateSetter from "./Router/NavigateSetter"
import { SnackbarProvider } from "notistack"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider
          autoHideDuration={3500}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <NavigateSetter />
          <CssBaseline />
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
