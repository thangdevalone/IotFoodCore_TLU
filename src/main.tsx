import { useRef, useEffect } from "react"
import { CssBaseline } from "@mui/material"
import { SnackbarProvider } from "notistack"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import NavigateSetter from "./Router/NavigateSetter"
import { persistor, store } from "./app/store"
import "./index.css"
import { PersistGate } from "redux-persist/integration/react"
import storage from "redux-persist/lib/storage"
const Container = () => {
  useEffect(() => {
      const VERSION = localStorage.getItem("APP_VERSION")
      console.log(VERSION, import.meta.env.VITE_APP_VERSION)
      if (VERSION) {
        if (VERSION != import.meta.env.VITE_APP_VERSION) {
          localStorage.clear()
          localStorage.setItem("APP_VERSION", import.meta.env.VITE_APP_VERSION)
        }
      } else {
        localStorage.setItem("APP_VERSION", import.meta.env.VITE_APP_VERSION)
      }
  }, [])

  return (
    <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <SnackbarProvider
          autoHideDuration={1500}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <NavigateSetter />
          <CssBaseline />
          <App />
        </SnackbarProvider>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}
ReactDOM.createRoot(document.getElementById("root")!).render(<Container />)
