import { Box, Stack } from "@mui/material"
import { useEffect } from "react"
import { Outlet, Route, Routes, useLocation } from "react-router-dom"
import { HeaderAdmin } from "../Common/HeaderAdmin"
import { Product, Quote, Supplier } from "@/features/Admin"
import { ToolbarAdmin } from "../Common"
import { Employee } from "@/features/Admin/Employee"
import { Customer } from "@/features/Admin/Customer"
import NewProduct from "@/features/Admin/components/NewProduct"
import NewEmployee from "@/features/Admin/components/NewEmployee"
import NewType from "@/features/Admin/components/NewType"
import TypeProduct from "@/features/Admin/TypeProduct"
import queryString from "query-string"
import NewStore from "@/features/Admin/components/NewSupplier"
import UpdateSupplier from "@/features/Admin/components/UpdateSupplier"
import UpdateType from "@/features/Admin/components/UpdateType"
import NewTopping from "@/features/Admin/components/NewTopping"
import UpdateProduct from "@/features/Admin/components/UpdateProduct"
import UpdateCustomer from "@/features/Admin/components/UpdateCustomer"

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

interface data {
  type: string
  id: string
}

function extractTypeAndId(inputString: string) {
  const parts = inputString.split("/")
  if (parts.length === 2) {
    const [type, id] = parts
    return { type, id }
  }
  return null
}

const FormRouter = () => {
  const location = useLocation()
  const queryParams = queryString.parse(location.search)
  const form = queryParams.form
  switch (form) {
    case "type":
      return <NewType />
    case "product":
      return <NewProduct />
    case "store":
      return <NewStore />
    case "employee":
      return <NewEmployee />
    default:
      return null
  }
}

const FormUpdate = () => {
  const location = useLocation()
  const queryParams = queryString.parse(location.search)
  const form = queryParams.form
  if (typeof form === "string") {
    const result = extractTypeAndId(form) as data
    const { type, id } = result
    switch (type) {
      case "supplier":
        return <UpdateSupplier id={id} />
      case "type":
        return <UpdateType id={id} />
      case "product":
        return <UpdateProduct id={id} />
      case "customer":
        return <UpdateCustomer id={id} />
      default:
        return null
    }
  }
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
          <Route path="/employee" element={<Employee />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/product" element={<Product />} />
          <Route path="/type" element={<TypeProduct />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/expand-food" element={<NewTopping />} />
          <Route path="/new" element={<FormRouter />} />
          <Route path="/update" element={<FormUpdate />} />
        </Routes>
      </Box>
    </Box>
  )
}
