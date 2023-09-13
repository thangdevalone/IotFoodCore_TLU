import * as React from "react"
import { CartItemData } from "@/models"
import { Box, Stack, Typography } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { handlePrice } from "@/utils"
import { useAppDispatch } from "@/app/hooks"
import { cartActions } from "../CartSlice"
import { useWindowDimensions } from "@/hooks"

export interface propsData {
  item: CartItemData
}

const CartItem = (props: propsData) => {
  const { item } = props
  const [quantity, setQuantity] = React.useState<number>(item.quantity)
  const { width } = useWindowDimensions()
  const dispatch = useAppDispatch()
  const handleAdd = () => {
    setQuantity((prev) => +prev + 1)
    dispatch(cartActions.addToCart(item))
  }

  const handleRemove = () => {
    if (quantity === 1) {
      dispatch(cartActions.removerCart(item))
    } else {
      setQuantity((prev) => +prev - 1)
      dispatch(cartActions.deleteToCart(item))
    }
  }

  const handleOnChangeInput = (value: number) => {
    setQuantity(value)
  }

  const handleSetQuantity = (value: number) => {
    if (value === 0) {
      dispatch(cartActions.removerCart(item))
    } else {
      const data = { ...item, type: true }
      data.quantity = value
      dispatch(cartActions.addToCart(data))
    }
  }

  React.useEffect(() => {
    setQuantity(item.quantity)
  }, [item])

  return (
    <Stack
      direction="row"
      spacing={2}
      className="border-b w-full py-5"
      alignItems={width > 400 ? "center" : "flex-start"}
    >
      {width > 400 ? (
        <>
          <Box className="flex items-center gap-2 flex-1">
            <Box
              onClick={() => handleRemove()}
              className="cursor-pointer rounded-full flex items-center justify-center bg-gray-200 hover:opacity-70"
            >
              <RemoveIcon fontSize="small" />
            </Box>
            <input
              type="number"
              onBlur={(e) => handleSetQuantity(+e.target.value)}
              onChange={(e) => handleOnChangeInput(+e.target.value)}
              value={quantity}
              className="w-6 text-center text-base"
            />
            <Box
              onClick={() => handleAdd()}
              className="cursor-pointer rounded-full flex items-center justify-center bg-gray-200 hover:opacity-70"
            >
              <AddIcon fontSize="small" />
            </Box>
          </Box>
          <Stack
            direction="row"
            spacing={2}
            className="flex-5"
            alignItems="center"
          >
            <Box
              className="h-14 w-14 min-w-[65px] rounded-md cursor-pointer object-cover"
              sx={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url(${item.imgFood})`,
              }}
            ></Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: "16px",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2, // Số dòng tối đa
              }}
            >
              {item.name}
            </Typography>
          </Stack>
          <Typography className="flex-2">
            {handlePrice(item.price)} VND
          </Typography>
        </>
      ) : (
        <>
          <Box
            className="h-14 w-14 min-w-[65px] rounded-md cursor-pointer object-cover "
            sx={{
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: `url(${item.imgFood})`,
            }}
          ></Box>
          <Stack direction="column">
            <Typography variant="h6" sx={{ fontSize: "16px" }}>
              {item.name}
            </Typography>

            <Typography sx={{ fontSize: "12px" }}>Topping:</Typography>
            <Typography className="flex-2" sx={{ fontSize: "14px", mt: 1 }}>
              {handlePrice(item.price)} VND
            </Typography>
            <Box className="flex items-center gap-2 flex-1 mt-2">
              <Box
                onClick={() => handleRemove()}
                className="cursor-pointer rounded-full flex items-center justify-center bg-gray-200 hover:opacity-70"
              >
                <RemoveIcon fontSize="small" />
              </Box>
              <input
                type="number"
                onBlur={(e) => handleSetQuantity(+e.target.value)}
                onChange={(e) => handleOnChangeInput(+e.target.value)}
                value={quantity}
                className="w-6 text-center text-base"
              />
              <Box
                onClick={() => handleAdd()}
                className="cursor-pointer rounded-full flex items-center justify-center bg-gray-200 hover:opacity-70"
              >
                <AddIcon fontSize="small" />
              </Box>
            </Box>
          </Stack>
        </>
      )}
    </Stack>
  )
}

export default React.memo(CartItem)
