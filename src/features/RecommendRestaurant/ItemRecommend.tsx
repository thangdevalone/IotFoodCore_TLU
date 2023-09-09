import { useAppDispatch } from "@/app/hooks"
import { cartActions } from "@/components/Common/CartDrawer/CartSlice"
import { handlePrice } from "@/utils"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded"
import { Box, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

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
  } = props

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleRouter = (id: number) => {
    navigate(`/store/detail-store/${id}`)
  }

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
    <Box className="w-[100%] ">
      <Box
        onClick={() => handleRouter(idFood)}
        className="w-[100%] h-[20vh] rounded-md cursor-pointer object-cover"
        sx={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${imgFood})`,
        }}
      ></Box>
      <Stack className="mt-[8px]">
        <span className="text-lg font-semibold capitalize whitespace-nowrap overflow-hidden overflow-ellipsis">
          {nameStore}
        </span>
        {price && (
          <Box className="flex gap-5 capitalize items-center ">
            {foodName && (
              <Typography sx={{ fontSize: !nameStore ? "16px" : "14px" }}>
                {foodName}
              </Typography>
            )}
            <Typography className="text-gray-400 " sx={{ fontSize: "14px" }}>
              {handlePrice(price)} VND
            </Typography>
          </Box>
        )}
        <Box className="flex gap-10 items-center mt-1 ">
          {star && (
            <Box className=" flex  justify-center items-center ">
              <StarRateRoundedIcon style={{ color: "orange" }} />
              <Typography sx={{ fontSize: "14px" }}>{star}</Typography>
            </Box>
          )}
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
              {distance} km
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default ItemRecommend
