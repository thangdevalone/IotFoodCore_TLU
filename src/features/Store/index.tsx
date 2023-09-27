import foodsApis from "@/api/foodsApi"
import { ItemRes } from "@/components/Common"
import BreadcrumbsCommon from "@/components/Common/Breadcrumbs"
import { SkeletonCustom } from "@/components/Common/Skeleton"
import { RestaurantData } from "@/models"
import { Box, Grid } from "@mui/material"
import * as React from "react"
import { useNavigate } from "react-router-dom"

export interface propsData {}

const GetAllStore = (props: propsData) => {
  const [data, setData] = React.useState<RestaurantData[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const navigate = useNavigate()

  // const handleDetail = (id: number) => {
  //   navigate(`/store/detail-store/${id}`)
  // }

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await foodsApis.getRecommendRestaurants()
      if (response?.status) {
        setData(response?.data)
        setIsLoading(true)
      }
      window.scrollTo(0, 0)
    }
    fetchData()
  }, [])

  const breadcrumbItems = [{ name: "Cửa hàng", link: "/" }]

  return (
    <Box className="flex flex-col gap-5 container-base base-pd">
      <BreadcrumbsCommon items={breadcrumbItems} />
      <Grid container spacing={{ xs: 0, sm: 1, md: 2, lg: 3 }}>
        {!isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <Grid item xs={12} sm={4} md={4} lg={3} key={index + item}>
                <SkeletonCustom />
              </Grid>
            ))}
          </>
        ) : (
          <>
            {data?.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <ItemRes
                  imgRes={item.imgRes}
                  nameRes={item.restaurantName}
                  distance={item.distance}
                  detail={item.detail}
                  star={item.star}
                  idRes={item.id}
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </Box>
  )
}

export default GetAllStore
