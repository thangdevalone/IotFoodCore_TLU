import foodsApis from "@/api/foodsApi"
import { ItemRes } from "@/components/Common"
import BreadcrumbsCommon from "@/components/Common/Breadcrumbs"
import { SkeletonCustom } from "@/components/Common/Skeleton"
import { RestaurantData, ResFood } from "@/models"
import { Box, Grid } from "@mui/material"
import * as React from "react"
import InfiniteScroll from "react-infinite-scroll-component"

export interface propsData {}

const GetAllStore = (props: propsData) => {
  const [data, setData] = React.useState<RestaurantData[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [pageIndex, setPageIndex] = React.useState<number>(0)
  const [hasMore, setHasMore] = React.useState<boolean>(true)
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null)

  const fetchData = async () => {
    try {
      const response = await foodsApis.pagingRes({
        pageIndex,
        pageSize: 10,
      })
      if (response?.status) {
        const myFood = response.data as ResFood
        const newData = [...data, ...myFood.responList]
        setData(newData)
        setIsLoading(true)
        if (newData.length >= myFood.totalRow) {
          setHasMore(false)
        } else {
          setPageIndex(pageIndex + 1)
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
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

  const breadcrumbItems = [{ name: "Cửa hàng", link: "/" }]

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
      </InfiniteScroll>
    </Box>
  )
}

export default GetAllStore
