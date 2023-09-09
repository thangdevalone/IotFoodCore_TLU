import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Box, IconButton, Stack, Grid, Button } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import * as React from "react"
import foodsApis from "@/api/foodsApi"
import { useWindowDimensions } from "@/hooks"
import ItemRecommend from "./ItemRecommend"
import { CustomButton } from "@/components/Custom/CustomButon"
import { foodData } from "@/models"

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
    <>
      {width > 900 ? (
        <Box
          className="flex "
          sx={{
            margin: `${
              width <= 750 ? "0 20px 24px 20px" : width <= 900 ? "0 40px 24px 40px" : "0px 0px 24px 0px"
            }`,
          }}
        >
          <Box className="flex items-center justify-center mr-[5px]">
            <IconButton onClick={slidePrev}>
              <ChevronLeft sx={{ width: "40px", height: "40px" }} />
            </IconButton>
          </Box>
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
                <ItemRecommend
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
          <Box className="flex items-center justify-center ml-[5px]">
            <IconButton onClick={slideNext}>
              <ChevronRight sx={{ width: "40px", height: "40px" }} />
            </IconButton>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            className={`flex items-center justify-center ${width < 601 && ""}`}
          >
            <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
              {data?.map((item) => (
                <Grid item xs={12} sm={6} md={3} key={item.id}>
                  <ItemRecommend
                    idFood={item.id}
                    detail={item.detail}
                    width={width}
                    imgFood={item.imgFood}
                    foodName={item.foodName}
                    price={item.price}
                    qSold={item.quantityPurchased || 0}
                    nameStore={item.nameRestaurantFood}
                    idStore={item.restaurantEntityId}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Stack alignItems="center">
            <Box className="container-base">
              <CustomButton
                onClick={() => setSeeAll(!seeAll)}
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
                Xem thêm món ăn
              </CustomButton>
            </Box>
          </Stack>
        </>
      )}
    </>
  )
}
