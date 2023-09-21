import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"
import { Header } from "../Common"

export interface propsData {}

export function Store(props: propsData) {
  return (
    <Box>
      <Header sx={{ backgroundColor: "white" }} isWhiteLogo={false} />
      <div className="mt-[80px] "  style={{ backgroundColor: "rgb(240, 242, 245)",minHeight:"calc(100vh - 80px)" }}>
        <Outlet />
      </div>
    </Box>
  )
}
