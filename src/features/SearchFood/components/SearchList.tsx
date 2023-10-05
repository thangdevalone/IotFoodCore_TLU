import foodsApis from "@/api/foodsApi"
import { Header, ItemFood } from "@/components/Common"
import { CustomButton } from "@/components/Custom/CustomButon"
import { foodData } from "@/models"
import { Box, Grid } from "@mui/material"
import { useSnackbar } from "notistack"
import queryString from "query-string"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import "../styles.module.css"

import { useScroll, useWindowDimensions } from "@/hooks"
import { Search } from "@mui/icons-material"

const SearchList = () => {
  const queryParams = queryString.parse(location.search)
  const [search, setSearch] = React.useState<string>(
    `${queryParams.key || ""} `,
  )
  const [dataSearch, setDataSearch] = React.useState<foodData[]>([])
  const [searchHistory, setSearchHistory] = React.useState<string[]>([])
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const fetchData = async (search: string) => {
    const response = await foodsApis.searchFoods(search)
    if (response?.status) {
      setDataSearch(response.data)
      navigate(`/search?key=${search}`)
    }
  }

  const handleSearch = () => {
    if (search) {
      if (!searchHistory.includes(search)) {
        setSearchHistory((prev) => [...prev, search])
      }
      navigate(`/search?key=${search}`)
    } else {
      enqueueSnackbar("Bạn chưa nhập gì để tìm kiếm !", { variant: "warning" })
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSearch()
  }

  const handleClickSearchHistory = (value: string) => {
    setSearch(value)
    fetchData(value)
  }

  React.useEffect(() => {
    if (typeof queryParams.key === "string") {
      fetchData(queryParams.key)
    }
  }, [queryParams.key])
  const {width}=useWindowDimensions()
  const scrollY = useScroll()
  const setterShadow =scrollY >= 40 || (scrollY >= 50 && width < 500) ? true : false
  return (
    <Box >
      <Header sx={{ backgroundColor: "white" }} isWhiteLogo={false} />
      <Box sx={{boxShadow:setterShadow?"0 4px 2px -2px rgba(0, 0, 0, 0.2)":"none" }} className={`z-[100] pb-2 w-full bg-white  sticky ${width<500?"top-[60px]":"top-[80px] "}`}>
      <Box  className="w-[100%] container-base base-pd flex items-center justify-center gap-3">
        <input
          className="appearance-none border-2 flex-5 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="search-food"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyPress} // sự kiện enter
          style={{
            height: "50px",
            borderRadius: "6px",
            border: "1px solid var(--color-df-1)",
          }}
          value={search}
          type="text"
          placeholder="Tìm kiếm món ăn"
        />
        <CustomButton
          className="flex-1"
          onClick={() => handleSearch()}
          sx={{
            background: "var(--color-df-1)",
            color: "white",
            borderRadius: "6px",
            fontSize: "15px",
            height: "50px",
            fontWeight: "600",
            textTransform: "unset",
          }}
          
        >
          {width>600 ? "Tìm kiếm":<Search/>}
        </CustomButton>
      </Box>
      <Box className="container-base base-pd ">
      <Box className="w-full my-3 flex flex-wrap gap-2 overflow-hidden">
              {searchHistory.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 border rounded-lg bg-gray-100 cursor-pointer inline-block"
                  onClick={() => handleClickSearchHistory(item)}
                  style={{ whiteSpace: "normal" }}
                >
                  {item}
                </span>
              ))}
            </Box>
      </Box>
    
      </Box>
      
      <Box
        className={`${width<500?"mt-[10px]":"mt-[30px]"} py-10`}
        sx={{
          backgroundColor: "rgb(240, 242, 245)",
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <Box className="container-base base-pd w-full">
          <Box className="mt-10">
           
            <Grid container  spacing={{ xs: 2, sm: 2, md:3,lg:3 }}>
              {dataSearch?.map((item, index) => (
                <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
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
        </Box>
      </Box>
    </Box>
  )
}

export default SearchList
