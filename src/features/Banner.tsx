import { Box } from "@mui/material"

import { Autoplay} from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

import "swiper/css/autoplay"
export interface BannerProps {}

export function Banner(props: BannerProps) {
  return (
    <Box>
      <Swiper
        autoplay={true}
        speed={1000}
        modules={[Autoplay]}
        loop={true}
        style={{ width: "100vw" }}
        allowTouchMove={false}
      >
        <SwiperSlide>
          <Box
            className="w-screen"
            sx={{
              height: "52vh",
              maxHeight:"450px",
              minHeight:"350px",
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
              height: "52vh",
              maxHeight:"450px",
              minHeight:"350px",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: "url('/assets/banner-5.jpg')",
            }}
          ></Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            className="w-screen"
            sx={{
              backgroundPosition: "center",
              backgroundSize: "cover",
              height: "52vh",
              maxHeight:"450px",
              minHeight:"350px",
              backgroundImage: "url('/assets/banner-2.jpg')",
            }}
          ></Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            className="w-screen"
            sx={{
              height: "52vh",
              maxHeight:"450px",
              minHeight:"350px",
              backgroundPosition:"center",
              backgroundSize:"cover",
              backgroundImage: "url('/assets/banner-1.png')",
            }}
          ></Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  )
}
