import { Box, Stack } from "@mui/material"
import { useEffect } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { HeaderAdmin } from "../Common/HeaderAdmin"
import { Product, Quote } from "@/features/Admin"
import { ToolbarAdmin } from "../Common"
import { Employee } from "@/features/Admin/Employee"
import NewProduct from "@/features/Admin/components/NewProduct"
import NewEmployee from "@/features/Admin/components/NewEmployee"

const WelComeAdmin = () => {
  return (
    <Stack className="h-[100%]" alignItems="center" justifyContent="center">
      <img src="/assets/data-analysis.svg" className="w-[250px]" />
      <p className="font-semibold text-xl mb-2">
        Chào mừng đến với trang quản trị
      </p>
      <span className=" text-base text-slate-400">
        Hãy bắt đầu với những chức năng có sẵn. Chúc bạn một ngày tốt lành
      </span>
    </Stack>
  )
}

export default function Admin() {
  useEffect(() => {
    document.body.style.overflow = "hidden" // Set overflow to hidden when the component mounts

    return () => {
      document.body.style.overflow = "hidden scroll" // Reset overflow to hidden when the component unmounts
    }
  }, [])
  return (
    <Box className="h-screen w-screen">
      <HeaderAdmin />

      <Box sx={{ height: "calc(100vh - 61px)" }} className="w-screen">
        <Routes>
          <Route path="/" element={<WelComeAdmin />} />

          <Route path="/quote" element={<Quote />} />
          <Route path="/product" element={<Product />}/>
          <Route path="/new" element={<NewProduct />} />
          <Route path="/new-employee" element={<NewEmployee />} />
          <Route path="/config-emp" element={<Employee />} />
        </Routes>
      </Box>
    </Box>
  )
}
