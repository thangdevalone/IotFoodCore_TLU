import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { cartActions } from "@/components/Common/CartDrawer/CartSlice"
import { CustomButton } from "@/components/Custom/CustomButon"
import { foodData } from "@/models"
import { formatCurrencyVND, handlePrice } from "@/utils"
import { Add, Close, Remove } from "@mui/icons-material"
import {
  Box,
  IconButton,
  SwipeableDrawer,
  Tooltip,
  Typography,
} from "@mui/material"
import { useSnackbar } from "notistack"
import { useState } from "react"
const iOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent)
const SliderItemRecommend = (props: foodData) => {
  const {
    id,
    foodName,
    price,
    nameRestaurantFood,
    imgFood,
    distance,
    quantityPurchased,
    restaurantEntityId,
  } = props
  const [quantity, setQuantity] = useState(1)
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const dataStore = useAppSelector((state) => state.cart.dataStore)
  const handleAddToCart = () => {
    const store = dataStore.find((item) => item.id === restaurantEntityId)
    const food = store?.items.find((item) => item.idFood === id)
    if (food && food?.quantity + quantity > 10) {
      enqueueSnackbar("Không thể thêm quá 10 sản phẩm", { variant: "error" })
      return
    }
    const data = {
      idFood: id,
      name: foodName,
      price,
      quantity: quantity,
      idStore: restaurantEntityId,
      nameStore: nameRestaurantFood,
      imgFood,
      distance: distance,
    }
    enqueueSnackbar("Bạn vừa thêm vào giỏ hàng", { variant: "success" })
    dispatch(cartActions.addToCart(data))
    setDetailDrawer(false)
  }
  const [detailDrawer, setDetailDrawer] = useState(false)
  const toggleDrawer = () => {
    setDetailDrawer(!detailDrawer)
  }
  const handleRemove = () => {
    if (quantity === 1) {
      setDetailDrawer(false)
    } else {
      setQuantity((prev) => +prev - 1)
    }
  }
  const handleAdd = () => {
    if (quantity >= 10) {
      enqueueSnackbar("Không thể mua quá 10 sản phẩm", { variant: "error" })
      setQuantity(10)
      return
    }
    setQuantity((prev) => +prev + 1)
  }
  const handleOnChangeInput = (value: number) => {
    if (quantity >= 10) {
      enqueueSnackbar("Không thể mua quá 10 sản phẩm", { variant: "error" })
      setQuantity(10)
    }
    setQuantity(value)
  }
  const handleSetQuantity = (value: number) => {
    if (quantity > 10) {
      enqueueSnackbar("Không thể mua quá 10 sản phẩm", { variant: "error" })
      setQuantity(10)
      return
    }
    if (value === 0) {
      setDetailDrawer(false)
    } else {
      setQuantity((prev) => +prev - 1)
    }
  }

  return (
    <>
      <SwipeableDrawer
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            "@media (min-width:600px)": {
              width: "450px",
            },
            overflow: "hidden",
          },
        }}
        anchor="right"
        open={detailDrawer}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        onOpen={() => {}}
        onClose={() => toggleDrawer()}
      >
        <div className="relative w-full h-full">
          <div className="py-3 px-5 w-full border-b-[2px]">
            <IconButton onClick={toggleDrawer}>
              <Close />
            </IconButton>
          </div>
          <div className="flex items-center flex-row py-5 px-6 gap-5">
            <Box
              sx={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                minWidth: "100px",
                minHeight: "100px",
                borderRadius: "8px",
                backgroundImage: `url(${imgFood || "/assets/no_img.jpg"})`,
              }}
            ></Box>
            <p className="text-xl font-semibold flex-1">{foodName}</p>
            <p className="font-semibold text-xl">
              {formatCurrencyVND(price.toString())}
            </p>
          </div>
          <div className="absolute  items-center py-5 px-6 flex flex-row gap-5 w-full bottom-[0px]">
            <Box className="flex items-center gap-3 flex-1">
              <Box
                onClick={() => handleRemove()}
                className="cursor-pointer rounded-full flex items-center justify-center bg-gray-200 hover:opacity-70"
              >
                <Remove />
              </Box>
              <input
                type="number"
                onBlur={(e) => handleSetQuantity(+e.target.value)}
                onChange={(e) => handleOnChangeInput(+e.target.value)}
                value={quantity}
                className="w-6 text-center text-xl"
              />
              <Box
                onClick={() => handleAdd()}
                className="cursor-pointer rounded-full flex items-center justify-center bg-gray-200 hover:opacity-70"
              >
                <Add  />
              </Box>
            </Box>
            <CustomButton
              onClick={handleAddToCart}
              fullWidth
              sx={{
                background: "var(--color-df-1)",
                color: "white",
                borderRadius: "6px",
                fontSize: "15px",
                height: "50px",
                fontWeight: "600",
                textTransform: "unset",

                "&:hover": {
                  background: "var(--color-df-1)",
                  color: "white",
                },
              }}
            >
              Thêm vào giỏ - {formatCurrencyVND(String(quantity*price))}
            </CustomButton>
          </div>
        </div>
      </SwipeableDrawer>
      <Tooltip onClick={toggleDrawer} title="Bấm để thêm vào giỏ hàng">
        <Box
          className={`w-full h-full rounded-md relative cursor-pointer`}
          sx={{
            "&:hover .img-res": {
              transform: "scale(1.05)",
            },
          }}
        >
          <Box className=" w-[100%] h-[23vh] max-h-[200px]">
            <Box className="overflow-hidden rounded-md h-[100%] w-[100%]">
              <Box
                className={`img-res`}
                sx={{
                  transition: "all 0.3s",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${imgFood || "/assets/no_img.jpg"})`,
                }}
              ></Box>
            </Box>
          </Box>
          <Box className="flex flex-col w-full overflow-hidden pd-1 mt-[8px]">
            <span className="capitalize text-lg whitespace-nowrap overflow-hidden overflow-ellipsis font-semibold">
              {foodName}
            </span>

            <Box className="flex mt-[1px] capitalize gap-5 items-center">
              <Typography
                className="whitespace-nowrap flex-1 overflow-hidden overflow-ellipsis"
                sx={{ fontSize: "14px" }}
              >
                {nameRestaurantFood}
              </Typography>
              <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                {handlePrice(price)} ₫
              </Typography>
            </Box>
            <Box
              sx={{
                "& *": {
                  fontSize: "14px",
                },
              }}
              className="flex mt-1 justify-between items-center"
            >
              <span>Đã bán: {quantityPurchased || 0}</span>
            </Box>
          </Box>
        </Box>
      </Tooltip>
    </>
  )
}

export default SliderItemRecommend
