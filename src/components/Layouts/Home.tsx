import { Question, WhyChoose } from "@/features/About"
import { Banner } from "@/features/Banner"
import { RecommendFood } from "@/features/RecommendFood"
import { SearchFood } from "@/features/SearchFood"
import TypeFood from "@/features/TypeFood"
import { useWindowDimensions } from "@/hooks"
import { Box } from "@mui/material"
import { Header } from "../Common"
import { Footer } from "../Common/Footer"
import "./styles_home.css"

export interface HomeProps {}

export function Home(props: HomeProps) {
  const { width } = useWindowDimensions()
  return (
    <Box className="relative tx-df-sz">
      <Header />
      {width > 750 && <Banner />}
      <section className="container-base search-food">
        <SearchFood />
      </section>
      <div className="line-1"></div>
      <p className="base-tx base-pd mb-[32px]">
        Cửa hàng bán chạy nhất tại{" "}
        <span style={{ color: "var(--color-df-2)" }}>Đại học Thăng Long</span>
      </p>
      <section className=" recommend-store">
        <RecommendFood />
      </section>
      <p className="base-tx  base-pd  mb-[32px]">
        Các loại đồ ăn có sẵn để lựa chọn
      </p>
      <section className="container-base base-pd type-food">
        <TypeFood />
      </section>
      <p className="base-tx  base-pd  mb-[32px]">
        Vì sao bạn nên đặt đồ ăn tại IotFood?
      </p>
      <section  className="container-base base-pd why-choose">
        <WhyChoose/>
      </section>
      <p className="base-tx base-pd mb-[32px]">
        Các câu hỏi thường gặp?
      </p>
      <section  className="container-base base-pd why-choose">
        <Question/>
      </section>
      <Footer/>
    </Box>
  )
}
