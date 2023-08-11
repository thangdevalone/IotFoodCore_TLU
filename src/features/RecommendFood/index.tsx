import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Box, IconButton, Stack, Grid, Button } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import * as React from "react"
import foodsApis from "@/api/foodsApi"
import { RecommendFoodData } from "@/models/Foods"
import { useWindowDimensions } from "@/hooks"
import ItemRecommend from "./ItemRecommend"
import { CustomButton } from "@/components/Custom/CustomButon"

export interface RecommendFoodProps {}

export function RecommendFood(props: RecommendFoodProps) {
  const [data, setData] = React.useState<RecommendFoodData[]>([])
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
      const response = await foodsApis.getRecommendFood()
      if (response?.status) {
        setData(response?.data)
      }
    }
    fetchData()
  }, [])
  const { width } = useWindowDimensions()

  //

  return (
    <>
      {seeAll ? (
        <Box className="flex h-[280px]" sx={{margin:`${width<=750?"0 20px":width<=900?"0 40px":"0px"}`}}>
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
            slidesPerView={width <= 450?1.2:width <= 600 ? 1.7 : width<=750?2.2 :width<=900?2.6 :width<=1200?3:4}
            spaceBetween={25}
            allowTouchMove={true}
            ref={swiperRef}
          >
            {data?.map((item, index) => (
              <SwiperSlide key={index + item?.id}>
                <ItemRecommend
                  width={width}
                  imgFood={item.imgFood}
                  nameRestaurantFood={item.nameRestaurantFood}
                  nameFood={item.nameFood}
                  price={item.price}
                  star={item.star}
                  time={item.time}
                  distance={item.distance}
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
      ) : (
        <Stack className="mx-16 mt-8 items-center justify-center">
          <Grid
            className=""
            container
            spacing={4}
            columnSpacing={{ xs: 1, sm: 3, md: 4 }}
          >
            {data?.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <ItemRecommend
                  width={width}
                  imgFood={item.imgFood}
                  nameRestaurantFood={item.nameRestaurantFood}
                  nameFood={item.nameFood}
                  price={item.price}
                  star={item.star}
                  time={item.time}
                  distance={item.distance}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
      <Stack alignItems="center">
        <Box className="container-base base-pd" >
          <CustomButton
            fullWidth
            sx={{
              width: "100%",
              border: "1px solid var(--color-df-1)",
              color: "var(--color-df-1)",
              mt: "15px",
              mb:"20px",
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
