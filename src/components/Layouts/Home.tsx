import { Question, WhyChoose } from "@/features/About"
import { Banner } from "@/features/Banner"
import { RecommendFood } from "@/features/RecommendFood"
import { RecommendRestaurant } from "@/features/RecommendRestaurant"
import { SearchFood } from "@/features/SearchFood"
import TypeFood from "@/features/TypeFood"
import { useWindowDimensions } from "@/hooks"
import { Box } from "@mui/material"
import React from "react"
import { Footer, Header } from "../Common"
import "./styles_home.css"
import { PagingFood } from "@/features/PagingFood"
export interface HomeProps {}

export function Home(props: HomeProps) {
  const { width } = useWindowDimensions()
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Box className="relative">
      <Header />
      {width > 750 && <Banner />}
      <section className="container-base search-food">
        <SearchFood />
      </section>
      <div className="line-1"></div>
      <p className="base-tx base-pd mb-[24px]">
        Cửa hàng bán chạy nhất tại{" "}
        <span style={{ color: "var(--color-df-2)" }}>Đại học Thăng Long</span>
      </p>
      <section className="recommend-store">
        <RecommendRestaurant />
      </section>
      {width < 501 && <div className="line-1"></div>}
      <p className="base-tx base-pd mb-[24px]">
        Các món bán chạy nhất tại{" "}
        <span style={{ color: "var(--color-df-2)" }}>Đại học Thăng Long</span>
      </p>
      <section className="recommend-store">
        <RecommendFood />
      </section>
      {width < 501 && <div className="line-1"></div>}
      {width < 501 && (
        <>
          <p className="base-tx base-pd mb-[24px]">Các món bán hiện tại</p>
          <Box
            className="h-[auto] py-5"
            sx={{ backgroundColor: " rgb(240, 242, 245)" }}
          >
            <section className={"container-base base-pd type-food"}>
              <PagingFood />
            </section>
          </Box>
        </>
      )}
      {width >= 600 && (
        <>
          <p className="base-tx  base-pd  mb-[24px]">
            Các loại đồ ăn có sẵn để lựa chọn
          </p>
          <section className="container-base base-pd type-food">
            <TypeFood />
          </section>
          <p className="base-tx base-pd mb-[16px]">IotFood có gì nổi bật?</p>
          <section className="container-base base-pd why-choose">
            <WhyChoose />
          </section>
          <p className="base-tx base-pd mb-[16px]">Câu hỏi về chúng tôi</p>
          <section className="container-base base-pd why-choose">
            <Question />
          </section>
          <Footer />
        </>
      )}
    </Box>
  )
}
