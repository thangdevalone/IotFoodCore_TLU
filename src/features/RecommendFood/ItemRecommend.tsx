import { useAppDispatch } from "@/app/hooks"
import { cartActions } from "@/components/Common/CartDrawer/CartSlice"
import { VoucherIcon } from "@/components/Icon/VoucherIcon"
import { useWindowDimensions } from "@/hooks"
import { handlePrice } from "@/utils"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { Box, Stack, Tooltip, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
interface propsData {
  idFood: number
  nameStore: string
  foodName?: any | string
  price: number
  star?: number
  time?: number
  distance?: string
  imgFood: string
  width: number
  idStore: number
  detail: string
  qSold: number
}

const ItemRecommend = (props: propsData) => {
  const {
    idFood,
    nameStore,
    foodName,
    price,
    imgFood,
    qSold,
    idStore,
    detail,
  } = props

  const { width } = useWindowDimensions()
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const handleAddToCart = () => {
    const data = {
      idFood,
      name: foodName,
      price,
      quantity: 1,
      idStore,
      nameStore,
      imgFood,
    }
    enqueueSnackbar("Bạn vừa thêm vào giỏ hàng", { variant: "success" })
    dispatch(cartActions.addToCart(data))
  }

  return (
    <Tooltip title="Bấm để thêm vào giỏ hàng">
      <Box
        className={`w-full h-full rounded-md relative cursor-pointer ${
          width < 500 && "flex gap-2"
        }`}
        sx={{
          "&:hover .img-res": {
            transform: "scale(1.05)",
          },
        }}
        onClick={handleAddToCart}
      >
        <Box className=" min-w-[140px] min-h-[100px]">
          <Box className="overflow-hidden rounded-md h-[100%] w-[100%]">
            <Box
              className={`img-res`}
              sx={{
                transition: "all 0.3s",
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: "100%",
                height: width < 500 ? "100%" : "18vh",
                backgroundImage: `url(${imgFood})`,
              }}
            ></Box>
          </Box>
        </Box>
        <Box
          className={`flex flex-col w-full overflow-hidden pd-1 ${
            width < 500 ? "justify-between mt-[0px] pl-1" : "mt-[8px]"
          }`}
        >
          <span
            className={`capitalize ${
              width < 500
                ? width < 350
                  ? "text-base font-medium"
                  : " text-lg font-medium"
                : "text-lg whitespace-nowrap overflow-hidden overflow-ellipsis font-semibold"
            }`}
          >
            {foodName}
          </span>
          {width < 500 ? (
            <>
              <span className="whitespace-nowrap overflow-hidden overflow-ellipsis text-[14px]">
                {nameStore}
              </span>
              {width > 450 && (
                <span className="whitespace-nowrap overflow-hidden overflow-ellipsis text-[14px] text-gray-400">
                  {detail}
                </span>
              )}

              <Stack flexDirection='row' sx={{mt:1}} justifyContent="space-between" alignItems='flex-end'>
                <span
                  className={`text-[15px] ${
                    width < 500 ? "font-semibold" : "text-gray-400"
                  }`}
                >
                  {handlePrice(price)} VND
                </span>
                <Box className="cursor-pointer hover:opacity-90">
                  <AddCircleIcon
                    style={{
                      color: "var(--color-df-1)",
                      fontSize: `${width < 350 ? "24px" : "28px"}`,
                    }}
                  />
                </Box>
              </Stack>
            </>
          ) : (
            <>
              <Box className="flex mt-[1px] capitalize gap-5 items-center">
                <Typography
                  className="whitespace-nowrap flex-1 overflow-hidden overflow-ellipsis"
                  sx={{ fontSize: "14px" }}
                >
                  {nameStore}
                </Typography>
                <Typography
                  className="text-gray-400 "
                  sx={{ fontSize: "14px" }}
                >
                  {handlePrice(price)} VND
                </Typography>
              </Box>
              <Box
                sx={{
                  "& *": {
                    fontSize: "14px",
                  },
                }}
                className="flex mt-1 justify-between items-center"
              >
                <span>Đã bán: {qSold}</span>
                <div>
                  <VoucherIcon />
                  <span className="ml-1">
                    {Math.floor(Math.random() * (5 - 2 + 1)) + 2} Ưu đãi
                  </span>
                </div>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Tooltip>
  )
}

export default ItemRecommend
