import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  Box,
  Button,
  IconButton,
  Stack,
  SwipeableDrawer,
  Typography,
} from "@mui/material"
import { CustomButton } from "@/components/Custom/CustomButon"
import { useInforUser, useWindowDimensions } from "@/hooks"
import { handlePrice } from "@/utils"
import { ArrowBackIosNew } from "@mui/icons-material"
import * as React from "react"
import { cartActions, iDataStore } from "./CartSlice"
import CartList from "./Components/CartList"
import "./style_drawer.css"
import { CartItemData } from "@/models"

export interface CardDrawerProps {}

export function CartDrawer(props: CardDrawerProps) {
  const { open, dataStore, timeDeliver, lengthFood } = useAppSelector(
    (state) => state.cart,
  )
  const user = useInforUser()
  const [price, setPrice] = React.useState<number>(0)
  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
  const dispatch = useAppDispatch()
  const toggleDrawer = () => {
    dispatch(cartActions.toggleCart())
  }

  React.useEffect(() => {
    const itemFoods: CartItemData[] = []
    dataStore?.forEach((store) =>
      store.items.forEach((item) => itemFoods.push(item)),
    )
    const total = itemFoods.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )
    setPrice(total)
    dispatch(cartActions.setTotalPrice(total))
  }, [dataStore])
  const { width } = useWindowDimensions()
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
                    height: "calc(100% - 200px)",
                  }}
                  spacing={3}
                >
                  {dataStore.map((data: iDataStore) => (
                    <>
                      <div key={data.id}>
                        <div className="font-medium text-xl">{data.name}</div>
                        <CartList items={data.items} />
                      </div>
                      <Stack
                        sx={{
                          "& *": {
                            fontSize: "13px",
                          },
                          width: "100%",
                        }}
                        justifyContent="space-between"
                        direction="row"
                        spacing={3}
                      >
                        <Stack direction="column">
                          <span>Tổng</span>
                          {user?<p>Phí vận chuyển:</p>:<p>
                            Phí vận chuyển sẽ được hiển thị khi bạn đăng nhập
                          </p>}
                        </Stack>
                        <span> {handlePrice(price)} ₫</span>
                      </Stack>
                    </>
                  ))}
                </Stack>
                <Box
                  sx={{ padding: "10px 20px 5px 20px" }}
                  className="absolute bottom-3 border-t-2 border-gray-300 w-[100%] bg-white"
                >
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
                        dispatch(
                          cartActions.setTimeDeliver(
                            e.target.value as
                              | "10:00 AM"
                              | "11:15 AM"
                              | "12:15 AM",
                          ),
                        )
                      }}
                      className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        width < 400 ? "max-w-[150px] ml-2  p-2" : "p-2.5"
                      }`}
                    >
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:15 AM">11:15 AM</option>
                      <option value="12:15 AM">12:15 AM</option>
                    </select>
                  </div>
                  <Box className="flex justify-between items-center text-xl mb-3">
                    <span className="">Tổng tiền :</span>
                    <span className="font-medium">{handlePrice(price)} ₫</span>
                  </Box>
                  <Box className="w-full">
                    <CustomButton
                      fullWidth
                      sx={{
                        background: "var(--color-df-1)",
                        color: "white",
                        borderRadius: "6px",
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
                      {user ? "Đặt hàng" : "Đăng nhập để đặt hàng"}
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
