import * as React from "react"
import foodsApis from "@/api/foodsApi"
import { RestaurantData } from "@/models"
import { Box, Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"
import BreadcrumbsCommon from "@/components/Common/Breadcrumbs"
import ItemRes from "@/components/Common/ItemRes"

export interface propsData {}

const GetAllStore = (props: propsData) => {
  const [data, setData] = React.useState<RestaurantData[]>([])
  const navigate = useNavigate()

  const handleDetail = (id: number) => {
    // console.log(id);
    navigate(`/store/detail-store/${id}`)
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await foodsApis.getRecommendRestaurants()
      if (response?.status) {
        setData(response?.data)
      }
      window.scrollTo(0, 0)
    }
    fetchData()
  }, [])

  const breadcrumbItems = [{ name: "Cửa hàng", link: "/" }]

  // console.log(data)

  return (
    <Box className="flex flex-col gap-5 container-base base-pd">
      <BreadcrumbsCommon items={breadcrumbItems} />
      <Grid container spacing={{ xs: 0, sm:1,md:2,lg:3 }}>
        {data?.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <ItemRes
              idFood={item.id}
              imgFood={item.imgRes}
              nameStore={item.restaurantName}
              distance={String(item.distance)}
              star={item.star}
              price={item.price}
              idStore={item.id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default GetAllStore
