import * as React from "react"
import { Box } from "@mui/material"
import BreadcrumbsCommon from "@/components/Common/Breadcrumbs"
import { useParams } from "react-router-dom"
import foodsApis from "@/api/foodsApi"

const SearchList = () => {
  const breadcrumbItems = [{ name: "Search", link: "/" }]

  const { searchParams } = useParams()
  console.log(searchParams)

  React.useEffect(() => {
    const fetchData = async () => {
      if (searchParams) {
        const response = await foodsApis.searchFoods(searchParams)
        console.log(response)
      }
    }
    fetchData()
  }, [searchParams])

  return (
    <Box className="container-base base-pd">
      <BreadcrumbsCommon items={breadcrumbItems} />
      <Box>list search</Box>
    </Box>
  )
}

export default SearchList
