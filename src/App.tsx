import { ThemeProvider, useTheme } from "@emotion/react"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import { NotFound, ProtectAuth } from "./components/Common"
import { LoginPage } from "./features/auth/pages/LoginPage"
import { RegisterPage } from "./features/auth/pages/RegisterPage"

function App() {
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <Routes>


        <Route path="/" element={<ProtectAuth />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<NotFound />}></Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
