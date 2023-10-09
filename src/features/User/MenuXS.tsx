import { Receipt } from "@mui/icons-material"
import BottomNavigation from "@mui/material/BottomNavigation"
import BottomNavigationAction from "@mui/material/BottomNavigationAction"
import * as React from "react"
import User from "."

export function MenuXS() {
  const [value, setValue] = React.useState(0)
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
    >
      <BottomNavigationAction label="Đơn mua" icon={<Receipt />} />
      <BottomNavigationAction label="Người dùng" icon={<User />} />
    </BottomNavigation>
  )
}
