import * as React from "react"
import { useParams } from "react-router-dom"
import foodsApis from "@/api/foodsApi"
import { StoreDetailData } from "@/models"
import { Box, Typography, Grid } from "@mui/material"
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import ItemRecommend from "../RecommendFood/ItemRecommend"
import { useWindowDimensions } from "@/hooks"
import BreadcrumbsCommon from "@/components/Common/Breadcrumbs"

export interface DetailProps {}

const DetailStore = (props: DetailProps) => {
  const { idStore } = useParams()
  const [data, setData] = React.useState<StoreDetailData>()
  const { width } = useWindowDimensions()

  React.useEffect(() => {
    const fetchData = async () => {
      if (idStore) {
        const response = await foodsApis.getDetailStore(+idStore)
        if (response?.status) setData(response.data)
      }
    }
    fetchData()
    window.scrollTo(0, 0)
  }, [])

  const breadcrumbItems = [
    { name: "Cửa hàng", link: "/store/get-all-store" },
    { name: `${data?.restaurantName}`, link: "/" },
  ]

  // console.log(data);

  return (
    <Box className="container-base base-pd">
      <Box className=" flex flex-col gap-8">
        <Box className="">
          <BreadcrumbsCommon items={breadcrumbItems} />
        </Box>
        <Box
          className="gap-3 flex h-[40vh] relative"
          sx={{
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundImage: `url(${data?.imgRes})`,
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))",
            }}
            className="absolute top-0 left-0 right-0 bottom-0 bg-opacity-50 bg-gray-100"
          ></div>
          <Box className="flex-2 relative z-10 pl-6 pt-4  text-white">
            <span
              className={`${
                width <= 460
                  ? "text-lg"
                  : width <= 750
                  ? "text-xl"
                  : width <= 900
                  ? "text-2xl"
                  : "text-3xl"
              } font-semibold flex justify-start capitalize z-[100]`}
            >
              {data?.restaurantName}
            </span>
            <Typography>{data?.detail}</Typography>
            <Box className="flex gap-5 items-center mt-2 absolute bottom-4">
              <Box className=" flex  justify-center items-center ">
                <StarRateRoundedIcon style={{ color: "orange" }} />
                <Typography sx={{ fontSize: "14px" }}>5</Typography>
              </Box>
              <Box className="flex gap-2">
                <Box className="flex items-center justify-center gap-2">
                  <AccessTimeRoundedIcon />
                  <Typography sx={{ fontSize: "14px" }}>4 phút</Typography>
                </Box>
                •
                <Typography
                  sx={{ fontSize: "14px" }}
                  className="flex items-center justify-center"
                >
                  {data?.distance} km
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {data?.foodEntities && (
        <Box className="flex gap-5 flex-col mt-3">
          <span className="text-2xl font-semibold flex justify-start lg:ml-0 ml-[44px]">
            Ưu đãi hôm nay
          </span>
          <Box>
            <Grid
              className=""
              container
              spacing={4}
              columnSpacing={{ xs: 1, sm: 3, md: 4 }}
            >
              {data?.foodEntities?.map((item) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  key={item.id}
                  className="h-[290px]"
                >
                  <ItemRecommend
                    idFood={item.id}
                    width={width}
                    imgFood={item.imgFood}
                    key={item.id}
                    foodName={item.foodName}
                    distance={item.distance}
                    star={4}
                    price={item.price}
                    idStore={item.restaurantEntityId}
                    nameStore={data.restaurantName}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default DetailStore
