import { ThemeProvider, useTheme } from "@emotion/react"
import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import { appActions } from "./app/AppSlice"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { LoadServer, NotFound } from "./components/Common"
import { Home } from "./components/Layouts/Home"
import { Store } from "./components/Layouts/ListItem"
import { ProtectAuth, ProtectCheckout } from "./components/ProtectRouter"
import AllFood from "./features/AllFood"
import DetailStore from "./features/DetailStore"
import FoodByType from "./features/FoodByType"
import SearchList from "./features/SearchFood/components/SearchList"
import GetAllStore from "./features/Store"
import User from "./features/User"
import { Account } from "./features/User/Account"
import { ChangePassword } from "./features/User/ChangePassword"
import { UserOrders } from "./features/User/Orders"
import { Profile } from "./features/User/Profile"
import { AuthCard } from "./features/auth/pages/AuthCard"
import ForgotPassword from "./features/auth/pages/ForgotPassword"
import { LoginPage } from "./features/auth/pages/LoginPage"
import { RegisterPage } from "./features/auth/pages/RegisterPage"
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}
function App() {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { width } = useAppSelector((state) => state.app)
  useEffect(() => {
    function handleResize() {
      dispatch(appActions.setWidth(getWindowDimensions().width))
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
 
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<LoadServer />}>
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />

          <Route path="/" element={<Home />} />
          <Route path="/user/*" element={<User />}>
            <Route path="orders" element={<UserOrders />} />
            {width > 800 ? (
              <>
                <Route path="profile" element={<Profile />} />
                <Route path="changePassword" element={<ChangePassword />} />
              </>
            ) : (
              <Route path="account" element={<Account />} />
            )}
            <Route path="*" element={<NotFound />}></Route>
          </Route>
          <Route path="/store" element={<Store />}>
            <Route path="get-all-store" element={<GetAllStore />} />
            <Route path="get-all-food" element={<AllFood />} />
            <Route path="detail-store/:idStore" element={<DetailStore />} />
            <Route path="type-food/:idTypeFood" element={<FoodByType />} />
          </Route>
          <Route path="/search" element={<SearchList />}></Route>
          <Route path="/checkout" element={<ProtectCheckout />} />
          <Route element={<ProtectAuth />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/auth/the-sv" element={<AuthCard />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
