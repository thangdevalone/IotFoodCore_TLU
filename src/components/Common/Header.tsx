import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useInforUser, useScroll, useWindowDimensions } from "@/hooks"
import { Avatar, Box, Stack } from "@mui/material"
import { MouseEvent, useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import { SwitchLightDark } from "."
import { CustomButton } from "../Custom/CustomButon"
import { BagIcon, NotiIcon } from "../Icon"
import ChatIcon from '@mui/icons-material/Chat';
import { MenuUser } from "./MenuUser"
import "./styles_common.css"
import classNames from "classnames"
import { CartDrawer } from "./CartDrawer"
import { cartActions } from "./CartDrawer/CartSlice"
import { ChatConversationsList } from "./Chat/ChatConversationsList/index"
export interface HeaderProps { }

export function Header(props: HeaderProps) {
  const user = useInforUser()
  const dispatch = useAppDispatch()
  const scrollY = useScroll()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [chatOpen, setChatOpen] = useState(false)
  let ChatConversationsListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Xử lý sự kiện khi click ra ngoài ChatConversationsList
    let handleOnclickOutside = (e: any) => {
      if (!ChatConversationsListRef.current?.contains(e.target)) {
        setChatOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOnclickOutside)
    return () => {
      document.removeEventListener('mousedown', handleOnclickOutside)
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
          <Link to='/'>
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
                sx={{ padding: "10px 12px", mr: 1, minWidth: "unset" }}
              >
                <BagIcon />
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
                <div className="absolute top-[50px]" ref={ChatConversationsListRef}>
                  {chatOpen && <ChatConversationsList setChatOpen={setChatOpen} />}
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
