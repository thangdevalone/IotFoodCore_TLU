import { Header } from "@/components/Common"
import { Box } from "@mui/material"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Menu } from "./Menu"
import { useAppSelector } from "@/app/hooks"
import { MenuXS } from "./MenuXS"
export interface UserProps {}

export default function User(props: UserProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden auto"
    return () => {
      document.body.style.overflowY = "scroll"
    }
  }, [])
  const { width } = useAppSelector((state) => state.app)
  return (
    <>
      <Header
        sx={{ backgroundColor: "var(--color-layer-2)" }}
        theme="red"
        noItem={true}
      />
      <div
        style={{
          backgroundColor: "rgb(240, 242, 245)",
          height: width > 500 ? "auto" : "calc(100vh - 60px)",
        }}
        className="w-screen h-full"
      >
        <div
          className={`flex container-base h-full ${
            width > 500 ? "base-pd !mt-20  pb-12  pt-10" : "!mt-[60px]"
          }`}
        >
          {width > 800 ? (
            <>
              <Menu />
              <Box
                sx={{
                  width: 220,
                  background: "transparent",
                  mr: "100px",
                  py: 2,
                }}
              ></Box>
            </>
          ) : (
            <MenuXS />
          )}

          <div
            style={{
              height: width > 500 ? "100%" : "calc(100% - 56px)",
            }}
            className={`${width>500?"px-7 mb-5 py-7":"px-7 pt-5 pb-3"} mx-auto  bg-[#fff] max-w-[980px] overflow-x-hidden overflow-y-auto w-[100%]`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
