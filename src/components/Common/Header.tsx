import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useInforUser, useScroll, useWindowDimensions } from "@/hooks"
import { handlePrice } from "@/utils"
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material"
import useDetectScroll from "@smakss/react-scroll-direction"
import classNames from "classnames"
import { MouseEvent, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { CartDrawer } from "."
import { CustomButton } from "../Custom/CustomButon"
import { BagBoldIcon, BagIcon, NotiIcon } from "../Icon"
import { cartActions } from "./CartDrawer/CartSlice"
import { MenuUser } from "./MenuUser"
import "./styles_common.css"
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
  const cartRef = useRef<HTMLDivElement>(null)
  const scrollDir = useDetectScroll({})
  useEffect(() => {
    if (scrollDir === "up" && cartRef.current) {
      cartRef.current.style.transform = "translate(-50%,0px)"
    }
    if (scrollDir == "down" && cartRef.current) {
      cartRef.current.style.transform = "translate(-50%,80px)"
    }
  }, [scrollDir])
  const handleClose = () => {
    setAnchorEl(null)
  }
  const { width } = useWindowDimensions()
  const setterBg =
    scrollY >= 40 || (scrollY >= 50 && width < 500) ? true : false
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
        sx={{
          height: `${width <= 500 ? "60px" : "80px"}`,
          position: "fixed",
          zIndex: 20,
          top: 0,
        }}
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
              style={{ width: `${width <= 500 ? "100px" : "130px"}` }}
              alt="logo"
            />
          </Link>
          <Stack direction={"row"} alignItems="center" position={"relative"}>
            {width > 500 ? (
              <Badge
                color="secondary"
                badgeContent={lengthFood}
                max={99}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "var(--color-df-1)",
                  },
                }}
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
                      setterBg || lengthFood === 0
                        ? "white"
                        : "var(--color-layer-2)"
                    }`,
                    "&:hover": {
                      backgroundColor: `${
                        setterBg || lengthFood === 0
                          ? "white"
                          : "var(--color-layer-2)"
                      }`,
                      border: "1px solid #c8c8c8",
                    },
                  }}
                >
                  <BagIcon
                    color={`${
                      setterBg || dataStore.length === 0
                        ? "var(--color-df-1)"
                        : "white"
                    }`}
                  />
                  {lengthFood > 0 && (
                    <>
                      <Typography
                        sx={{
                          fontSize: "16x",
                          fontWeight: "500",
                          transform: "translateY(1px)",
                          color: `${
                            setterBg || lengthFood === 0 ? "black" : "white"
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
              <div
                ref={cartRef}
                style={{ transition: "all 0.3s" }}
                className={classNames(
                  "max-w-[400px]",
                  "bottom-[15px]",
                  "fixed",
                  "w-[100vw]",
                  "px-[20px]",
                  {
                    "left-[50%] -translate-x-1/2": lengthFood > 0,
                    "left-[123%]": lengthFood === 0,
                  },
                )}
              >
                {lengthFood > 0 ? (
                  <CustomButton
                    onClick={handleOpenCard}
                    sx={{
                      padding: "10px 20px",
                      width: "100%",
                      minWidth: "unset",
                      borderRadius: "30px",
                      display: "flex",
                      justifyContent: "space-between",
                      border: "none",
                      textTransform: "unset",
                      backgroundColor: "var(--color-layer-2)",
                      "&:hover": {
                        backgroundColor: "var(--color-layer-2)",
                        border: "none",
                      },
                    }}
                  >
                    {lengthFood > 0 && (
                      <Stack
                        direction="column"
                        sx={{ "& > *": { color: "white" } }}
                        alignItems="flex-start"
                      >
                        <span className="font-semibold text-sm">
                          {lengthFood} món
                        </span>
                        <span className="font-light text-sx">
                          Đại học Thăng Long
                        </span>
                      </Stack>
                    )}
                    <Stack direction="row" alignItems="center">
                      {dataStore.length > 0 && (
                        <>
                          <Typography
                            sx={{
                              fontSize: "17px",
                              fontWeight: "600",
                              color: `${
                                dataStore.length === 0 ? "black" : "white"
                              }`,
                              mr: "5px",
                            }}
                          >
                            {handlePrice(totalPrice)} ₫
                          </Typography>
                        </>
                      )}
                      <BagBoldIcon color="white" fontSize="large" />
                    </Stack>
                  </CustomButton>
                ) : (
                  <CustomButton
                    onClick={handleOpenCard}
                    sx={{
                      padding: "13px 15px",
                      mr: 1,
                      minWidth: "unset",
                      display: "flex",
                      gap: "3px",

                      backgroundColor: "var(--color-df-1)",

                      "&:hover": {
                        backgroundColor: "var(--color-df-1)",
                      },
                    }}
                  >
                    <BagIcon color="white" />
                  </CustomButton>
                )}
              </div>
            )}

            {user ? (
              <>
                <CustomButton
                  sx={{
                    padding: width <= 500 ? "7px 10px" : "10px 12px",
                    mr: 2,
                    minWidth: "unset",
                  }}
                >
                  <NotiIcon />
                </CustomButton>

                <Avatar
                  sx={{
                    cursor: "pointer",
                    width: width <= 500 ? 35 : 45,
                    height: width <= 500 ? 35 : 45,
                    border: "1px solid #f0efef",
                  }}
                  onClick={handleClick}
                  src={user.imgUser}
                />

                <MenuUser anchorEl={anchorEl} handleClose={handleClose} />
              </>
            ) : (
              <Link to={"/login"}>
                <CustomButton  sx={{ padding: "10px 15px" ,fontSize:`${width<=500?"10px":"13px"}`,height:"100%"}}>
                  Đăng nhập/Đăng ký
                </CustomButton>
              </Link>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  )
}
