import { ThemeProvider, useTheme } from "@emotion/react"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import { LoadServer, NotFound } from "./components/Common"
import Admin from "./components/Layouts/Admin"
import { Home } from "./components/Layouts/Home"
import { Store } from "./components/Layouts/Store"
import { ProtectAdmin, ProtectAuth } from "./components/ProtectRouter"
import DetailStore from "./features/DetailStore"
import SearchList from "./features/SearchFood/components/SearchList"
import GetAllStore from "./features/Store"
import { AuthCard } from "./features/auth/pages/AuthCard"
import { LoginPage } from "./features/auth/pages/LoginPage"
import { RegisterPage } from "./features/auth/pages/RegisterPage"
import { Profile } from "./features/User/Profile"
import { User } from "./features/User"
import { OrdersUser } from "./features/User/OrdersUser"
import { ChangePassword } from "./features/User/ChangePassword"
import { Address } from "./features/User/Address"
function App() {
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<LoadServer />}>
          <Route
            path="/"
            element={
              <>
                <Home />
                {/* <Chat /> */}
              </>
            }
          />
          <Route element={<ProtectAuth />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/auth/the-sv" element={<AuthCard />} />
          </Route>
          <Route element={<ProtectAdmin />}>
            <Route path="/admin/*" element={<Admin />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/user/*" element={<User />} >
            <Route path="profile" element={<Profile />} />
            <Route path="address" element={<Address />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="orders" element={<OrdersUser />} />
          </Route>
          <Route path="/store" element={<Store />}>
            <Route path="get-all-store" element={<GetAllStore />} />
            <Route path="detail-store/:idStore" element={<DetailStore />} />
          </Route>
          <Route path="/search" element={<SearchList />}></Route>
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
