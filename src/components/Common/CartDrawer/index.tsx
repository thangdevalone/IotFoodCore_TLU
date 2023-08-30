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
import { Orders } from "../Orders"
export interface CardDrawerProps { }

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
        <Orders />
      </SwipeableDrawer>
    </div>
  )
}
