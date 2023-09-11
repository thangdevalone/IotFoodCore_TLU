import foodsApis from "@/api/foodsApi"
import { FoodRoot, foodData } from "@/models"
import { Box, Grid } from "@mui/material"
import * as React from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import "swiper/css"
import ItemRecommend from "./ItemRecommend"

export interface RecommendFoodProps {}

export function PagingFood(props: RecommendFoodProps) {
  const [data, setData] = React.useState<foodData[]>([])
  const [pageIndex, setPageIndex] = React.useState<number>(0)
  const [hasMore, setHasMore] = React.useState<boolean>(true)

  const fetchData = async () => {
    const response = await foodsApis.pagingFood({
      pageIndex,
      pageSize: 4,
    })

    if (response?.status) {
      const myFood = response.data as FoodRoot
      const newData = [...data, ...myFood.data]
      setData(newData)
      if (newData.length >= myFood.totalRow) {
        setHasMore(false)
      } else {
        setPageIndex(pageIndex + 1)
      }
    }
  }

  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    if (!scrollContainerRef.current) return

    const handleScroll = () => {
      const scrollContainer = scrollContainerRef.current
      if (!scrollContainer) return // Kiểm tra xem scrollContainer có tồn tại hay không
      const scrollTop = scrollContainer.scrollTop
      const scrollHeight = scrollContainer.scrollHeight
      const clientHeight = scrollContainer.clientHeight

      if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore) {
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
    <Box
      className={`flex items-center justify-center mb-5`}
      ref={scrollContainerRef}
    >
      <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
        <InfiniteScroll
          dataLength={data.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Hai Dang khong cho them san pham...</h4>}
        >
          {data?.map((item: foodData) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <ItemRecommend
                idFood={item.id}
                detail={item.detail}
                imgFood={item.imgFood}
                foodName={item.foodName}
                price={item.price}
                qSold={item.quantityPurchased || 0}
                nameStore={item.nameRestaurantFood}
                idStore={item.restaurantEntityId}
                typeFoodEntityId={item.typeFoodEntityId}
              />
            </Grid>
          ))}
        </InfiniteScroll>
      </Grid>
    </Box>
  )
}
