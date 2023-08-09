import { Box, Button, ButtonBase, Stack } from "@mui/material"
import * as React from "react"
import { Link } from "react-router-dom"

export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <Box
      className="w-screen flex items-center justify-center header-sd"
      sx={{ height: "80px", position: "fixed", zIndex: 20 }}
    >
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        className="container-base"
        sx={{
          position: "fixed",
          top: "0",
          height: "inherit",
          padding: "0 20px 0 20px",
        }}
      >
        <img src="/assets/iotfood.png" style={{ width: "130px" }} alt="logo" />
        <Stack direction={"row"}>
          <Link to="/login">
            <Button
              variant="outlined"
              sx={{
                color: "var(--color-tx-1)",
                border: "1px solid #f0efef",
                fontSize:"12px",
                background: "white",
                "&:hover": {
                  color: "var(--color-tx-1)",
                  border: "1px solid #f0efef",
                  background: "white",
                },
              }}
            >
              Đăng nhập/Đăng ký
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Box>
  )
}
