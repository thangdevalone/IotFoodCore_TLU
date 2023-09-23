import { useAppDispatch } from "@/app/hooks"
import { cartActions } from "@/components/Common/CartDrawer/CartSlice"
import { VoucherIcon } from "@/components/Icon/VoucherIcon"
import { useWindowDimensions } from "@/hooks"
import { ToppingEntityList } from "@/models"
import { handlePrice } from "@/utils"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { Box, Stack, Tooltip, Typography } from "@mui/material"
import { useSnackbar } from "notistack"
interface propsData {
  idFood: number
  nameStore: string
  foodName: string
  price: number
  imgFood: string
  idStore: number
  detail: string | null
  qSold: number
  toppingList?: ToppingEntityList[]
  idRes?: number
  distance: number
  typeFoodEntityId: number
}

export const ItemFood = (props: propsData) => {
  const {
    idFood,
    nameStore,
    foodName,
    price,
    imgFood,
    qSold,
    idStore,
    toppingList,
    distance,
    detail,
    typeFoodEntityId,
    idRes,
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
      distance: distance,
      nameStore,
      imgFood,
    }
    enqueueSnackbar("Bạn vừa thêm vào giỏ hàng", { variant: "success" })
    dispatch(cartActions.addToCart(data))
    console.log(idRes,toppingList)
    if( idRes && toppingList){
      dispatch(cartActions.setToppingRes({ id: idRes, listTopping: toppingList }))
    }
  }

  return (
    <Tooltip title="Bấm để thêm vào giỏ hàng">
      <Box
        className={`w-full p-4 bg-white  rounded-md relative cursor-pointer ${
          width < 500 && "flex gap-2"
        }`}
        sx={{
          "&:hover .img-sour": {
            transform: "scale(1.05)",
          },
        }}
        onClick={handleAddToCart}
      >
        <Box className=" min-w-[100px] min-h-[100px]">
          <Box className="overflow-hidden rounded-md h-[100%] w-[100%]">
            <img
              className={`img-sour`}
              src={imgFood || "/assets/no_img.jpg"}
              alt="Food Image"
              style={{
                transition: "all 0.3s",
                objectFit: "cover",
                width: "100%",
                height: width < 500 ? "100%" : "18vh",
              }}
              loading="lazy"
            />
          </Box>
        </Box>
        <Box
          className={`flex flex-col w-full overflow-hidden pd-1 ${
            width < 500 ? "justify-between mt-[0px] pl-1" : "mt-[8px]"
          }`}
        >
          <p
            className={`capitalize ${
              width < 500
                ? width < 350
                  ? "text-base font-medium line-clamp-2"
                  : " text-lg font-medium"
                : "text-lg whitespace-nowrap overflow-hidden overflow-ellipsis font-semibold"
            }`}
          >
            {foodName}
          </p>
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

              <Stack
                flexDirection="row"
                sx={{ mt: 1 }}
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <span className={`text-[15px] font-semibold`}>
                  {handlePrice(price)} ₫
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
                  sx={{ fontSize: "13px" }}
                >
                  {nameStore}
                </Typography>
                <span className="font-semibold" style={{ fontSize: "13px" }}>
                  {handlePrice(price)} ₫
                </span>
              </Box>
              <Box
                sx={{
                  "& *": {
                    fontSize: "13px",
                  },
                }}
                className="flex mt-1 justify-between items-center"
              >
                <span>Đã bán: {qSold}</span>
                <Box className="cursor-pointer hover:opacity-90">
                  <AddCircleIcon
                    style={{
                      color: "var(--color-df-1)",
                      fontSize: `${width < 350 ? "24px" : "28px"}`,
                    }}
                  />
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Tooltip>
  )
}
