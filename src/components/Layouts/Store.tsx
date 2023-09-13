import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import { Header } from "../Common"

export interface propsData {}

export function Store(props: propsData) {
  return (
    <Box className="tx-df-sz">
      <Header />
      <Box className="mt-24">
        <Outlet />
      </Box>
    </Box>
  )
}
