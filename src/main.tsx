import { CssBaseline } from "@mui/material"
import { SnackbarProvider } from "notistack"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import NavigateSetter from "./Router/NavigateSetter"
import { store } from "./app/store"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider
          autoHideDuration={2500}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <NavigateSetter />
          <CssBaseline />
          <App />
        </SnackbarProvider>
      </BrowserRouter>
  </Provider>,
)
