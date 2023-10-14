import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { CustomButton } from "@/components/Custom/CustomButon"
import { useInforUser } from "@/hooks"
import { CartItemData } from "@/models"
import { handlePrice, handlePriceShip } from "@/utils"
import { ArrowBackIosNew } from "@mui/icons-material"
import { Box, Button, IconButton, Stack, SwipeableDrawer } from "@mui/material"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import { ToppingAccord } from ".."
import { cartActions, iDataStore } from "./CartSlice"
import CartList from "./Components/CartList"
import "./style_drawer.css"

export interface CardDrawerProps {}

export function CartDrawer(props: CardDrawerProps) {
  const {
    open,
    dataStore,
    timeDeliver,
    lengthFood,
    totalPrice,

  } = useAppSelector((state) => state.cart)
  const user = useInforUser()
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  const dispatch = useAppDispatch()
  const toggleDrawer = () => {
    dispatch(cartActions.toggleCart())
  }
  React.useEffect(() => {
    if (!dataStore) return
    let sum = 0
    let ship = 0
    dataStore?.forEach((store) => {
      let amount = 0
      store.items.forEach((item) => {
        amount += item.price * item.quantity
        sum += amount
      })
      const shipFee = handlePriceShip(
        store.distance,
        store.items.reduce(
          (sum: number, item: CartItemData) => (sum += item.quantity),
          0,
        ),
      )
      ship += shipFee
      dispatch(cartActions.setAmount({ id: store.id, amount: amount }))
      dispatch(cartActions.setShipFee({ id: store.id, shipFee: shipFee }))
    })
    dispatch(cartActions.setTotalAmount(sum))
    dispatch(cartActions.setTotalShip(ship))
    dispatch(cartActions.setTotalPrice(sum + ship))
  }, [dataStore])
  const navigate = useNavigate()
  const handlePay = () => {
    toggleDrawer()
    navigate("/checkout")
  }
  const { width } = useAppSelector((state) => state.app)
  return (
    <div>
      <SwipeableDrawer
        sx={{
          "& .MuiPaper-root": {
            width: "100%",
            "@media (min-width:600px)": {
              width: "516px",
            },
            overflow: "hidden",
          },
        }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor="right"
        onOpen={() => {}}
        open={open}
        onClose={() => toggleDrawer()}
      >
        <Box sx={{ height: "100%" }}>
          <Stack
            direction="column"
            sx={{
              position: "relative",
              padding: "15px 20px 10px 20px",
              height: "75px",
            }}
            alignItems="center"
            className="border-b"
          >
            <IconButton
              onClick={toggleDrawer}
              sx={{
                position: "absolute",
                left: "20px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
              aria-label="delete"
            >
              <ArrowBackIosNew />
            </IconButton>

            <span className="font-medium text-[18px]">Giỏ đồ ăn</span>
            <span className="text-[13px]  text-neutral-500">
              Giờ nhận hàng: {timeDeliver} (hôm nay)
            </span>
          </Stack>
          <Stack
            direction={"column"}
            alignItems={lengthFood === 0 ? "center" : "flex-start"}
            justifyContent={lengthFood === 0 ? "center" : ""}
            sx={{ height: "calc(100% - 75px)" }}
          >
            {lengthFood ? (
              <>
                <Stack
                  className="custom-scroll-y"
                  style={{
                    padding: "24px",
                    overflow: "hidden auto",
                    height: "calc(100% - 245px)",
                    width: "100%",
                  }}
                  spacing={3}
                >
                  {dataStore.map((data: iDataStore) => (
                    <div key={data.id}>
                      <div>
                        <div className="font-medium text-xl">{data.name}</div>
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
                <Box
                  sx={{ padding: "10px 20px 5px 20px" }}
                  className="absolute bottom-3 border-t-2 border-gray-300 w-[100%] bg-white"
                >
                  <p className="text-sm py-2">
                    <b>Lưu ý:</b> Xem chi tiết đơn hàng để dùng mã ưu đãi
                  </p>
                  <div
                    className={`mb-4 ${
                      width < 400 && "flex flex-row items-center"
                    }`}
                  >
                    <label
                      htmlFor="timeDeliver"
                      className="block mb-2 w-full text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {`Chọn giờ nhận hàng ${width < 400 ? " :" : ""}`}
                    </label>
                    <select
                      id="timeDeliver"
                      defaultValue={timeDeliver}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        dispatch(cartActions.setTimeDeliver(e.target.value))
                      }}
                      className={`bg-gray-50 border appearance-none custom-select border-gray-300 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${
                        width < 400 ? "max-w-[150px] ml-2  p-2" : "p-2.5"
                      }`}
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="11:30 AM">11:30 AM</option>
                      <option value="12:00 AM">12:00 AM</option>
                      <option value="12:30 AM">12:30 AM</option>
                    </select>
                  </div>
                  <Box className="flex justify-between items-center text-xl mb-3">
                    <span className="">Tổng tiền :</span>
                    <span className="font-medium">
                      {handlePrice(totalPrice)} ₫
                    </span>
                  </Box>
                  <Box className="w-full">
                    <CustomButton
                      fullWidth
                      onClick={() => {
                        if (user) {
                          handlePay()
                        } else {
                          dispatch(cartActions.toggleCart())
                          navigate("/login")
                        }
                      }}
                      sx={{
                        background: "var(--color-df-1)",
                        color: "white",
                        borderRadius: "6px",
                        fontSize: "15px",
                        height: "50px",
                        fontWeight: "600",
                        textTransform: "unset",
                        "&.Mui-disabled": {
                          color: "white",
                        },
                        "&:hover": {
                          background: "var(--color-df-1)",
                          color: "white",
                        },
                      }}
                    >
                      {user ? "Xem chi tiết đơn hàng" : "Đăng nhập để đặt hàng"}
                    </CustomButton>
                  </Box>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  padding: "12px",
                  width: "360px",
                  marginBottom: "25%",
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
                <Button onClick={toggleDrawer} variant="outlined">
                  Tiếp tục xem đồ ăn
                </Button>
              </Box>
            )}
          </Stack>
        </Box>
      </SwipeableDrawer>
    </div>
  )
}
