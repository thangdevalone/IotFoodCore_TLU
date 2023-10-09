import { useAppSelector } from "@/app/hooks"
import { BillUser } from "@/models"
import { formatCurrencyVND } from "@/utils"
import { Visibility } from "@mui/icons-material"
import { Box, Button, Stack } from "@mui/material"
import dayjs from "dayjs"

interface BillItemProps {
  data: BillUser,
}

const BillItem = (props: BillItemProps) => {
  const { data } = props
  const { width } = useAppSelector(state=>state.app)
  const renLinkImg=(status:"PENDING"| "PROCESSING"|"DELIVERED"|"CANCELED")=>{
    return  `/imp/${status.toLowerCase()}.svg`
  }
  return (
    <div
      style={{
        gridTemplateColumns: "170px 1fr",
      }}
      className="grid border border-[#ef7692]  w-full gap-2"
    >
      <Box
        className="w-[170px] border-r border-[#ef7692] h-[170px] relative"
        sx={{ background: `url(${renLinkImg(data.orderStatus)})` }}
      >
        <div className="absolute top-1 left-[-4px] z-[2]">
          <Box
            className="py-1  px-1.5 text-xs bg-[var(--color-df-1)] text-white"
            sx={{
              "&:before": {
                borderTop: "4px solid var(--color-df-1)",
                borderLeft: "4px solid transparent",
                position: "absolute",
                display: "block",
                content: '""',
                top: "24px",
                left: "0px",
              },
            }}
          >
            #{dayjs(data.createAt).format("HHMMssDDMMYY")}O{data.id}
          </Box>
        </div>
      </Box>
      <Box className="flex flex-col px-2 pb-2 pt-1 justify-between">
        <div>
          <p className="font-semibold mb-1 line-clamp-1 text-xl">
            {width < 850 ? "" : "Đơn hàng "}#
            {dayjs(data.createAt).format("HHMMssDDMMYY")}O{data.id}
          </p>
          <p className="text-gray-500 mb-[2px] text-sm line-clamp-2">
            <b>Chi tiết đơn hàng</b>:{" "}
            {data.foodResponseBills.map(
              (item, index) =>
                `${item.nameFood}*${item.quantity}${
                  index < data.foodResponseBills.length - 1 ? ", " : ""
                }`,
            )}
          </p>
          <p className="text-gray-500 mb-[2px] text-sm line-clamp-3">
            <b>Mã sử dụng</b>: {data.voucherResponseBill.code}
          </p>
          <p className="text-gray-500 mb-[2px] text-sm line-clamp-3">
            <b>Tổng tiền</b>:{" "}
            {formatCurrencyVND(`${data.totalAmount + data.shipFee}`)}
          </p>
        </div>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Button
            variant="outlined"
            size={width < 850 ? "small" : "medium"}
            sx={{
              borderColor: "#ef7692",
              color: "#ef7692",
              "&:hover": {
                borderColor: "#ef7692",
                color: "#ef7692",
              },
            }}
          >
            Hủy đơn
          </Button>
          <Button
            variant="contained"
            size={width < 850 ? "small" : "medium"}
            startIcon={<Visibility />}
            sx={{
              backgroundColor: "var(--color-df-1)",
              color: "white",
              "&:hover": {
                backgroundColor: "var(--color-df-1)",
              },
            }}
          >
            Xem chi tiết
          </Button>
        </Stack>
      </Box>
    </div>
  )
}

export default BillItem
