import { Box, IconButton, Stack, Typography, Grid } from "@mui/material"
import * as React from "react"
import { handlePrice } from "@/utils"
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"

interface propsData {
  nameRestaurantFood?: string
  nameFood?: string
  price?: number
  star?: number
  time?: number
  distance: number
  imgFood: string
  width: number
}

// width: `${width < 601 ? '38vh' : '45vh'}`,
//                     maxHeight: `${width < 601 ? '150px' : '200px'}`,
//                     minHeight: `${width < 601 ? '150px' : '200px'}`,

const ItemRecommend = (props: propsData) => {
  const {
    nameRestaurantFood,
    nameFood,
    price,
    star,
    time = 10,
    distance,
    imgFood,
    width,
  } = props

  return (
    <Box className="w-[100%] h-[100%]">
      <Box
        className="w-[100%] h-[60%] rounded-md cursor-pointer object-cover"
        sx={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${imgFood})`,
        }}
      ></Box>
      <Stack className="mt-[8px]">
        <span className="text-lg font-semibold capitalize">
          {nameRestaurantFood}
        </span>
        {price && <Box className="flex  gap-5 capitalize">
          <Typography sx={{ fontSize: !nameRestaurantFood ? '16px' : "14px" }}>{nameFood}</Typography>
          <Typography className="text-gray-400 " sx={{ fontSize: "14px" }}>
            {handlePrice(price)} VND
          </Typography>
        </Box>}
        <Box className="flex gap-10 items-center mt-2">
          {star && <Box className=" flex  justify-center items-center ">
            <StarRateRoundedIcon style={{ color: "orange" }} />
            <Typography sx={{ fontSize: "14px" }}>{star}</Typography>
          </Box>}
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
