import foodsApis from "@/api/foodsApi"
import { ItemFood } from "@/components/Common"
import BreadcrumbsCommon from "@/components/Common/Breadcrumbs"
import { foodData } from "@/models"
import { Box, Grid } from "@mui/material"
import * as React from "react"
import { useParams } from "react-router-dom"

const FoodByType = () => {
  const { idTypeFood } = useParams()
  const [data, setData] = React.useState<foodData[]>([])
  const [nameType, setNameType] = React.useState<string>("")
  React.useEffect(() => {
    try {
      const fetchData = async () => {
        if (idTypeFood) {
          const response = await foodsApis.getDetailType(+idTypeFood)
          setData(response.data.foodRecommendDtos)
          setNameType(response.data.nameType)
        }
      }
      fetchData()
    } catch (err) {
      console.log(err)
    }
  }, [])
  const breadcrumbItems = [
    { name: "Loại Đồ Ăn", link: "/" },
    { name: nameType, link: "/" },
  ]
  return (
    <Box className="flex flex-col gap-5 container-base base-pd">
      <BreadcrumbsCommon items={breadcrumbItems} />
      <Grid container sx={{pb:4}} spacing={{ xs: 0, sm: 1, md: 2, lg: 3 }}>
        {data?.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <ItemFood
              idFood={item.id}
              detail={item.detail}
              imgFood={item.imgFood}
              idRes={item.restaurantEntityId}
              toppingList={item.toppingEntityList}
              foodName={item.foodName}
              price={item.price}
              distance={item.distance || 0}
              qSold={item.quantityPurchased || 0}
              nameStore={item.nameRestaurantFood}
              idStore={item.restaurantEntityId}
              typeFoodEntityId={item.typeFoodEntityId}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default FoodByType
