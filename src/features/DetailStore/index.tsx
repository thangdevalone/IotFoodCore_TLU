import foodsApis from "@/api/foodsApi"
import BreadcrumbsCommon from "@/components/Common/Breadcrumbs"
import { VoucherIcon } from "@/components/Icon"
import { useWindowDimensions } from "@/hooks"
import { StoreDetailData } from "@/models"
import { BorderColor } from "@mui/icons-material"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded"
import { Box, Stack, Typography } from "@mui/material"
import * as React from "react"
import { useParams } from "react-router-dom"

export interface DetailProps {}

const DetailStore = (props: DetailProps) => {
  const { idStore } = useParams()
  const [data, setData] = React.useState<StoreDetailData>()
  const { width } = useWindowDimensions()

  React.useEffect(() => {
    const fetchData = async () => {
      if (idStore) {
        const response = await foodsApis.getDetailStore(+idStore)
        if (response?.status) setData(response.data)
      }
    }
    fetchData()
    window.scrollTo(0, 0)
  }, [])

  const breadcrumbItems = [
    { name: "Cửa hàng", link: "/store/get-all-store" },
    { name: `${data?.restaurantName}`, link: "/" },
  ]

  return (
    <>
      {data ? (
        <>
          <Box className="mt-[70px] py-5 border-b-[1px] border-slate-400">
            <Box className="container-base base-pd">
              <BreadcrumbsCommon items={breadcrumbItems} />
              <Stack direction="row" spacing={2}>
                <Box sx={{ flex: 2 ,maxWidth:width>1000?"none":"600px"}}>
                  <Typography variant="h4" sx={{ fontWeight: 500, mb: 1 }}>
                    {data.restaurantName}
                  </Typography>
                  <p className="text-[#676767] text-sm py-1 ">{data.detail}</p>
                  <Box className="flex gap-2 my-2">
                    <Box className="flex items-center justify-center gap-2">
                      <AccessTimeRoundedIcon />

                      <Typography sx={{ fontSize: "14px" }}>
                        {Math.floor(Number(data.distance) * 12)} phút
                      </Typography>
                    </Box>
                    •
                    <Typography
                      sx={{ fontSize: "14px" }}
                      className="flex items-center justify-center"
                    >
                      {data.distance} km
                    </Typography>
                    •
                    <Typography
                      sx={{ fontSize: "14px" }}
                      className="flex items-center justify-center"
                    >
                      <svg
                        className=" w-4 h-4 mr-2 text-yellow-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>{" "}
                      {data.star}
                    </Typography>
                  </Box>
                  <p className="mt-1">
                    <span className="mr-10 font-medium text-[#676767]">
                      Giờ mở cửa
                    </span>{" "}
                    <span className="text-sm text-[#676767]">
                      Hôm nay {data.timeStart}-{data.timeClose}
                    </span>
                  </p>
                  <div className="flex flex-row item-center gap-3 my-2">
                    <VoucherIcon color="var(--color-df-2)" />{" "}
                    <span className="text-[var(--color-df-2)]">
                      Nhiều voucher có sẵn
                    </span>
                  </div>
                  <p>Đã bán: 0</p>
                </Box>
                {width > 1000 && (
                  <Box sx={{ flex: 1,display:"flex",justifyContent:"flex-end" }}>
                    <img
                      src={data.imgRes}

                      className="h-[100%] w-auto max-h-[250px] max-w-[350px] object-cover rounded-lg "
                      alt=""
                    />
                  </Box>
                )}
              </Stack>
            </Box>
          </Box>
          <Box
            className="h-[500px]"
            sx={{ backgroundColor: " rgb(240, 242, 245)" }}
          >
            <Box className="container-base base-pd"></Box>
          </Box>
        </>
      ) : (
        ""
      )}
    </>
  )
}

export default DetailStore
