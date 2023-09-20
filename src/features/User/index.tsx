import { BrowserRouter as Router, Route } from "react-router-dom"
import { Outlet, Link } from "react-router-dom"
import { useInforUser, useScroll, useWindowDimensions } from "@/hooks"
import { Menu } from "./Menu"
import { Profile } from "./Profile"
import { Header } from "@/components/Common"
import { Address } from "./Address"
import { useEffect } from "react"
export interface UserProps {}

export function User(props: UserProps) {
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
        <div className="flex pt-7 pb-12 container-base relative top-[80px] base-pd">
          <Menu />
          <div className="mx-auto px-7 py-[38px] bg-[#fff] max-w-[980px] overflow-x-hidden overflow-y-auto w-[100%]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
