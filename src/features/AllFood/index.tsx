import * as React from "react"
import foodsApis from "@/api/foodsApi"
import { ItemFood } from "@/components/Common"
import BreadcrumbsCommon from "@/components/Common/Breadcrumbs"
import { Box, Grid } from "@mui/material"
import { SkeletonCustom } from "../../components/Common/Skeleton"
import { FoodRoot, foodData } from "@/models"
import InfiniteScroll from "react-infinite-scroll-component"

const AllFood = () => {
  const breadcrumbItems = [{ name: "Tất cả món ăn", link: "/" }]
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [data, setData] = React.useState<foodData[]>([])
  const [pageIndex, setPageIndex] = React.useState<number>(0)
  const [hasMore, setHasMore] = React.useState<boolean>(true)

  const fetchData = async () => {
    const response = await foodsApis.pagingFood({
      pageIndex,
      pageSize: 10,
    })
    if (response?.status) {
      const myFood = response.data as FoodRoot
      const newData = [...data, ...myFood.data]
      setData(newData)
      setIsLoading(true)
      if (newData.length >= myFood.totalRow) {
        setHasMore(false)
      } else {
        setPageIndex(pageIndex + 1)
      }
    }
  }

  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    window.scrollTo(0, 0)
    fetchData()
  }, [])

  React.useEffect(() => {
    if (!scrollContainerRef.current) return

    const handleScroll = () => {
      const scrollContainer = scrollContainerRef.current
      if (!scrollContainer) return
      const scrollTop = scrollContainer.scrollTop
      const scrollHeight = scrollContainer.scrollHeight
      const clientHeight = scrollContainer.clientHeight
      if (scrollTop + clientHeight >= scrollHeight - 20 && hasMore) {
        fetchData()
      }
    }
    const scrollContainer = scrollContainerRef.current
    scrollContainer?.addEventListener("scroll", handleScroll)
    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll)
    }
  }, [hasMore])

  return (
    <Box className="flex flex-col gap-5 container-base base-pd">
      <BreadcrumbsCommon items={breadcrumbItems} />
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Grid className="pb-10" container spacing={{ xs: 2, sm: 2, md: 2, lg: 3 }}>
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
              {data?.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <ItemFood
                    idFood={item.id}
                    detail={item.detail}
                    imgFood={item.imgFood}
                    idRes={item.restaurantEntityId}
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
            </>
          )}
        </Grid>
      </InfiniteScroll>
    </Box>
  )
}

export default AllFood
