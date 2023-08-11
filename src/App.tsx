import { ThemeProvider, useTheme } from "@emotion/react"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import { LoadServer, NotFound, ProtectAuth } from "./components/Common"
import { Home } from "./components/Layouts/Home"
import { AuthCard } from "./features/auth/pages/AuthCard"
import { LoginPage } from "./features/auth/pages/LoginPage"
import { RegisterPage } from "./features/auth/pages/RegisterPage"


function App() {
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<LoadServer />}>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectAuth />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/auth/the-sv" element={<AuthCard />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
