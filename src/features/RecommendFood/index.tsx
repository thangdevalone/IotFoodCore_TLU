import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import * as React from "react";
import foodsApis from "@/api/foodsApi";
import { RecommendFoodData } from "@/models/Foods";
import { handlePrice } from "@/utils";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useWindowDimensions } from "@/hooks"; 

export interface RecommendFoodProps {}

export function RecommendFood(props: RecommendFoodProps) {
  const [data, setData] = React.useState<RecommendFoodData[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await foodsApis.getRecommendFood()
      if (response?.status) {
        setData(response?.data)
      }
    }
    fetchData()
  }, [])

  const swiperRef = React.useRef<any>(null)

  const slidePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev()
    }
  }

  const slideNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext()
    }
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await foodsApis.getRecommendFood();
      if (response?.status) {
        setData(response?.data);
      }
    };
    fetchData();
  }, []);
  const { width } = useWindowDimensions();
  // console.log(width);

  //

  return (
    <div className="flex gap-3 mt-8">
      {width > 600 && 
        <Box
        className="flex items-center justify-center cursor-pointer">
          <IconButton onClick={slidePrev}>
          <ChevronLeft fontSize="large" />
        </IconButton>
      </Box>
      }
      <Swiper
        modules={[]}
        loop={true}
        style={{ width: "100%" }}
        slidesPerView={width <= 600 ? 1.2 : 4}
        spaceBetween={25}
        allowTouchMove={true}
        ref={swiperRef}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index + item?.id}>
            <Box
              className="w-screen rounded-md cursor-pointer object-cover"
              sx={{
                width: `${width < 601 ? '38vh' : '45vh'}`,
                maxHeight: `${width < 601 ? '150px' : '200px'}`,
                minHeight: `${width < 601 ? '150px' : '200px'}`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url(${item.imgFood})`,
              }}
            ></Box>
            <Stack className="">
              <span className="text-lg font-semibold capitalize">
                {item.nameRestaurantFood}
              </span>
              <Box className="flex gap-5 capitalize">
                <Typography>{item.nameFood}</Typography>
                <Typography className="text-gray-400">
                  {handlePrice(item.price)} VND
                </Typography>
              </Box>
              <Box className="flex gap-10 items-center mt-2">
                <Typography className="text-[20px] flex  justify-center items-center">
                  <StarRateRoundedIcon
                    style={{ color: "orange", width: "30px", height: "30px" }}
                  />
                  <Typography> {item.star} </Typography>
                </Typography>
                <Box className="flex gap-2">
                  <Typography className="flex items-center justify-center gap-2">
                    <AccessTimeRoundedIcon
                      style={{ width: "30px", height: "30px" }}
                    />
                    {item.time} phút
                  </Typography>
                  <FiberManualRecordIcon
                    style={{ width: "9px", height: "9px", marginTop: "10px" }}
                  />
                  <Typography className="flex items-center justify-center">
                    {item.distance} km
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
      {width > 600 && 
        <Box className="flex items-center justify-center">
          <IconButton onClick={slideNext} >
            <ChevronRight fontSize="large" />
          </IconButton>
      </Box>
      }
    </div>
  )
}
