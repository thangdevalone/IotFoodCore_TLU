import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Box, IconButton, Stack } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import * as React from "react"
import foodsApis from "@/api/foodsApi"
import { useWindowDimensions } from "@/hooks"
import ItemRecommend from "../RecommendFood/ItemRecommend"
import { CustomButton } from "@/components/Custom/CustomButon"
import { RestaurantData } from "@/models/Foods"
import { useNavigate } from "react-router-dom"

export interface RecommendRestaurantProps {}

export function RecommendRestaurant(props: RecommendRestaurantProps) {
  const [data, setData] = React.useState<RestaurantData[]>([])
  const swiperRef = React.useRef<any>(null)
  const navigate = useNavigate();
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
      const response = await foodsApis.getRecommendRestaurants()
      if (response?.status) {
        setData(response?.data)
      }
    }
    fetchData()
  }, [])
  const { width } = useWindowDimensions()

  const handleStore = () => {
    navigate('/store/get-all-store');
  };

  //
  // console.log(data);

  return (
    <>
      <Box
        className="flex h-[280px]"
        sx={{
          margin: `${
            width <= 750 ? "0 20px" : width <= 900 ? "0 40px" : "0px"
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
          className="slide-base"
          style={{ width: "100%" }}
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
              <ItemRecommend
                  idFood={item.id}
                  width={width}
                  imgFood={item.imgRes}
                  nameStore={item.restaurantName}
                  distance={item.distance}
                  storeCheck={true}
                  price={item.price}
                  idStore = {item.id}
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
      <Stack alignItems="center" onClick={()=> handleStore()}>
        <Box  className="container-base base-pd">
          <CustomButton
            fullWidth
            sx={{
              width: "100%",
              border: "1px solid var(--color-df-1)",
              color: "var(--color-df-1)",
              mt: "15px",
              mb: "20px",
              borderRadius: "6px",
              fontSize: "17px",
              height: "50px",
              fontWeight: "600",
              textTransform: "unset",
              transition: "all 0.2s",
              "&:hover": {
                border: "1px solid var(--color-df-1)",
                background: "rgb(241, 245, 249)",
                color: "var(--color-df-1)",
              },
            }}
          >
            Xem thêm cửa hàng
          </CustomButton>
        </Box>
      </Stack>
    </>
  )
}
