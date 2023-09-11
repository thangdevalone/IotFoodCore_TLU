import foodsApis from "@/api/foodsApi"
import { useWindowDimensions } from "@/hooks"
import { foodData } from "@/models"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { Box, IconButton } from "@mui/material"
import * as React from "react"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import SliderItemRecommend from "./SliderItemRecommend"

export interface RecommendFoodProps {}

export function RecommendFood(props: RecommendFoodProps) {
  const [data, setData] = React.useState<foodData[]>([])
  const [seeAll, setSeeAll] = React.useState<boolean>(true)

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
      const response = await foodsApis.getRecommendFoods()
      if (response?.status) {
        setData(response?.data)
      }
    }
    fetchData()
  }, [])
  const { width } = useWindowDimensions()

  //

  return (
    <Box
      className="flex "
      sx={{
        margin: `${
          width <= 750
            ? "0 20px 24px 20px"
            : width <= 900
            ? "0 40px 24px 40px"
            : "0px 0px 24px 0px"
        }`,
      }}
    >
      {width > 900 && (
        <Box className="flex items-center justify-center mr-[5px]">
          <IconButton onClick={slidePrev}>
            <ChevronLeft sx={{ width: "40px", height: "40px" }} />
          </IconButton>
        </Box>
      )}
      <Swiper
        modules={[]}
        className="slide-base "
        style={{ width: "100%", height: "100%" }}
        slidesPerView={
          width <= 450
            ? 1.2
            : width <= 600
            ? 1.7
            : width <= 750
            ? 2.2
            : width <= 900
            ? 2.6
            : width <= 1200
            ? 3
            : 4
        }
        spaceBetween={25}
        allowTouchMove={true}
        ref={swiperRef}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index + item?.id}>
            <SliderItemRecommend
              idFood={item.id}
              detail={item.detail}
              width={width}
              imgFood={item.imgFood}
              foodName={item.foodName}
              price={item.price}
              qSold={item.quantityPurchased || 0}
              idStore={item.restaurantEntityId}
              nameStore={item.nameRestaurantFood}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {width > 900 && (
        <Box className="flex items-center justify-center ml-[5px]">
          <IconButton onClick={slideNext}>
            <ChevronRight sx={{ width: "40px", height: "40px" }} />
          </IconButton>
        </Box>
      )}
    </Box>
  )
}
