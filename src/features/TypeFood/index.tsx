import { Box, Grid } from "@mui/material"
import * as React from "react"
import foodsApis from "@/api/foodsApi"
import { TypeFoodsData } from "@/models"
import { useWindowDimensions } from "@/hooks"
import { useNavigate } from "react-router-dom"

const TypeFood = () => {
  const [data, setData] = React.useState<TypeFoodsData[]>([])
  const navigate = useNavigate()
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await foodsApis.getTypeFoods()
      if (response?.status) setData(response?.data)
    }
    fetchData()
  }, [])

  const handleNavigate = (id: number) => {
    navigate(`store/type-food/${id}`)
  }

  const { width } = useWindowDimensions()
  return (
    <Box className="flex items-center justify-center" sx={{ mb: "24px" }}>
      <Grid
        className=""
        container
        spacing={4}
        columnSpacing={{ xs: 1, sm: 3, md: 4 }}
      >
        {data?.map((item) => (
          <Grid item xs={12} sm={4} md={4} lg={3} key={item.id}>
            <Box
              className="h-[150px] rounded-md relative"
              sx={{
                backgroundImage: `url(${item.imgType})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                cursor: "pointer",
              }}
              onClick={() => handleNavigate(item.id)}
            >
              <div className="bg-[rgba(0,0,0,0.4)] w-[100%] h-[100%]"></div>
              <span className="text-xl absolute z-10 top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 font-medium text-white block mt-1 ">
                {item.nameType}
              </span>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default TypeFood
