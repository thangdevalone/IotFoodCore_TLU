import { useAppDispatch } from "@/app/hooks"
import { cartActions } from "@/components/Common/CartDrawer/CartSlice"
import { VoucherIcon } from "@/components/Icon/VoucherIcon"
import { useWindowDimensions } from "@/hooks"
import { handlePrice } from "@/utils"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { Box, Tooltip, Typography } from "@mui/material"
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
    dispatch(cartActions.addToCart(data))
  }

  return (
    <Tooltip title="Bấm để thêm vào giỏ hàng">
    <Box
      className={`w-full h-full rounded-md relative cursor-pointer ${width < 600 && "flex gap-2"}`} sx={{"&:hover .img-res":{
        transform:"scale(1.05)",
        
      }}}
      onClick={handleAddToCart}
    >
     
      <Box className="w-full">
        <Box className="overflow-hidden rounded-md">
        <Box
          className={` img-res ${
            width < 600
              ? "h-[12vh] w-[26vw] object-contain border"
              : "h-[18vh] w-[100%] object-cover"
          } rounded-md  `}
          sx={{
            transition:"all 0.3s",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `url(${imgFood})`,
          }}
        ></Box>
        </Box>
      </Box>
      <Box
        className={`flex flex-col w-full mt-[8px]  ${
          width < 600 && "relative justify-between"
        }`}
      >
        <span className="text-lg font-semibold capitalize whitespace-nowrap overflow-hidden overflow-ellipsis">
          {foodName.length > 20 && width < 600
            ? `${foodName.slice(0, 23)} ...`
            : foodName}
        </span>
        {width < 600 ? (
          <>
            <Typography className="whitespace-nowrap overflow-hidden overflow-ellipsis">
              {detail.length > 20 && detail
                ? `${detail.slice(0, 25)} ...`
                : "detail"}
            </Typography>
            <Typography
              className="whitespace-nowrap overflow-hidden overflow-ellipsis"
              sx={{ fontSize: "14px" }}
            >
              {nameStore}
            </Typography>
            <Typography className="text-gray-400 " sx={{ fontSize: "14px" }}>
              {handlePrice(price)} VND
            </Typography>
            <Box
              className="cursor-pointer hover:opacity-90 absolute bottom-[-5px] right-2"
              onClick={() => handleAddToCart()}
            >
              <AddCircleIcon style={{ color: "green", fontSize: "28px" }} />
            </Box>
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
              <Typography className="text-gray-400 " sx={{ fontSize: "14px" }}>
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
