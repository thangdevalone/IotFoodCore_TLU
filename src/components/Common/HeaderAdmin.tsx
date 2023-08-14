import { useInforUser } from "@/hooks"
import {
  AccessTimeOutlined,
  ArrowBackIosNew,
  StorageOutlined,
} from "@mui/icons-material"
import { Avatar, IconButton, Stack, Tooltip } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MenuAdmin } from "."

function getList(labelList: string[], navList: string[]) {
  const list = labelList.map((item, index) => ({
    label: item,
    nav: "/admin" + navList[index],
  }))
  return list
}

export function HeaderAdmin() {
  const [openOrder, setOpenOrder] = useState(false)
  const [openInvoice, setOpenInvoice] = useState(false)
  const [openReport, setOpenReport] = useState(false)
  const [openProduct, setOpenProduct] = useState(false)
  const [openConfig, setOpenConfig] = useState(false)

  const OrderList = getList(
    ["Báo giá", "Đơn hàng", "Nhân viên", "Khách hàng"],
    ["/quote", "/order", "/employee", "/customer"],
  )
  const InvoiceList = getList(
    ["Hóa đơn", "Thống kê hóa đơn"],
    ["/invoice", "/invoice-stat"],
  )
  const ProductList = getList(
    ["Sản phẩm", "Loại sản phẩm", "Nhà cung cấp"],
    ["/product", "/type", "/supplier"],
  )
  const ConfigList = getList(
    ["Cài đặt", "Nhân viên", "Phương thức thanh toán"],
    ["/setting", "/config-emp", "/pay-method"],
  )
  const user = useInforUser()
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const handleMoveHome = () => {
    navigate("/")
  }

  return (
    <Stack
      direction="row"
      className="p-[10px] border-b border-gray-200 "
      justifyContent="space-between "
    >
      <Stack direction="row" alignItems="center">
        <Stack
          direction="row"
          alignItems={"center"}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleMoveHome}
          sx={{
            cursor: "pointer",
            margin: "0 5px",

            "&:hover": {
              transform: " translateX(-5px)",
              transition: "all 0.3s",
            },
          }}
        >
          <span className="mr-3">
            {hovered ? <ArrowBackIosNew /> : <StorageOutlined />}
          </span>
          <span className="font-medium mr-2">Trang quản trị</span>
        </Stack>

        <div className="relative">
          <button
            onClick={() => setOpenOrder(true)}
            className="bg-white translate-y-[1.5px] hover:bg-gray-200 text-gray-800 text-[14px]  py-1 px-3  hover:border-gray-300 rounded mr-1"
          >
            Đơn hàng
          </button>
          <MenuAdmin
            open={openOrder}
            setOpen={setOpenOrder}
            items={OrderList}
          />
        </div>

        <div className="relative">
          <button onClick={() => setOpenInvoice(true)} className="bg-white translate-y-[1.5px] hover:bg-gray-200 text-gray-800 text-[14px]  py-1 px-3  hover:border-gray-300 rounded mr-1">
            Hóa đơn
          </button>
          <MenuAdmin
            open={openInvoice}
            setOpen={setOpenInvoice}
            items={InvoiceList}
          />
        </div>
        <div className="relative">
          <button onClick={() => setOpenProduct(true)} className="bg-white translate-y-[1.5px] hover:bg-gray-200 text-gray-800 text-[14px]  py-1 px-3  hover:border-gray-300 rounded mr-1">
            Sản phẩm
          </button>
          <MenuAdmin
            open={openProduct}
            setOpen={setOpenProduct}
            items={ProductList}
          />
        </div>

        <button
          onClick={() => navigate("/admin/report")}
          className="bg-white translate-y-[1.5px] hover:bg-gray-200 text-gray-800 text-[14px]  py-1 px-3  hover:border-gray-300 rounded mr-1"
        >
          Báo cáo
        </button>

        <div className="relative">
          <button onClick={() => setOpenConfig(true)} className="bg-white translate-y-[1.5px] hover:bg-gray-200 text-gray-800 text-[14px]  py-1 px-3  hover:border-gray-300 rounded mr-1">
            Cấu hình
          </button>
          <MenuAdmin
            open={openConfig}
            setOpen={setOpenConfig}
            items={ConfigList}
          />
        </div>
      </Stack>
      <Stack direction="row">
        <Tooltip title="Hoạt động gần đây">
          <IconButton>
            <AccessTimeOutlined htmlColor="black" />
          </IconButton>
        </Tooltip>
        <Avatar
          src={user?.imgUser}
          className="ml-3"
          sx={{ borderRadius: "6px", cursor: "pointer" }}
        />
      </Stack>
    </Stack>
  )
}
