import foodsApis from "@/api/foodsApi"
import { CustomButton } from "@/components/Custom/CustomButon"
import { Box, Stack, Grid } from "@mui/material"
import * as React from "react"
import { useLocation, useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack"
import { foodData } from "@/models"
import SliderItemRecommend from "@/features/RecommendFood/SliderItemRecommend"
import "../styles.module.css"
import queryString from 'query-string';

const SearchList = () => {
  const location = useLocation();
  const parsed = queryString.parseUrl(location.search);
  const [search, setSearch] = React.useState<string>("")
  const [dataSearch, setDataSearch] = React.useState<foodData[]>([])
  const [searchHistory, setSearchHistory] = React.useState<string[]>([])
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  console.log(parsed,location.search)

  const fetchData = async (search: string) => {
    // console.log(parsed)
    // if (parsed) {
    //   const response = await foodsApis.searchFoods(parsed)
    //   if (response?.status) {
    //     setDataSearch(response.data)
    //     navigate(`/search?key=${search}`)
    //   }
    // }
  }

  const handleSearch = () => {
    if (search) {
      if (!searchHistory.includes(search)) {
        setSearchHistory((prev) => [...prev, search])
      }
      navigate(`/search/${search}`)
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

  // React.useEffect(() => {
  //   if (searchParams) fetchData(searchParams)
  // }, [searchParams])


  return (
    <Box className="container-base base-pd w-full">
      <Box className="w-[100%] flex items-center justify-center gap-3">
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
          Tìm kiếm
        </CustomButton>
      </Box>
      <Box className="mt-3">
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
        <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 3, md: 4 }}>
          {dataSearch?.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <SliderItemRecommend {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default SearchList
