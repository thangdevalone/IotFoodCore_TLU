import { useAppDispatch } from "@/app/hooks"
import { cartActions } from "@/components/Common/CartDrawer/CartSlice"
import { VoucherIcon } from "@/components/Icon/VoucherIcon"
import { foodData } from "@/models"
import { handlePrice } from "@/utils"
import { Box, Tooltip, Typography } from "@mui/material"
import { useSnackbar } from "notistack"

const SliderItemRecommend = (props: foodData) => {
  const {
    id,
    foodName,
    price,
    detail,
    nameRestaurantFood,
    imgFood,
    distance,
    createBy,
    createAt,
    quantityPurchased,
    typeFoodEntityId,
    restaurantEntityId,
    status,
  } = props

  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const handleAddToCart = () => {
    const data = {
      idFood: id,
      name: foodName,
      price,
      quantity: 1,
      idStore: restaurantEntityId,
      nameStore: nameRestaurantFood,
      imgFood,
      distance:distance
    }
    enqueueSnackbar("Bạn vừa thêm vào giỏ hàng", { variant: "success" })
    dispatch(cartActions.addToCart(data))
  }

  return (
    <Tooltip title="Bấm để thêm vào giỏ hàng">
      <Box
        className={`w-full h-full rounded-md relative cursor-pointer`}
        sx={{
          "&:hover .img-res": {
            transform: "scale(1.05)",
          },
        }}
        onClick={handleAddToCart}
      >
        <Box className=" w-[100%] h-[23vh] max-h-[200px]">
          <Box className="overflow-hidden rounded-md h-[100%] w-[100%]">
            <Box
              className={`img-res`}
              sx={{
                transition: "all 0.3s",
                backgroundPosition: "center",
                backgroundSize: "cover",
                width: "100%",
                height: "100%",
                backgroundImage: `url(${imgFood || "/assets/no_img.jpg"})`,
              }}
            ></Box>
          </Box>
        </Box>
        <Box className="flex flex-col w-full overflow-hidden pd-1 mt-[8px]">
          <span className="capitalize text-lg whitespace-nowrap overflow-hidden overflow-ellipsis font-semibold">
            {foodName}
          </span>

          <Box className="flex mt-[1px] capitalize gap-5 items-center">
            <Typography
              className="whitespace-nowrap flex-1 overflow-hidden overflow-ellipsis"
              sx={{ fontSize: "14px" }}
            >
              {nameRestaurantFood}
            </Typography>
            <Typography  sx={{ fontSize: "14px",fontWeight:600 }}>
              {handlePrice(price)} ₫
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
            <span>Đã bán: {quantityPurchased ||0}</span>
          </Box>
        </Box>
      </Box>
    </Tooltip>
  )
}

export default SliderItemRecommend
