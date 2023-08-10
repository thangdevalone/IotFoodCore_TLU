import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, IconButton, Stack, Grid } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import * as React from "react";
import foodsApis from "@/api/foodsApi";
import { RecommendFoodData } from "@/models/Foods";
import { useWindowDimensions } from "@/hooks"; 
import ItemRecommend from './ItemRecommend';

export interface RecommendFoodProps {}

export function RecommendFood(props: RecommendFoodProps) {
  const [data, setData] = React.useState<RecommendFoodData[]>([])
  const [seeAll, setSeeAll] = React.useState<boolean>(true);

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

  //

  return (
    <>
      {seeAll ? 
        <Box className="flex gap-3 mt-8">
          {width > 600 && 
            <Box
              className="flex items-center justify-center ">
                <IconButton onClick={slidePrev} className="cursor-pointer">
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
                <ItemRecommend width={width}
                 imgFood={item.imgFood}
                 nameRestaurantFood={item.nameRestaurantFood }
                 nameFood={ item.nameFood}
                 price={item.price}
                 star={item.star}
                 time={item.time}
                 distance={item.distance}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          {width > 600 && 
            <Box className="flex items-center justify-center">
              <IconButton onClick={slideNext} >
                <ChevronRight fontSize="large" className="cursor-pointer"/>
              </IconButton>
            </Box>
          }
        </Box>
        :
        <Stack className="mx-16 mt-8 items-center justify-center">
          <Grid className="" container spacing={4} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
            {data?.map(item =>
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <ItemRecommend width={width}
                  imgFood={item.imgFood}
                  nameRestaurantFood={item.nameRestaurantFood}
                  nameFood={item.nameFood}
                  price={item.price}
                  star={item.star}
                  time={item.time}
                  distance={item.distance} />
              </Grid>
            )}
          </Grid>
        </Stack>}
      <Stack onClick={()=> setSeeAll(!seeAll)} className="my-5 items-center justify-center text-2xl font-medium cursor-pointer py-2 border-[2px] mx-16 rounded-lg hover:bg-gray-100">
        See all promotions
      </Stack>
    </>
  )
}
