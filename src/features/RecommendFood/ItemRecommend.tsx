import { Box, IconButton, Stack, Typography, Grid } from "@mui/material"
import * as React from "react"
import { handlePrice } from "@/utils"
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom"

interface propsData {
  id:number
  nameRestaurantFood?: string
  foodName?: any | string
  price?: number
  star?: number
  time?: number
  distance?: number
  imgFood?: string
  width: number,
  storeCheck ?: boolean, // cua hang hay foods
}

// width: `${width < 601 ? '38vh' : '45vh'}`,
//                     maxHeight: `${width < 601 ? '150px' : '200px'}`,
//                     minHeight: `${width < 601 ? '150px' : '200px'}`,

const ItemRecommend = (props: propsData) => {
  const {
    id,
    nameRestaurantFood,
    foodName,
    price,
    star,
    time = 10,
    distance,
    imgFood,
    width,
    storeCheck = false
  } = props
  
  const navigate = useNavigate();

  const handleRouter = (id:number) => {
    navigate(storeCheck ?  `/store/detail-store/${id}` : `/store/detail-food/${id}`);
  }

  const handleAddToCart = (name : string) => {
    alert(`add to cart ${name}`);
  }
  
  return (
    <Box className="w-[100%] h-[100%]">
      <Box
        onClick={()=>handleRouter(id)}
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
        {price && <Box className="flex gap-5 capitalize items-center ">
          {foodName && <Typography sx={{ fontSize: !nameRestaurantFood ? '16px' : "14px" }}>{foodName}</Typography>}
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
          { !storeCheck && <Box className="cursor-pointer hover:opacity-90" onClick={()=>handleAddToCart(storeCheck ? ' asd' : foodName)}><AddCircleIcon style={{ color: "green", fontSize :"29px" }}/></Box>}
        </Box>
      </Stack>
    </Box>
  )
}

export default ItemRecommend
