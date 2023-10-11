import { Box } from "@mui/material"

import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
export interface BannerProps {}

export function Banner(props: BannerProps) {
  return (
    <Box>
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={2000}
        modules={[Autoplay]}
        loop={true}
        style={{ width: "100vw" }}
      >
        <SwiperSlide>
          <Box
            className="w-screen"
            sx={{
              height: "60vh",
              maxHeight: "550px",
              minHeight: "350px",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: "url('/assets/banner-1.png')",
            }}
          ></Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            className="w-screen"
            sx={{
              height: "60vh",
              maxHeight: "550px",
              minHeight: "350px",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: "url('/assets/banner-3.png')",
            }}
          ></Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            className="w-screen"
            sx={{
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "60vh",
              maxHeight: "550px",
              minHeight: "350px",
              backgroundImage: "url('/assets/banner-2.png')",
            }}
          ></Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            className="w-screen"
            sx={{
              height: "60vh",
              maxHeight: "550px",
              minHeight: "350px",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: "url('/assets/banner-4.jpg')",
            }}
          ></Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  )
}
