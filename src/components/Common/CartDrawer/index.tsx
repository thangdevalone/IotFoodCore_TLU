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
import CartList from "./Components/CartList"
import { handlePrice } from "@/utils";
import * as React from 'react';
import { useInforUser } from "@/hooks";
import { CustomButton } from "@/components/Custom/CustomButon"

export interface CardDrawerProps {}

export function CartDrawer(props: CardDrawerProps) {
  const { open, items } = useAppSelector((state) => state.cart);
  const user = useInforUser();
  const [price, setPrice] = React.useState<number>(0);
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  const dispatch = useAppDispatch()
  const toggleDrawer = () => {
    dispatch(cartActions.toggleCart())
  }

  React.useEffect(() => {
    setPrice(items.reduce((sum, item) => sum += item.price * item.quantity, 0))
  }, [items]);

  // console.log(items);

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
        open={open}
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
            justifyContent={`${!items.length && "center"}`}
            alignItems="center"
            sx={{height:"calc(100% - 40px)", width : 'full'}}
          >
            {items.length ?
              <>
                <CartList items={items} />
                <Box className="absolute bottom-3 border-t pt-3 w-[96%]">
                  <Box className='flex justify-between items-center text-xl'>
                    <span className="font-semibold">Tổng tiền :</span>
                    <span>{handlePrice(price)} VND</span>
                  </Box>
                  <Box className="w-full">
                      <CustomButton sx={{ padding: "10px 12px", mr: 1, minWidth: "unset", width: '100%', bgcolor:'#00b14f' }}>
                        {user ? 'Đặt hàng' : 'Đăng nhập để đặt hàng'}
                      </CustomButton>
                  </Box>
                </Box>
              </> :
              <Box sx={{ padding: "12px", width: "360px", marginBottom: "25%", textAlign: "center" }} >
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
            </Box>}
          </Stack>
        </Box>
      </SwipeableDrawer>
    </div>
  )
}
