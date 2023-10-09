import { ThemeProvider, useTheme } from "@emotion/react"
import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import { useAppDispatch } from "./app/hooks"
import { appActions } from "./appSlice"
import { LoadServer, NotFound } from "./components/Common"
import { Home } from "./components/Layouts/Home"
import { Store } from "./components/Layouts/ListItem"
import {
  ProtectAuth,
  ProtectCheckout
} from "./components/ProtectRouter"
import AllFood from "./features/AllFood"
import DetailStore from "./features/DetailStore"
import FoodByType from "./features/FoodByType"
import SearchList from "./features/SearchFood/components/SearchList"
import GetAllStore from "./features/Store"
import User from "./features/User"
import { ChangePassword } from "./features/User/ChangePassword"
import { UserOrders } from "./features/User/Orders"
import { Profile } from "./features/User/Profile"
import { AuthCard } from "./features/auth/pages/AuthCard"
import { LoginPage } from "./features/auth/pages/LoginPage"
import { RegisterPage } from "./features/auth/pages/RegisterPage"
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function App() {
  const theme = useTheme()
  const dispatch=useAppDispatch()
  useEffect(() => {
    function handleResize() {
      dispatch(appActions.setWidth(getWindowDimensions().width))
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const VERSION = localStorage.getItem("APP_VERSION")
    console.log(import.meta.env.VITE_APP_VERSION,VERSION !== import.meta.env.VITE_APP_VERSION)
    if (VERSION) {
      if (VERSION !== import.meta.env.VITE_APP_VERSION) {
        localStorage.clear()
        localStorage.setItem("APP_VERSION", import.meta.env.VITE_APP_VERSION)
      }
    } else {
      localStorage.setItem("APP_VERSION", import.meta.env.VITE_APP_VERSION)
    }
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
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<UserOrders/>} />
            <Route path="changePassword" element={<ChangePassword />} />
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
            <Route path="/auth/the-sv" element={<AuthCard />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
