import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useInforUser, useScroll, useWindowDimensions } from "@/hooks"
import { handlePrice } from "@/utils"
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material"
import classNames from "classnames"
import { MouseEvent, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { CartDrawer, SwitchLightDark } from "."
import { CustomButton } from "../Custom/CustomButon"
import { BagIcon, NotiIcon } from "../Icon"
import { cartActions } from "./CartDrawer/CartSlice"
import { MenuUser } from "./MenuUser"
import "./styles_common.css"
import useDetectScroll from "@smakss/react-scroll-direction"
export interface HeaderProps {}

export interface HeaderProps {}
export function Header(props: HeaderProps) {
  const user = useInforUser()
  const dispatch = useAppDispatch()
  const scrollY = useScroll()
  const totalPrice = useAppSelector((state) => state.cart.totalPrice)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { dataStore, lengthFood } = useAppSelector((state) => state.cart)
  const handleClick = (event: MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const cartRef=useRef<HTMLDivElement>(null)
  const scrollDir = useDetectScroll({});
  useEffect(()=>{
    if(scrollDir==="up" && cartRef.current){
      cartRef.current.style.transform = 'translate(-50%,0px)';
    }
    if(scrollDir=="down" && cartRef.current){
      cartRef.current.style.transform = 'translate(-50%,80px)';
    }
  },[scrollDir])
  const handleClose = () => {
    setAnchorEl(null)
  }
  const { width } = useWindowDimensions()
  const setterBg = scrollY >= 100 ? true : false
  const mobile = width <= 750 ? true : false
  const handleOpenCard = () => {
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
          { "header-sd": !setterBg && !mobile, "header-color": setterBg },
        )}
        sx={{ height: "80px", position: "fixed", zIndex: 20, top: 0 }}
      >
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          className="container-base base-pd"
          sx={{
            position: "fixed",
            top: "0",
            height: "inherit",
          }}
        >
          <Link to="/">
            <img
              src={
                mobile && setterBg
                  ? "/assets/iotfood.png"
                  : mobile
                  ? "/assets/iotfood_b.png"
                  : "/assets/iotfood.png"
              }
              style={{ width: "130px" }}
              alt="logo"
            />
          </Link>
          <Stack direction={"row"} alignItems="center" position={"relative"}>
            {width > 500 ? (
              <Badge
                color="secondary"
                badgeContent={lengthFood}
                max={99}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <CustomButton
                  onClick={handleOpenCard}
                  sx={{
                    padding: "10px 12px",
                    mr: 1,
                    minWidth: "unset",
                    display: "flex",
                    gap: "3px",
                    backgroundColor: `${
                      setterBg || dataStore.length === 0
                        ? "white"
                        : "var(--color-layer-2)"
                    }`,
                  }}
                >
                  <BagIcon
                    color={`${
                      setterBg || dataStore.length === 0 ? "black" : "white"
                    }`}
                  />
                  {dataStore.length > 0 && (
                    <>
                      <Typography
                        sx={{
                          transform: "translateY(1px)",
                          color: `${
                            setterBg || dataStore.length === 0
                              ? "black"
                              : "white"
                          }`,
                        }}
                      >
                        {handlePrice(totalPrice)} ₫
                      </Typography>
                    </>
                  )}
                </CustomButton>
              </Badge>
            ) : (
              <div ref={cartRef} style={{transition:"all 0.3s"}} className="left-[50%] -translate-x-1/2 bottom-[20px] fixed w-[100vw] px-[20px]">
                <CustomButton
                  onClick={handleOpenCard}
                  sx={{
                    padding: "12px 12px",
                    width: "100%",
                    minWidth: "unset",
                    borderRadius:"6px",
                    display: "flex",
                    backgroundColor: "var(--color-layer-2)",
                    "&:hover": {
                      backgroundColor: "var(--color-layer-2)",
                      border: "1px solid #c8c8c8",
                    },
                  }}
                >
                  <BagIcon
                    color={`${dataStore.length === 0 ? "black" : "white"}`}
                  />
                  {lengthFood>0 && <Typography
                        sx={{
                          ml:"10px",
                          transform: "translateY(1px)",
                          fontWeight: "600",
                          textTransform:"initial",
                          color: `${
                            dataStore.length === 0 ? "black" : "white"
                          }`,
                        }}
                      > - <span className="mr-[10px]">{lengthFood} món</span></Typography>}
                  {dataStore.length > 0 && (
                    <>
                      <Typography
                        sx={{
                          transform: "translateY(1px)",
                          fontWeight: "600",
                          color: `${
                            dataStore.length === 0 ? "black" : "white"
                          }`,
                        }}
                      >
                        {handlePrice(totalPrice)} ₫
                      </Typography>
                    </>
                  )}
                </CustomButton>
              </div>
            )}

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
            {width > 750 && <SwitchLightDark />}
          </Stack>
        </Stack>
      </Box>
    </>
  )
}
