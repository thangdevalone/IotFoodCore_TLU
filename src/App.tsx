import { ThemeProvider, useTheme } from "@emotion/react"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import { NotFound, ProtectAuth } from "./components/Common"
import { LoginPage } from "./features/auth/pages/LoginPage"
import { RegisterPage } from "./features/auth/pages/RegisterPage"
import { ProtectSignUp } from "./components/Common/ProtectSignUp"
import { AuthCard } from "./features/auth/pages/AuthCard"

function App() {
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <Routes>


        <Route path="/" element={<ProtectAuth />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<ProtectSignUp/>} >
            <Route path="" element={<RegisterPage/>}/>
          </Route>
        </Route>
        <Route path="/auth/the-sv" element={<AuthCard/>}/>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
