import { Box, IconButton, Stack, Typography, Grid } from "@mui/material"
import * as React from "react"
import { handlePrice } from "@/utils"
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { cartActions } from "@/components/Common/CartDrawer/CartSlice"
import { foodData } from '@/models/Foods';

interface propsData {
  idFood:number
  nameStore: string
  foodName?: any | string
  price: number
  star?: number
  time?: number
  distance?: number
  imgFood: string
  width: number,
  idStore : number
  storeCheck ?: boolean, // cua hang hay foods
}

// width: `${width < 601 ? '38vh' : '45vh'}`,
//                     maxHeight: `${width < 601 ? '150px' : '200px'}`,
//                     minHeight: `${width < 601 ? '150px' : '200px'}`,

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
    width,
    storeCheck = false,
    idStore
  } = props
  
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRouter = (id:number) => {
    navigate(storeCheck ?  `/store/detail-store/${id}` : `/store/detail-food/${id}`);
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
    dispatch(cartActions.addToCart(data));
  }
  
  
  return (
    <Box className="w-[100%] h-[100%]">
      <Box
        onClick={()=>handleRouter(idFood)}
        className="w-[100%] h-[60%] rounded-md cursor-pointer object-cover"
        sx={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${imgFood})`,
        }}
      ></Box>
      <Stack className="mt-[8px]">
        <span className="text-lg font-semibold capitalize">
          {nameStore}
        </span>
        {price && <Box className="flex gap-5 capitalize items-center ">
          {foodName && <Typography sx={{ fontSize: !nameStore ? '16px' : "14px" }}>{foodName}</Typography>}
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
          { !storeCheck && <Box className="cursor-pointer hover:opacity-90" onClick={()=>handleAddToCart()}><AddCircleIcon style={{ color: "green", fontSize :"29px" }}/></Box>}
        </Box>
      </Stack>
    </Box>
  )
}

export default ItemRecommend
