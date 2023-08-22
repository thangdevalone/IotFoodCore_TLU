import * as React from 'react'
import { Box,Stack,Typography } from "@mui/material"
import foodsApis from '@/api/foodsApi'
import { useParams } from 'react-router-dom'
import { foodData } from '@/models'
import BreadcrumbsCommon from '@/components/Common/Breadcrumbs';
import { handlePrice } from '@/utils'
import { useWindowDimensions } from '@/hooks'
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded"
import { CustomButton } from '@/components/Custom/CustomButon'


export interface DetailProps {}

const DetailFood = (props:DetailProps) => {
  const { width } = useWindowDimensions();
  const { idFood } = useParams();
  const [data, setData] = React.useState<foodData>();

  React.useEffect(() => {
    const fetchData = async () => {
      if (idFood) {
        const response = await foodsApis.getDetailFood(+idFood);
        if (response?.status) {
          setData(response?.data);
        }
      }
    }
    fetchData();
  }, [])
  // console.log(data);

  const breadcrumbItems = [
    { name: "Cửa hàng", link: "/store/get-all-store" },
    { name: `${data?.nameRestaurantFood}`, link: `/store/detail-store/${data?.restaurantEntityId}` },
    { name: `${data?.foodName}`, link:'/'},
  ];


  return (
    <Box className="container-base base-pd flex flex-col gap-7">
    <Box className="flex flex-col gap-5">
      <BreadcrumbsCommon items={breadcrumbItems} /> 
      <Box>
        <Stack spacing={3} direction="row" className="justify-between">
          <Box className="flex flex-col gap-3">
            <Typography variant={`${width <= 750 ? 'h4' :  width <= 900 ? "h2" : "h1"}`} className='capitalize'>{data?.foodName}</Typography>
            <Typography variant={`${width <= 750 ? 'h6' :  width <= 900 ? "h4" : "h3"}`}>detail o day</Typography>
            <Stack spacing={3} direction="row">
              <span className={`${ width <= 460 ? 'text-[12px]' : width <= 750 ? 'text-base' :  width <= 900 ? "text-xl" : "text-2xl"}`}>{handlePrice(data?.price)} VND</span>
              <span className={`${ width <= 460 ? 'text-[12px]' : width <= 750 ? 'text-base' :  width <= 900 ? "text-xl" : "text-2xl"}`}>quantity: {data?.quantity} </span>
            </Stack>
            <span className={`${width <= 460 ? 'text-[12px]' : width <= 750 ? 'text-base' : width <= 900 ? "text-xl" : "text-2xl"} flex text-center `}>
              <>Sản phẩm được đánh giá: {data?.star}</> 
              <StarRateRoundedIcon style={{ color: "orange", fontSize: '20px'}} />
            </span>
          </Box>
          <Box
              className={`${width <= 750 ? 'h-[150px] w-[150px]' :  width <= 900 ? "h-[200px] w-[200px]" : "h-[300px] w-[300px]"} rounded-md cursor-pointer object-contain`}
              sx={{
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(${data?.imgFood})`,
              }}
          ></Box>
        </Stack>
      </Box>
      </Box>
      <CustomButton
          sx={{ padding: "10px 12px", mr: 1, minWidth: "unset", width:'100%', fontSize:`${width <= 500 ? '15px' : '20px'}` }}
        >
          add to cart
        </CustomButton>
    </Box>
  )
}

export default DetailFood