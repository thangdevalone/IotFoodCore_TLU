import { Box, IconButton, Stack, Typography, Grid } from "@mui/material";
import * as React from "react";
import { handlePrice } from "@/utils";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface propsData {
    nameRestaurantFood: string,
    nameFood : string,
    price : number,
    star: number,
    time: number,
    distance: number,
    imgFood: string,
    width: number,
}


const ItemRecommend = ( props : propsData) => {

    const {nameRestaurantFood,nameFood,price,star,time,distance, imgFood, width } = props;

    return (
        <>
            <Box
                  className="w-screen rounded-md cursor-pointer object-cover"
                  sx={{
                    width: `${width < 601 ? '38vh' : '45vh'}`,
                    maxHeight: `${width < 601 ? '150px' : '200px'}`,
                    minHeight: `${width < 601 ? '150px' : '200px'}`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundImage: `url(${imgFood})`,
                  }}
            ></Box>
            <Stack className="">
                <span className="text-lg font-semibold capitalize">
                    {nameRestaurantFood}
                </span>
                <Box className="flex gap-5 capitalize">
                    <Typography>{nameFood}</Typography>
                    <Typography className="text-gray-400">
                        {handlePrice(price)} VND
                    </Typography>
                </Box>
                <Box className="flex gap-10 items-center mt-2">
                    <Typography className="text-[20px] flex  justify-center items-center">
                        <StarRateRoundedIcon
                            style={{ color: "orange", width: "30px", height: "30px" }}
                        />
                        <Typography>{star}</Typography>
                    </Typography>
                    <Box className="flex gap-2">
                        <Typography className="flex items-center justify-center gap-2">
                            <AccessTimeRoundedIcon
                                style={{ width: "30px", height: "30px" }}
                            />
                            {time} phút
                        </Typography>
                            <FiberManualRecordIcon
                                style={{ width: "9px", height: "9px", marginTop: "10px" }}
                            />
                            <Typography className="flex items-center justify-center">
                            {distance} km
                        </Typography>
                    </Box>
                </Box>
            </Stack>
        </>
    )
}

export default ItemRecommend;