import userApi from "@/api/userApi"
import { useAppSelector } from "@/app/hooks"
import { BillUser } from "@/models"
import { formatCurrencyVND, handleFoodBill, handlePrice } from "@/utils"
import { Close, Done, Visibility } from "@mui/icons-material"
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  Stack,
} from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import dayjs from "dayjs"
import { useSnackbar } from "notistack"
import { forwardRef, useState } from "react"

interface BillItemProps {
  data: BillUser
}
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})
const BillItem = (props: BillItemProps) => {
  const { data } = props
  const { width } = useAppSelector((state) => state.app)
  const renLinkImg = (
    status: "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELED",
  ) => {
    return width > 600
      ? `/imp/${status.toLowerCase()}.svg`
      : `/imp/${status.toLowerCase()}_sm.svg`
  }
  const renStatus = (
    status: "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELED",
  ) => {
    if (status === "PENDING") {
      return "Chờ xác nhận"
    }
    if (status === "PROCESSING") {
      return "Đang vận chuyển"
    }
    if (status === "DELIVERED") {
      return "Đã hoàn thành"
    }
    return "Đã hủy"
  }
  const foodBill = handleFoodBill(data.foodResponseBills)
  const [dialog, setDialog] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [openConfirm, setOpenConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleCancelBill = () => {
    ;(async () => {
      try {
        setLoading(true)
        await userApi.cancelBill(data.id)

        setLoading(false)
        if (dialog === true) {
          setDialog(false)
        }
        setOpenConfirm(false)
        enqueueSnackbar("Hủy thành công", { variant: "success" })
      } catch (error) {
        console.log(error)
        enqueueSnackbar("Hủy thất bại, thử lại sau", { variant: "error" })
      }
    })()
  }
  return (
    <>
      {data.orderStatus === "PENDING" && (
        <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
          <DialogTitle>Bạn chắn chắn muốn hủy?</DialogTitle>
          <DialogContent className="py-4 px-5">
            <b>Lưu ý:</b> Khi đơn hàng bị hủy bạn không thể hoàn tác
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenConfirm(false)}
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
              Đợi chút
            </Button>
            <Button
              variant="contained"
              startIcon={
                loading ? (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                ) : (
                  <Done />
                )
              }
              onClick={handleCancelBill}
              sx={{
                backgroundColor: "var(--color-df-1)",
                color: "white",
                "&:hover": {
                  backgroundColor: "var(--color-df-1)",
                },
              }}
            >
              Tôi chắc chắn
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Dialog
        open={dialog}
        fullScreen={width < 600}
        sx={{
          "& .MuiPaper-root ": {
            width: "100%",
            maxWidth: 800,
          },
        }}
        TransitionComponent={Transition}
        onClose={() => setDialog(false)}
      >
        <DialogTitle
          sx={{
            backgroundColor: "var(--color-df-2)",
            "& *": {
              color: "white",
            },
          }}
        >
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <span>
              Đơn hàng #{dayjs(data.createAt).format("DDMMYY")}O{data.id}
            </span>
            <Box>
              <IconButton onClick={() => setDialog(false)}>
                <Close />
              </IconButton>
            </Box>
          </Stack>
        </DialogTitle>
        <DialogContent
          sx={{ padding: "10px 20px !important", overflow: "hidden auto" }}
        >
          <div className="py-3">
            <p className="text-base font-semibold mb-2  ">Trạng thái</p>
            <p className="text-sm ">{renStatus(data.orderStatus)}</p>
          </div>
          <div className="py-2">
            <p className="text-xl font-semibold mb-1">Chi tiết đơn hàng</p>
            <div className=" overflow-x-auto ">
              <div className="flex flex-col min-w-[300px]">
                {foodBill.map((item, index) => (
                  <div key={index}>
                    <p className="font-semibold mb-2">{item.nameRes}</p>
                    <Grid className="border-b border-gray-400 py-2" container>
                      <Grid item xs={width>500?6:8}>
                        Tên
                      </Grid>
                      {width > 500 ? (
                        <>
                          <Grid item xs={2}>
                            Số lượng
                          </Grid>
                          <Grid item xs={2}>
                            Đơn giá
                          </Grid>
                          <Grid item xs={2}>
                            Thành tiền
                          </Grid>
                        </>
                      ) : (
                        <Grid item xs={4}>
                          Thành tiền
                        </Grid>
                      )}
                    </Grid>
                    {item.data.map((food) => (
                      <Grid className="py-2" key={food.foodId} spacing={2} container>
                        <Grid item xs={width>500?6:8}>
                          {food.nameFood}
                          {width <= 500 ? `*${food.quantity}` : ""}
                        </Grid>
                        {width > 500 ? (
                          <>
                            <Grid item xs={2}>
                              {food.quantity}
                            </Grid>
                            <Grid item xs={2}>
                              {food.priceFood}
                            </Grid>
                            <Grid item xs={2}>
                              {formatCurrencyVND(
                                String(food.quantity * food.priceFood),
                              )}
                            </Grid>
                          </>
                        ) : (
                          <Grid item xs={4}>
                            {formatCurrencyVND(
                              String(food.quantity * food.priceFood),
                            )}
                          </Grid>
                        )}
                      </Grid>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className={`flex w-full ${width > 500 ? "flex-row" : "flex-col"}`}
          >
            <div className="py-2 flex-1">
              <p className="text-base font-semibold mb-2">Tổng đơn hàng</p>
              <p className=" text-sm">
                {formatCurrencyVND(String(data.totalAmount))}
              </p>
            </div>
            <div className="py-2 flex-1">
              <p className="text-base font-semibold mb-2">Phí vận chuyển</p>
              <p className=" text-sm">
                {formatCurrencyVND(String(data.shipFee))}
              </p>
            </div>
            <div className="py-2 flex-1">
              <p className="text-base font-semibold mb-2">Tổng hóa đơn</p>
              <p className=" text-sm">
                {formatCurrencyVND(String(data.shipFee + data.totalAmount))}
              </p>
            </div>
          </div>
          <div className="py-2">
            <p className="text-base font-semibold mb-2">Mã sử dụng</p>
            <p className=" text-sm">
              {data.voucherResponseBill?.code || "Không sử dụng"}
            </p>
          </div>
          <div className="py-2">
            <p className="text-base font-semibold mb-2">Giờ nhận hàng</p>
            <p className=" text-sm">{data?.finishTime || "Không có"}</p>
          </div>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 24px" }}>
          {data.orderStatus === "PENDING" && (
            <Button
              variant="outlined"
              size={width < 850 ? "small" : "medium"}
              onClick={() => setOpenConfirm(true)}
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
          )}
        </DialogActions>
      </Dialog>

      <div
        onClick={() => {
          if (width > 600) return
          setDialog(true)
        }}
        style={{
          gridTemplateColumns: width > 600 ? "170px 1fr" : "120px 1fr",
        }}
        className="grid border border-[#ef7692]  w-full gap-2"
      >
        <Box
          className={`${
            width > 600 ? "h-[170px]  w-[170px]" : "h-[120px]  w-[120px]"
          } border-r border-[#ef7692]  relative`}
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
              #{dayjs(data.createAt).format("DDMMYY")}O{data.id}
            </Box>
          </div>
          <div className="absolute top-8 left-[-4px] z-[2]">
            <Box
              className="py-1  px-1.5 text-xs bg-[var(--color-layer-2)] text-white"
              sx={{
                "&:before": {
                  borderTop: "4px solid var(--color-layer-2)",
                  borderLeft: "4px solid transparent",
                  position: "absolute",
                  display: "block",
                  content: '""',
                  top: "24px",
                  left: "0px",
                },
              }}
            >
              #{dayjs(data.createAt).format("DD/MM/YY")}
            </Box>
          </div>
        </Box>
        <Box className="flex flex-col px-2 pb-2 overflow-hidden pt-1 justify-between">
          <div>
            <p className="font-semibold mb-1 line-clamp-1 text-xl">
              {width < 850 ? "" : "Đơn hàng "}#
              {dayjs(data.createAt).format("DDMMYY")}O{data.id}{" "}
              {data.orderStatus === "CANCELED" ? "(Đã hủy)" : ""}
            </p>
            <p className="text-gray-500 mb-[2px] text-sm line-clamp-2">
              {width > 550 && (
                <>
                  {" "}
                  <b>Chi tiết đơn hàng</b>:{" "}
                </>
              )}
              {data.foodResponseBills.map(
                (item, index) =>
                  `${item.nameFood}*${item.quantity}${
                    index < data.foodResponseBills.length - 1 ? ", " : ""
                  }`,
              )}
            </p>
            {width > 500 && (
              <p className="text-gray-500 mb-[2px] text-sm line-clamp-3">
                <b>Mã sử dụng</b>:{" "}
                {data.voucherResponseBill?.code || "Không sử dụng"}
              </p>
            )}
            <p className="text-gray-500 mb-[2px] text-sm line-clamp-3">
              <b>Tổng tiền</b>:{" "}
              {formatCurrencyVND(`${data.totalAmount + data.shipFee}`)}
            </p>
          </div>
          {width > 600 && (
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              {data.orderStatus === "PENDING" && (
                <Button
                  variant="outlined"
                  size={width < 850 ? "small" : "medium"}
                  onClick={() => setOpenConfirm(true)}
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
              )}
              <Button
                variant="contained"
                size={width < 850 ? "small" : "medium"}
                startIcon={<Visibility />}
                onClick={() => setDialog(true)}
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
          )}
        </Box>
      </div>
    </>
  )
}

export default BillItem
