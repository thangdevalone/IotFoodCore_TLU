import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useInforUser, useScroll, useWindowDimensions } from "@/hooks"
import { Avatar, Box, Stack, Typography } from "@mui/material"
import { MouseEvent, useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { CartDrawer, SwitchLightDark } from "."
import { CustomButton } from "../Custom/CustomButon"
import { BagIcon, NotiIcon } from "../Icon"
import ChatIcon from "@mui/icons-material/Chat"
import { MenuUser } from "./MenuUser"
import "./styles_common.css"
import classNames from "classnames"
import { cartActions } from "./CartDrawer/CartSlice"
import { ChatConversationsList } from "../../features/Chat/ChatConversationsList/index"
export interface HeaderProps {
  isHeaderColorRed: boolean
}
import { handlePrice } from "@/utils"

export function Header(props: HeaderProps) {
  const { isHeaderColorRed } = props
  const user = useInforUser()
  const dispatch = useAppDispatch()
  const scrollY = useScroll()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [quantityCart, setQuantityCart] = useState<number>(0)
  const [price, setPrice] = useState<number>(0)
  let ChatConversationsListRef = useRef<HTMLDivElement>(null)
  const { items } = useAppSelector((state) => state.cart)

  useEffect(() => {
    // Xử lý sự kiện khi click ra ngoài ChatConversationsList
    let handleOnclickOutside = (e: any) => {
      if (!ChatConversationsListRef.current?.contains(e.target)) {
        setChatOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOnclickOutside)
    return () => {
      document.removeEventListener("mousedown", handleOnclickOutside)
    }
  }, [])

  const handleClick = (event: MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClickChatIcon = () => {
    setChatOpen(true)
  }
  const { width } = useWindowDimensions()
  const setterBg = scrollY >= 100 ? true : false
  const mobile = width <= 750 ? true : false
  const handleOpenCard = () => {
    dispatch(cartActions.toggleCart())
  }

  useEffect(() => {
    setQuantityCart(items.reduce((sum:any, item:any) => sum + item.quantity, 0))
    setPrice(items.reduce((sum:any, item:any) => sum + item.price * item.quantity, 0))
  }, [items])

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
          { "header-sd": !(setterBg || isHeaderColorRed) && !mobile, "header-color": setterBg || isHeaderColorRed },
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
            {width > 450 && (
              <CustomButton
                onClick={handleOpenCard}
                sx={{
                  padding: "10px 12px",
                  mr: 1,
                  minWidth: "unset",
                  position: "relative",
                  display: "flex",
                  gap: "3px",
                  backgroundColor: `${
                    setterBg || items.length === 0
                      ? "white"
                      : "var(--color-layer-2)"
                  }`,
                }}
              >
                <BagIcon
                  color={`${
                    setterBg || items.length === 0
                      ? "black"
                      : "var(--color-tx-1)"
                  }`}
                />
                {items.length > 0 && (
                  <>
                    <Box className="absolute top-[-10px] left-[-10px] h-6 w-6 bg-white border rounded-full">
                      <Typography>{quantityCart}</Typography>
                    </Box>
                    <Typography
                      sx={{
                        transform: "translateY(1px)",
                        color: `${
                          setterBg || items.length === 0 ? "black" : "inherit"
                        }`,
                      }}
                    >
                      {handlePrice(price)} ₫
                    </Typography>
                  </>
                )}
              </CustomButton>
            )}
            {user ? (
              <>
                <CustomButton
                  sx={{ padding: "10px 12px", mr: 1, minWidth: "unset" }}
                  onClick={handleClickChatIcon}
                >
                  <ChatIcon />
                </CustomButton>
                <div
                  className="absolute top-[50px] right-0 z-50"
                  ref={ChatConversationsListRef}
                >
                  {chatOpen && (
                    <ChatConversationsList setChatOpen={setChatOpen} />
                  )}
                </div>
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
