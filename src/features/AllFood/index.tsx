import * as React from "react"
import foodsApis from "@/api/foodsApi"
import { ItemFood } from "@/components/Common"
import BreadcrumbsCommon from "@/components/Common/Breadcrumbs"
import { foodData } from "@/models"
import { Box, Grid } from "@mui/material"
import { SkeletonCustom } from "../../components/Common/Skeleton"

const AllFood = () => {
  const breadcrumbItems = [{ name: "Tất cả món ăn", link: "/" }]
  const [data, setData] = React.useState<foodData[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    try {
      const fetchData = async () => {
        // const response = await foodsApis.
        setIsLoading(true)
      }
    } catch (err) {
      console.log(err)
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <Box className="flex flex-col gap-5 container-base base-pd">
      <BreadcrumbsCommon items={breadcrumbItems} />
      <Grid container spacing={{ xs: 0, sm: 1, md: 2, lg: 3 }}>
        {!isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
              <Grid item xs={12} sm={4} md={4} lg={3} key={index + item}>
                <SkeletonCustom />
              </Grid>
            ))}
          </>
        ) : (
          <>
            {/* {data?.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <ItemFood
                       idFood={item.id}
                       detail={item.detail}
                       imgFood={item.imgFood}
                       idRes={item.restaurantEntityId}
                       toppingList={data.toppingEntityList}
                       foodName={item.foodName}
                       price={item.price}
                       distance={item.distance || 0}
                       qSold={item.quantityPurchased || 0}
                       nameStore={item.nameRestaurantFood}
                       idStore={item.restaurantEntityId}
                       typeFoodEntityId={item.typeFoodEntityId}
                    />
                  </Grid>
        ))} */}
          </>
        )}
      </Grid>
    </Box>
  )
}

export default AllFood
