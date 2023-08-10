import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useInforUser, useScroll } from "@/hooks"
import { Avatar, Box, Stack } from "@mui/material"
import { MouseEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { SwitchLightDark } from "."
import { CustomButton } from "../Custom/CustomButon"
import { BagIcon, NotiIcon } from "../Icon"
import { MenuUser } from "./MenuUser"
import "./styles_common.css"
import classNames from "classnames"
import { CartDrawer } from "./CartDrawer"
import { cartActions } from "./CartDrawer/CartSlice"


export interface HeaderProps {}

export function Header(props: HeaderProps) {
  const user = useInforUser()
  const dispatch=useAppDispatch()
  const scrollY = useScroll()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = (event: MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const setterBg = scrollY >= 100 ? true : false
  const handleOpenCard=()=>{
    dispatch(cartActions.toggleCart())
  }
  return (
    <>
      <CartDrawer />
      <Box
        className={classNames(
          "w-screen",
          "flex",
          "items-center",
          "justify-center",
          "ani-bg",
          { "header-sd": !setterBg, "header-color": setterBg },
        )}
        sx={{ height: "80px", position: "fixed", zIndex: 20 }}
      >
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          className="container-base"
          sx={{
            position: "fixed",
            top: "0",
            height: "inherit",
            padding: "0 40px 0 40px",
          }}
        >
          <img
            src="/assets/iotfood.png"
            style={{ width: "130px" }}
            alt="logo"
          />
          <Stack direction={"row"} alignItems="center">
            <CustomButton 
              onClick={handleOpenCard}
              sx={{ padding: "10px 12px", mr: 1, minWidth: "unset" }}
            >
              <BagIcon />
            </CustomButton>

            {user ? (
              <>
                <CustomButton
                  sx={{ padding: "10px 12px", mr: 2, minWidth: "unset" }}
                >
                  <NotiIcon />
                </CustomButton>
                <Avatar
                  sx={{
                    cursor: "pointer",
                    width: 45,
                    height: 45,
                    border: "1px solid #f0efef",
                  }}
                  onClick={handleClick}
                  src={user.imgUser}
                />

                <MenuUser anchorEl={anchorEl} handleClose={handleClose} />
              </>
            ) : (
              <Link to={"/login"}>
                <CustomButton sx={{ padding: "10px 15px" }}>
                  Đăng nhập/Đăng ký
                </CustomButton>
              </Link>
            )}
            <SwitchLightDark />
          </Stack>
        </Stack>
      </Box>
    </>
  )
}
