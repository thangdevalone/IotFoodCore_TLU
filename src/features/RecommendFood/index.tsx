import foodsApis from "@/api/foodsApi"
import { useWindowDimensions } from "@/hooks"
import { foodData } from "@/models"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { Box, IconButton, Stack } from "@mui/material"
import * as React from "react"
import "swiper/css"
import { Swiper, SwiperSlide } from "swiper/react"
import SliderItemRecommend from "./SliderItemRecommend"
import { CustomButton } from "@/components/Custom/CustomButon"
import { useNavigate } from "react-router-dom"
import { SkeletonCustom } from "../../components/Common/Skeleton"

export interface RecommendFoodProps {}

export function RecommendFood(props: RecommendFoodProps) {
  const [data, setData] = React.useState<foodData[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const swiperRef = React.useRef<any>(null)
  const navigate = useNavigate()

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
        setIsLoading(true)
      }
    }
    fetchData()
  }, [])
  const { width } = useWindowDimensions()

  //

  return (
    <>
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
          spaceBetween={20}
          allowTouchMove={true}
          ref={swiperRef}
        >
          {!isLoading ? (
            <>
              {[1, 2, 3, 4].map((item, index) => (
                <SwiperSlide key={index + item}>
                  <SkeletonCustom />
                </SwiperSlide>
              ))}
            </>
          ) : (
            <>
              {data?.map((item, index) => (
                <SwiperSlide key={index + item?.id}>
                  <SliderItemRecommend {...item} />
                </SwiperSlide>
              ))}
            </>
          )}
        </Swiper>
        {width > 900 && (
          <Box className="flex items-center justify-center ml-[5px]">
            <IconButton onClick={slideNext}>
              <ChevronRight sx={{ width: "40px", height: "40px" }} />
            </IconButton>
          </Box>
        )}
      </Box>
      <Stack alignItems="center">
        <Box className="container-base base-pd">
          <CustomButton
            fullWidth
            onClick={() => navigate("/store/get-all-food")}
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
                background: "white",
                color: "var(--color-df-1)",
              },
            }}
          >
            Xem thêm món ăn
          </CustomButton>
        </Box>
      </Stack>
    </>
  )
}
