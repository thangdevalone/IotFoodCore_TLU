import { Question, WhyChoose } from "@/features/About"
import { Banner } from "@/features/Banner"
import { PagingFood } from "@/features/PagingFood"
import { RecommendFood } from "@/features/RecommendFood"
import { RecommendRestaurant } from "@/features/RecommendRestaurant"
import { SearchFood } from "@/features/SearchFood"
import TypeFood from "@/features/TypeFood"
import { Backdrop, Box, IconButton } from "@mui/material"
import { Footer, Header } from "../Common"
import "./styles_home.css"
import { useAppSelector } from "@/app/hooks"
import { useInforUser } from "@/hooks"
import { CustomButton } from "../Custom/CustomButon"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Close } from "@mui/icons-material"
export interface HomeProps {}

export function Home(props: HomeProps) {
  const { width } = useAppSelector((state) => state.app)
  const user = useInforUser()
  const navigate = useNavigate()
  const [alertBackDrop, setAlertBackDrop] = useState(true)

  const [gmailBackDrop, setGmailBackDrop] = useState(!user?.email)
  return (
    <>
      {user && !user?.email && (
        <Backdrop
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            zIndex: 1000,
            height: "100vh",
          }}
          open={gmailBackDrop}
          onClick={() => setGmailBackDrop(false)}
        >
          <div style={{ maxWidth: "450px", width: "80%" }} className="relative">
            <IconButton
              onClick={() => setGmailBackDrop(false)}
              sx={{ top: "5px", right: "5px", position: "absolute" }}
            >
              <Close />
            </IconButton>
            <img style={{ width: "100%" }} src="/imp/gmail.svg" />
            <CustomButton
              onClick={(e) => {
                e.stopPropagation()
                setGmailBackDrop(false)
                navigate(width > 800 ? "/user/profile" : "/user/account")
              }}
              sx={{
                background: "#51C9C2",
                color: "white",
                minWidth: "200px",
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                borderRadius: "8px",
                border: "none",
                fontSize: "14px",
                height: "40px",
                fontWeight: "600",
                textTransform: "unset",
                "&:hover": {
                  background: "#51C9C2",
                  color: "white",
                },
              }}
            >
              Thêm gmail ngay!
            </CustomButton>
          </div>
        </Backdrop>
      )}
      {/* <Backdrop
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: 1000,
          height: "100vh",
          overflow:'hidden auto'
        }}
        open={alertBackDrop}
        onClick={() => setAlertBackDrop(false)}
      >
        <div  style={{ maxWidth: "600px", width: "80%" }}  className="relative">
            <IconButton
              onClick={() => setAlertBackDrop(false)}
              sx={{ top: "5px", right: "5px", position: "absolute" }}
            >
              <Close />
            </IconButton>
            <img style={{ width: "100%" }}  src="/imp/tb.svg" />
          </div>
      </Backdrop> */}
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
        {width >= 500 && (
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
    </>
  )
}
