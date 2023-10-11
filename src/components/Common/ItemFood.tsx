import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { cartActions } from "@/components/Common/CartDrawer/CartSlice"
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

  const { width } = useAppSelector(state=>state.app)
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const dataStore = useAppSelector((state) => state.cart.dataStore)
  const handleAddToCart = () => {
    const store=dataStore.find(item=>item.id===idStore)
    const food=store?.items.find(item=>item.idFood===idFood)
    if(food &&food?.quantity>=10){
      enqueueSnackbar("Không thể thêm quá 10 sản phẩm",{variant:"error"})
      return
    }
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
    
    dispatch(cartActions.addToCart(data))
    enqueueSnackbar("Bạn vừa thêm vào giỏ hàng", { variant: "success" })
    if (idRes && toppingList) {
      dispatch(
        cartActions.setToppingRes({ id: idRes, listTopping: toppingList }),
      )
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
        <Box
          className={`min-w-[100px] min-h-[100px] ${
            width < 500 && "max-h-[120px] max-w-[150px]"
          }`}
        >
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
            width < 500
              ? "justify-between mt-[0px] pl-1 min-w-[120px]"
              : "mt-[8px]"
          }`}
        >
          {width < 500 ? (
            <>
              <div>
                <p
                  className={`capitalize ${
                    width < 500
                      ? width < 350
                        ? "text-base font-medium line-clamp-2"
                        : " text-lg font-medium"
                      : "text-lg line-clamp-1 font-semibold"
                  }`}
                >
                  {foodName}
                </p>
                <span className="line-clamp-1 text-[14px]">{nameStore}</span>

                <span className="whitespace-nowrap overflow-hidden overflow-ellipsis text-[14px] text-gray-400">
                  {detail ? (
                    detail
                  ) : (
                    <span className="mt-1 block">Đã bán: {qSold}</span>
                  )}
                </span>
              </div>

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
              <p
                className={`capitalize ${
                  width < 500
                    ? width < 350
                      ? "text-base font-medium line-clamp-2"
                      : " text-lg font-medium"
                    : "text-lg line-clamp-1 font-semibold"
                }`}
              >
                {foodName}
              </p>
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
