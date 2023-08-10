import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  Box,
  Button,
  IconButton,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material"

import "./style_drawer.css"
import { ArrowBackIosNew } from "@mui/icons-material"
import { cartActions } from "./CartSlice"
export interface CardDrawerProps {}

export function CartDrawer(props: CardDrawerProps) {
  const isOpen = useAppSelector((state) => state.cart.open)
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  const dispatch = useAppDispatch()
  const toggleDrawer = () => {
    dispatch(cartActions.toggleCart())
  }
  return (
    <div>
      <SwipeableDrawer
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            "@media (min-width:600px)": {
              width: "516px",
            },
          },
        }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor="right"
        onOpen={() => {
          console.log("kk")
        }}
        open={isOpen}
        onClose={() => toggleDrawer()}
      >
        <Box sx={{ padding: "20px",height:"100%" }}>
          <Stack direction="row" alignItems="center">
            <IconButton onClick={toggleDrawer} aria-label="delete">
              <ArrowBackIosNew />
            </IconButton>
          </Stack>
          <Stack
            direction={"column"}
            justifyContent="center"
            alignItems="center"
            sx={{height:"calc(100% - 40px)"}}
          >
            <Box sx={{ padding: "12px", width: "360px",marginBottom:"25%" ,textAlign:"center"}} >
              <img
                src="/assets/empty-cart.svg"
                style={{ width: "100%" }}
                alt="empty-img"
              />
              <h5
                style={{
                  marginTop: "24px",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                }}
              >
                Giỏ hàng rỗng!
              </h5>
              <Box className="caption-tx" sx={{ color: "#9a9a9a" }}>
                Thêm các mặt hàng vào giỏ hàng của bạn và đặt hàng tại đây
              </Box>
              <Button onClick={toggleDrawer}  variant="outlined">Tiếp tục xem đồ ăn</Button>
            </Box>
          </Stack>
        </Box>
      </SwipeableDrawer>
    </div>
  )
}
