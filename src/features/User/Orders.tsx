import { Box, Divider, Tab, Tabs } from "@mui/material"
import * as React from "react"

export interface UserOrdersProps {}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}
export function UserOrders(props: UserOrdersProps) {
  const [tabs, setTabs] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabs(newValue)
  }
  return (
    <>
      <div className="mb-5">
        <h1 className="text-18-500">Đơn mua Của tôi</h1>
        <p className="text-[#999798]">
          Quản lý thông tin đơn mua xem lại, hủy đơn, đánh giá,..
        </p>
      </div>
      <Divider />
      <div>
        <Box >
          <Tabs
            value={tabs}
            onChange={handleChange}
            aria-label="product tabs example"
          >
            <Tab label="Tất cả" {...a11yProps(0)} />
            <Tab label="Chờ xác nhận" {...a11yProps(1)} />
            <Tab label="Đã xác nhận" {...a11yProps(2)} />
            <Tab label="Thành công" {...a11yProps(3)} />
            <Tab label="Đã hủy" {...a11yProps(4)} />

          </Tabs>
        </Box>
      </div>
    </>
  )
}
