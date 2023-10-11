import {
  AccountCircleOutlined,
  PersonOutline,
  ReceiptOutlined,
} from "@mui/icons-material"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import Box from "@mui/material/Box"
import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"

export function MenuXS() {
  const [value, setValue] = React.useState("")
  const {pathname}=useLocation()
  const navigate=useNavigate()
  React.useEffect(()=>{
    if(pathname.split("/")[2]==="account"){
      setValue("acccount")
    }
    if(pathname.split("/")[2]==="orders"){
      setValue("orders")
    }
  },[])
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: string,
  ) => {
    if(newValue===value) return
    if(newValue==="account"){
      navigate("/user/account")
    }
    if(newValue==="orders"){
      navigate("/user/orders")
    }
    setValue(newValue)
  }
  return (
    <Box sx={{ width: "100vw", position: "fixed", bottom: "0", left: "0",zIndex:20 }}>
      <BottomNavigation
        sx={{
          "& .Mui-selected *": {
            color: "var(--color-df-1)",
            fontWeight: "500",
          },
        }}
        onChange={handleChange}
        value={value}
      >
        <BottomNavigationAction
          value="orders"
          label="Đơn mua"
          icon={<ReceiptOutlined />}
        />
        <BottomNavigationAction
          value="account"
          label="Tài khoản"
          icon={<AccountCircleOutlined />}
        />
      </BottomNavigation>
    </Box>
  )
}
