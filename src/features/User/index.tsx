import { Header } from "@/components/Common"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { Menu } from "./Menu"
export interface UserProps {}

export default function User(props: UserProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return ()=>{
        document.body.style.overflowY = "scroll"
    }
  }, [])
  return (
    <>
      <Header sx={{ backgroundColor: "var(--color-layer-2)" }} />
      <div
        style={{ backgroundColor: "rgb(240, 242, 245)" }}
        className="w-screen h-screen"
      >
        <div className="flex pt-10 pb-12 container-base relative top-[80px] base-pd">
          <Menu />
          <div className="mx-auto px-7 py-7 bg-[#fff] max-w-[980px] overflow-x-hidden overflow-y-auto w-[100%]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
