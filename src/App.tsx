import { ThemeProvider, useTheme } from "@emotion/react"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import { NotFound, ProtectAuth, ProtectSignUp } from "./components/Common"
import { AuthCard } from "./features/auth/pages/AuthCard"
import { LoginPage } from "./features/auth/pages/LoginPage"
import { RegisterPage } from "./features/auth/pages/RegisterPage"
import { Home } from "./components/Layouts/Home"

function App() {
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<ProtectAuth />}>
          <Route path="" element={<LoginPage />} />
        </Route>

        <Route path="/register" element={<ProtectSignUp />}>
          <Route path="" element={<RegisterPage />} />
        </Route>
        
        <Route path="/auth/the-sv" element={<AuthCard />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
