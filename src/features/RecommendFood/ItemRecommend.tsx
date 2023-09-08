import { useAppDispatch } from "@/app/hooks"
import { cartActions } from "@/components/Common/CartDrawer/CartSlice"
import { useWindowDimensions } from "@/hooks"
import { handlePrice } from "@/utils"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded"
import { Box, Stack, Typography } from "@mui/material"

interface propsData {
  idFood: number
  nameStore: string
  foodName?: any | string
  price: number
  star?: number
  time?: number
  distance?: string
  imgFood: string
  width: number
  idStore: number
  detail: string
}

const ItemRecommend = (props: propsData) => {
  const {
    idFood,
    nameStore,
    foodName,
    price,
    star,
    time = 10,
    distance,
    imgFood,
    idStore,
    detail,
  } = props

  const { width } = useWindowDimensions()
  const dispatch = useAppDispatch()

  const handleAddToCart = () => {
    const data = {
      idFood,
      name: foodName,
      price,
      quantity: 1,
      idStore,
      nameStore,
      imgFood,
    }
    dispatch(cartActions.addToCart(data))
  }

  return (
    <Box className={`w-full h-full  ${width < 600 && "flex gap-2"}`}>
      <Box className="w-full">
        <Box
          className={`${
            width < 600
              ? "h-[12vh] w-[26vw] object-contain border"
              : "h-[18vh] w-[100%] object-cover"
          } rounded-md  `}
          sx={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `url(${imgFood})`,
          }}
        ></Box>
      </Box>
      <Box
        className={`flex flex-col w-full ${
          width < 600 && "relative justify-between"
        }`}
      >
        <span className="text-lg font-semibold capitalize whitespace-nowrap overflow-hidden overflow-ellipsis">
          {foodName.length > 20 && width < 600
            ? `${foodName.slice(0, 23)} ...`
            : foodName}
        </span>
        {width < 600 ? (
          <>
            <Typography className="whitespace-nowrap overflow-hidden overflow-ellipsis">
              {detail.length > 20 && detail
                ? `${detail.slice(0, 25)} ...`
                : "detail"}
            </Typography>
            <Typography
              className="whitespace-nowrap overflow-hidden overflow-ellipsis"
              sx={{ fontSize: "12px" }}
            >
              {nameStore}
            </Typography>
            <Typography className="text-gray-400 " sx={{ fontSize: "14px" }}>
              {handlePrice(price)} VND
            </Typography>
            <Box
              className="cursor-pointer hover:opacity-90 absolute bottom-[-5px] right-2"
              onClick={() => handleAddToCart()}
            >
              <AddCircleIcon style={{ color: "green", fontSize: "28px" }} />
            </Box>
          </>
        ) : (
          <>
            <Box className="flex capitalize gap-5 items-center">
              <Typography
                className="whitespace-nowrap flex-1 overflow-hidden overflow-ellipsis"
                sx={{ fontSize: "12px" }}
              >
                {nameStore}
              </Typography>
              <Typography className="text-gray-400 " sx={{ fontSize: "14px" }}>
                {handlePrice(price)} VND
              </Typography>
              {width < 600 && (
                <Box
                  className="cursor-pointer hover:opacity-90 absolute bottom-[-5px] right-2"
                  onClick={() => handleAddToCart()}
                >
                  <AddCircleIcon style={{ color: "green", fontSize: "28px" }} />
                </Box>
              )}
            </Box>
            <Box className="flex gap-5 items-center mt-2 ">
              <Box className=" flex justify-center items-center ">
                <StarRateRoundedIcon style={{ color: "orange" }} />
                <Typography sx={{ fontSize: "14px" }} className="">
                  {star || 5}
                </Typography>
              </Box>
              <Box className="flex gap-2">
                <Box className="flex items-center justify-center gap-2">
                  <AccessTimeRoundedIcon />
                  <Typography sx={{ fontSize: "14px" }}>{time} phút</Typography>
                </Box>
                •
                <Typography
                  sx={{ fontSize: "14px" }}
                  className="flex items-center justify-center"
                >
                  {distance || 1} km
                </Typography>
              </Box>
              <Box
                className="cursor-pointer absolute right-5 hover:opacity-90"
                onClick={() => handleAddToCart()}
              >
                <AddCircleIcon style={{ color: "green", fontSize: "29px" }} />
              </Box>
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}

export default ItemRecommend
