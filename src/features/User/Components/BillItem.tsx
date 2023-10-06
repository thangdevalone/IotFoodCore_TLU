import { BillUser } from "@/models"
import { Visibility } from "@mui/icons-material"
import { Box, Button, Stack } from "@mui/material"
import dayjs from "dayjs"

interface BillItemProps {
  data: BillUser
}

const BillItem = (props: BillItemProps) => {
  const { data } = props
  return (
    <div
      style={{
        gridTemplateColumns: "170px 1fr",
      }}
      className="grid  w-full gap-2"
    >
      <Box
        className="w-[170px]  h-[170px] relative"
        sx={{ background: "url('/imp/intransit.svg')" }}
      >
        <div className="absolute top-1 left-[-4px] z-[2]">
          <Box
            className="py-1 px-1.5 text-xs bg-[var(--color-df-1)] text-white"
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
      <Box className="flex flex-col px-2 py-1 justify-between">
        <div>
          <p className="font-semibold mb-1 line-clamp-1 text-xl">
            Đơn hàng #{dayjs(data.createAt).format("HHMMssDDMMYY")}O{data.id}
          </p>
          <p className="text-gray-500 mb-[2px] text-sm line-clamp-3">
            <b>Chi tiết đơn hàng</b>:{" "}
            {data.foodResponseBills.map(
              (item) => `${item.nameFood}*${item.quantity}`,
            )}
          </p>
          <p className="text-gray-500 mb-[2px] text-sm line-clamp-3">
            <b>Mã sử dụng</b>: {data.voucherResponseBill.code}
          </p>
        </div>
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Button
            variant="outlined"
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
