import userApi from "@/api/userApi"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Header, ToppingAccord, VoucherDesign } from "@/components/Common"
import {
  cartActions,
  iDataStore,
} from "@/components/Common/CartDrawer/CartSlice"
import CartList from "@/components/Common/CartDrawer/Components/CartList"
import { CustomButton } from "@/components/Custom/CustomButon"
import { SOCKET_URL } from "@/constants"
import { useInforUser, useToken } from "@/hooks"
import { BillConfig, BillFoodRequest, VoucherItem } from "@/models"
import { handleDiscount, handlePrice } from "@/utils"

import {
  Close,
  CreditCard,
  Done,
  KeyboardArrowRight,
  LocalAtmOutlined,
} from "@mui/icons-material"
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material"
import { useSnackbar } from "notistack"
import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SockJS from "sockjs-client"
import * as Stomp from "stompjs"
export interface CheckoutProps {}

export default function Checkout(props: CheckoutProps) {
  const token = useToken()
  const cart = useAppSelector((state) => state.cart)
  const [noteShip, setNoteShip] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [vouchers, setVouchers] = useState<VoucherItem[]>([])
  const [loading, setLoading] = useState(false)
  const [clientStomp, setClientStomp] = useState<Stomp.Client | null>(null)
  const headers = { Authorization: `Bearer ${token}` }

  const shipFee =
    cart.totalShip && cart.voucherUse
      ? handleDiscount(
          cart.totalShip,
          cart.voucherUse.discount,
          cart.voucherUse.code,
        )
      : cart.totalShip

  const navigate = useNavigate()
  const handleChange = (event: SelectChangeEvent) => {
    setPaymentMethod(event.target.value as string)
  }
  const [open, setOpen] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useAppDispatch()
  const { width } = useAppSelector(state=>state.app)
  const handleAddOrder = () => {
    const bill: BillConfig = {
      totalAmount: 0,
      shipFee: 0,
      finishTime:cart.timeDeliver,
      billFoodRequests: [],
    }
    if (cart.voucherUse) {
      bill["codeVoucher"] = cart.voucherUse.code
    }
    bill["shipFee"] = shipFee || 0
    const listBill: BillFoodRequest[] = []
    cart.dataStore.forEach((element) => {
      element.items.forEach((item) => {
        listBill.push({ foodId: item.idFood, quantity: item.quantity })
      })
    })
    bill["billFoodRequests"] = listBill
    bill["totalAmount"] = cart.totalAmount || 0
    bill["note"] = noteShip
    ;(async () => {
      setLoading(true)
      // await userApi.addOrder(bill)
      if (clientStomp) {
        clientStomp.send("/app/add-bill", headers, JSON.stringify(bill))
      }

      setLoading(false)
    })()
  }
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleClickOpenConfirm = () => {
    setOpenConfirm(true)
  }

  const handleCloseConfirm = () => {
    setOpenConfirm(false)
  }
  const user = useInforUser()
  useEffect(() => {
    ;(async () => {
      try {
        const res = await userApi.getAllVoucher()
        setVouchers(res.data as VoucherItem[])
      } catch (error) {
        console.log(error)
      }
    })()
    var socket = new SockJS(SOCKET_URL)
    var client = Stomp.over(socket)
    client.debug = () => {
      return
    }
    client.connect(
      headers,
      () => {
        // Hàm callback khi kết nối thành công
        console.log("Connected to WebSocket")
        setClientStomp(client)
      },
      (error) => {
        // Hàm callback khi có lỗi kết nối
        console.error("WebSocket connection error:", error)
      },
    )
    return () => {
      if (clientStomp) {
        clientStomp.disconnect(() => {
          console.log("Disconnected from WebSocket")
        })
      }
    }
  }, [])
  useEffect(() => {
    if (clientStomp) {
      // Đăng ký để lắng nghe các tin nhắn từ máy chủ
      clientStomp.subscribe(
        "/topic/add-bill",
        (message) => {
          const data = JSON.parse(message.body)
          if (data.body.usernameSend === user?.msv) {
            if (data.statusCodeValue === 400) {
              enqueueSnackbar("Hết mã rồi tình yêu ơi", { variant: "error" })
            } else {
              enqueueSnackbar("Đặt hàng thành công. Bấm vào đơn mua để xem", {
                variant: "success",
              })
              const newVoucher = data.body.data as VoucherItem[]
              setVouchers(newVoucher)
              setOpenConfirm(false)
              dispatch(cartActions.resetCart())
              if (cart.dataStore.length > 0 && newVoucher) {
                const newVoucherUse = newVoucher.find(
                  (item) =>
                    item.code === cart.voucherUse?.code &&
                    item.quantity !== cart.voucherUse?.quantity,
                )
                if (newVoucherUse) {
                  dispatch(cartActions.addVoucherUse(newVoucherUse))
                }
              }
            }
          } else {
            const newVoucher = data.body.data as VoucherItem[]
            setVouchers(newVoucher)
            if (cart.dataStore.length > 0 && newVoucher) {
              const newVoucherUse = newVoucher.find(
                (item) =>
                  item.code === cart.voucherUse?.code &&
                  item.quantity !== cart.voucherUse?.quantity,
              )
              if (newVoucherUse) {
                dispatch(cartActions.addVoucherUse(newVoucherUse))
              }
            }
          }
        },
        headers,
      )
    }
  }, [clientStomp])
  const cssVoucherDialog=width<550?{width:"100vw",height:"100vh",maxHeight:"unset",margin:0,borderRadius:"unset"}:{width:"90%",maxWidth:"650px"}
  return (
    <>
    {clientStomp?<Box>
      <Header sx={{ backgroundColor: "white" }} isWhiteLogo={false} />
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": cssVoucherDialog,
        }}
      >
        <DialogTitle>
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <span>Chọn ưu đãi có sẵn</span>
            <Box>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
          </Stack>
        </DialogTitle>
        <DialogContent
          sx={{ backgroundColor: "#D3D3D3", padding: `${width>450?"20px 24px !important":"20px 10px !important"}`,overflow:"hidden auto" }}
        >
          {vouchers?.map((item) => (
            <VoucherDesign
              key={item.id}
              data={item}
            />
          ))}
        </DialogContent>
      </Dialog>
      <Dialog open={openConfirm} onClose={handleCloseConfirm}>
        <DialogTitle>Bạn chắn chắn muốn đặt hàng?</DialogTitle>
        <DialogContent className="py-4 px-5">
          <b>Lưu ý:</b> Bạn chỉ có thể hủy đơn hàng trước khi đơn hàng được{" "}
          <b>xác nhận hoặc đang giao</b> nên hãy thật chắc chắn trước khi đặt
          hàng.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseConfirm}
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
            Hủy
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
            onClick={handleAddOrder}
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
      <div className="bg-white h-[80px] w-screen text-black flex items-center justify-center mt-[80px] font-semibold text-2xl border-t">
        Thanh toán
      </div>
      <div
        style={{
          backgroundColor: "rgb(240, 242, 245)",
          minHeight: "calc(100vh - 160px)",
        }}
        className="py-4"
      >
        <div
          style={{ width: "100%", maxWidth: "1000px", margin: "0 auto" }}
          className={`${width>600?"base-pd":""} ${
            !cart.dataStore?.length ? "flex justify-center" :""
          }`}
        >
          {cart.dataStore?.length > 0 ? (
            <>
              <div className="w-[100%] mb-4 bg-white">
                <p className="px-6 py-3 border-b-[2px] font-semibold border-gray-300">
                  Giao đến: Trường Đại học Thăng Long
                </p>
                <div className="">
                  <div className="border-gray-300 border-b-[2px] px-6 py-3">
                    <p className="text-sm text-[#777777] mb-1">
                      Thời gian giao đến
                    </p>
                    <p className="font-semibold">{cart.timeDeliver}</p>
                  </div>
                  <Stack
                    direction={{ md: "row", xs: "column" }}
                    alignItems={{ xs: "center" }}
                    className="mt-3 px-4 py-3"
                    spacing={3}
                  >
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1052.9831793255769!2d105.81523017582998!3d20.976219020638982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acef8ad5350f%3A0x89435a3528118ff5!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBUaMSDbmcgTG9uZw!5e0!3m2!1svi!2s!4v1695782480925!5m2!1svi!2s"
                      width="100%"
                      height="250"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

                    <div className="w-full">
                      <TextField
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          return
                        }}
                        multiline
                        spellCheck={false}
                        fullWidth
                        label="Chi tiết địa chỉ"
                        value={
                          "Thang Long University, Nghiêm Xuân Yêm, Đại Kim, Hoàng Mai, Hà Nội 100000, Vietnam"
                        }
                        name="detailAddress"
                      />
                      <textarea
                        id="message"
                        rows={4}
                        spellCheck={false}
                        value={noteShip}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setNoteShip(e.target.value)
                        }
                        className="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Viết ghi chú cho tài xế..."
                      ></textarea>
                    </div>
                  </Stack>
                </div>
              </div>
              <div className="w-[100%] mb-4 bg-white">
                <p className="px-6 py-3 border-b-[2px] font-semibold border-gray-300">
                  Chi tiết đơn hàng
                </p>
                <div className="w-full">
                  {cart.lengthFood && (
                    <Stack>
                      <Stack
                        className="custom-scroll-y"
                        sx={{
                          padding: "24px",
                          overflow: "hidden auto",
                          height: "calc(100% - 200px)",
                          width: "100%",
                        }}
                        spacing={3}
                      >
                        {cart.dataStore.map((data: iDataStore) => (
                          <div key={data.id}>
                            <div>
                              <div className="font-medium text-xl">
                                {data.name}
                              </div>
                              <ToppingAccord
                                toppingEntity={data.toppingEntityList || []}
                              />
                              <CartList items={data.items} />
                            </div>
                            <Stack
                              sx={{
                                "& *": {
                                  fontSize: "13px",
                                },
                                width: "100%",
                                mt: 1,
                              }}
                              justifyContent="space-between"
                              direction="row"
                              spacing={3}
                            >
                              <Stack direction="column">
                                <span>Tổng</span>
                                <p>Phí vận chuyển</p>
                              </Stack>
                              <Stack direction="column">
                                <span className="text-end">
                                  {handlePrice(data.amount)} ₫
                                </span>
                                <span className="text-end">
                                  {handlePrice(data.shipFee)} ₫
                                </span>
                                <div className="border border-gray-400 my-[2px]"></div>
                                <span className="text-end font-semibold">
                                  {handlePrice(
                                    (data.shipFee || 0) + (data.amount || 0),
                                  )}{" "}
                                  ₫
                                </span>
                              </Stack>
                            </Stack>
                          </div>
                        ))}
                      </Stack>
                    </Stack>
                  )}
                  <div className="px-6 py-4 border-t-[2px] border-gray-300">
                    <Box className="flex justify-between items-center text-sm mb-1">
                      <span className="">Tổng tiền:</span>
                      <span className="font-medium">
                        {handlePrice(cart.totalAmount)} ₫
                      </span>
                    </Box>
                    <Box className="flex justify-between items-center text-sm mb-1">
                      <span className="">Tổng phí vận chuyển:</span>
                      <span className="font-medium">
                        {cart.voucherUse && (
                          <span className="line-through text-gray-400 mr-2">
                            {handlePrice(cart.totalShip)} ₫
                          </span>
                        )}{" "}
                        {handlePrice(shipFee)} ₫
                      </span>
                    </Box>
                    <Box className="flex justify-between items-center text-sm mb-1">
                      <span className="">Tổng hóa đơn:</span>
                      <span className="font-medium">
                        {cart.voucherUse && (
                          <span className="line-through text-gray-400 mr-2">
                            {handlePrice(cart.totalPrice)} ₫
                          </span>
                        )}{" "}
                        {handlePrice((shipFee || 0) + (cart.totalAmount || 0))}{" "}
                        ₫
                      </span>
                    </Box>
                  </div>
                </div>
              </div>
              <div className="w-[100%] mb-4 bg-white">
                <p className="px-6 py-3 border-b-[2px] font-semibold border-gray-300">
                  Phương thức thanh toán
                </p>
                <div className="px-6 py-3">
                  <FormControl
                    size="small"
                    sx={{ margin: "20px 0px " }}
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-label">
                      Phương thức thanh toán
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      sx={{
                        "& .MuiSelect-select": {
                          display: "flex",
                          alignItems: "center",
                        },
                        "& .MuiListItemIcon-root": {
                          minWidth: "36px",
                        },
                      }}
                      value={paymentMethod}
                      label="Phương thức thanh toán"
                      onChange={handleChange}
                    >
                      <MenuItem value="cash">
                        <ListItemIcon>
                          <LocalAtmOutlined fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Thanh toán trực tiếp</ListItemText>
                      </MenuItem>
                      <MenuItem disabled={true} value="card">
                        <ListItemIcon>
                          <CreditCard fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                          Thanh toán online (Không có sẵn)
                        </ListItemText>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="w-[100%] mb-[100px] bg-white">
                <div className="px-6 flex flex-row justify-between items-center py-3 border-b-[2px] font-semibold border-gray-300">
                  <p>Ưu đãi</p>{" "}
                  <Button
                    endIcon={<KeyboardArrowRight />}
                    onClick={handleClickOpen}
                    sx={{ color: "var(--color-df-2)" }}
                  >
                    Chọn ưu đãi{" "}
                  </Button>
                </div>
                <div className="px-6 flex flex-col items-center bg-[#D3D3D3] py-5">
                  {cart.voucherUse ? (
                    <VoucherDesign data={cart.voucherUse} />
                  ) : (
                    "Chưa có mã nào được áp dụng"
                  )}
                </div>
              </div>
              <div
                className="fixed bottom-0 left-0 z-[1200] w-screen h-[15vh] py-3  bg-white"
                style={{ boxShadow: "0 -4px 5px 0px rgba(0, 0, 0, 0.2)",maxHeight:`${width>600?"90px":"100px"}` }}
              >
                <div
                  style={{
                    width: "100%",
                    maxWidth: "1000px",
                    margin: "0 auto",
                    flexDirection:`${width>600?"row":"column"}`
                  }}
                  className={`flex h-full gap-1 items-center justify-between ${width>500?"base-pd":""}`}
                >
                  <p className={`${width>600?"text-xl":"text-lg"}`}>
                    Tổng hóa đơn:{" "}
                    <span className="font-semibold">
                      {cart.voucherUse && (
                        <span className="line-through text-gray-400 mr-2">
                          {handlePrice(cart.totalPrice)} ₫
                        </span>
                      )}{" "}
                      {handlePrice((shipFee || 0) + (cart.totalAmount || 0))} ₫
                    </span>
                  </p>
                  <CustomButton
                    fullWidth
                    onClick={handleClickOpenConfirm}
                    sx={{
                      background: "var(--color-df-1)",
                      color: "white",
                      borderRadius: "6px",
                      maxWidth: "300px",
                      minWidth: "150px",
                      fontSize: "15px",
                      height: "50px",
                      fontWeight: "600",
                      textTransform: "unset",
                      "&:hover": {
                        background: "var(--color-df-1)",
                        color: "white",
                      },
                    }}
                  >
                    Đặt hàng
                  </CustomButton>
                </div>
              </div>
            </>
          ) : (
            <Box
              sx={{
                padding: "12px",
                width: "400px",
                textAlign: "center",
              }}
            >
              <img
                src="/assets/empty-cart.svg"
                style={{ width: "100%" }}
                alt="empty-img"
              />
              <h5
                style={{
                  marginTop: "24px",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                }}
              >
                Giỏ hàng rỗng!
              </h5>
              <Box className="caption-tx" sx={{ color: "#9a9a9a" }}>
                Thêm các mặt hàng vào giỏ hàng của bạn và đặt hàng tại đây
              </Box>
              <Button onClick={() => navigate("/")} variant="outlined">
                Tiếp tục xem đồ ăn
              </Button>
            </Box>
          )}
        </div>
      </div>
    </Box>:"Chờ chút nhé..."}
    </>
  )
}