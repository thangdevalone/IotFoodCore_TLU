import { Box, Typography } from "@mui/material"

const BillItem = () => {
  return (
    <Box className="border p-6 cursor-pointer">
      <Box className="flex justify-between">
        <Box className="flex gap-5">
          <Box className="w-[150px] h-[150px] bg-black"></Box>
          <Box className="flex flex-col  justify-between">
            <Typography className="border p-2">hóa đơn</Typography>
            <Typography className="border p-2">thời gian</Typography>
            <Typography className="border p-2">nguowiff giao</Typography>
          </Box>
        </Box>
        <Box className="flex items-center justify-end ">
          <Typography className="border p-2">tổng đơn</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default BillItem
