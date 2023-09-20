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
    distance,
    imgFood,
    idStore,
  } = props

  const navigate = useNavigate()

  const handleRouter = (id: number) => {
    navigate(`/store/detail-store/${id}`)
  }
  return (
    <Box
      className="w-[100%]  cursor-pointer"
      onClick={() => handleRouter(idFood)}
    >
      <Box
        className="w-[100%] h-[23vh] rounded-md object-cover"
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
          <Box className="flex gap-2">
            <Box className="flex items-center justify-center gap-2">
              <AccessTimeRoundedIcon />
              {distance && (
                <Typography sx={{ fontSize: "14px" }}>
                  {Math.floor(Number(distance) * 12)} phút
                </Typography>
              )}
            </Box>
            •
            <Typography
              sx={{ fontSize: "14px" }}
              className="flex items-center justify-center"
            >
              {distance} km
            </Typography>
            •
            <Typography
              sx={{ fontSize: "14px" }}
              className="flex items-center justify-center"
            >
              <svg
                className=" w-4 h-4 mr-2 text-yellow-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>{" "}
              {star}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  )
}

export default ItemRecommend
