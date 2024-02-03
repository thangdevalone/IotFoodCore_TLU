import { ThemeProvider, useTheme } from "@emotion/react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material"
import { useEffect, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
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
import { authActions } from "./features/auth/AuthSlice"
import ForgotPassword from "./features/auth/pages/ForgotPassword"
import { LoginPage } from "./features/auth/pages/LoginPage"
import RedirectRole from "./features/auth/pages/RedirectRole"
import { useInforUser } from "./hooks"
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

function App() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const handleClose = () => {
    dispatch(authActions.logout())
    navigate("/login")
    setOpen(false)
  }
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { width } = useAppSelector((state:any) => state.app)
  const user = useInforUser()
  useEffect(() => {
    function handleResize() {
      dispatch(appActions.setWidth(getWindowDimensions().width))
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  const location = useLocation()
  useEffect(() => {
    if (user) {
      if (!user.token) {
        // Nếu không có token, người dùng đã đăng xuất
        // Thực hiện đăng xuất ở đây
        dispatch(authActions.logout())
        return
      }

      const tokenData = JSON.parse(atob(user.token.split(".")[1])) // Giải mã phần data trong token
      const expirationTime = tokenData.exp * 1000 // Chuyển từ giây sang mili giây
      const currentTime = Date.now()
      if (currentTime > expirationTime) {
        // Token đã hết hạn
        // Thực hiện đăng xuất ở đây
        setOpen(true)
      }
    }
  }, [location])

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={() => {
          return
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Phiên đăng nhập của bạn đã quá hạn"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Đăng nhập lại để tiếp tục sử dụng
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Đăng nhập
          </Button>
        </DialogActions>
      </Dialog>
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
          {/* <Route path="/user/*" element={<User />}>
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
          </Route> */}
          <Route path="/store" element={<Store />}>
            <Route path="get-all-store" element={<GetAllStore />} />
            <Route path="get-all-food" element={<AllFood />} />
            <Route path="detail-store/:idStore" element={<DetailStore />} />
            <Route path="type-food/:idTypeFood" element={<FoodByType />} />
          </Route>
          {/* <Route path="/search" element={<SearchList />}></Route> */}
          {/* <Route path="/checkout" element={<ProtectCheckout />} /> */}
          <Route element={<ProtectAuth />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RedirectRole />} />
            <Route path="/forgot" element={<ForgotPassword />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
