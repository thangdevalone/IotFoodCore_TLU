import { Header } from "@/components/Common"
import { Box } from "@mui/material"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Menu } from "./Menu"
export interface UserProps {}

export default function User(props: UserProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden auto"
    return () => {
      document.body.style.overflowY = "scroll"
    }
  }, [])
  return (
    <>
      <Header sx={{ backgroundColor: "var(--color-layer-2)" }} theme="red" />
      <div
        style={{
          backgroundColor: "rgb(240, 242, 245)",
          minHeight: "calc(100vh - 80px)",
        }}
        className="w-screen h-full"
      >
        <div className="flex pt-10 pb-12 container-base !mt-20 base-pd">
  <Menu />
          <Box
            sx={{ width: 220, background: "transparent", mr: "100px", py: 2 }}
          ></Box>
          <div className="mx-auto px-7 py-7 bg-[#fff] max-w-[980px] overflow-x-hidden overflow-y-auto w-[100%]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
